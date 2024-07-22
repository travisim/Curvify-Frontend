import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
interface ForumThread {
  id: number;
  title: string;
  category: string;
  author: string;
  created_at: string;
}

const ForumThreads = (): JSX.Element => {
  const navigate = useNavigate();
  

  const [forumThreads, setForumThreads] = useState<JSX.Element[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/index`;
    function ForumThreadDeterminer(forumThread: ForumThread[]): any {
      if (forumThread.length > 0) {
        return generateForumThreadHTML(forumThread);
      } else {
        return NoForumThreadHTML;
      }
    }

    const NoForumThreadHTML = (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="50vh"
      >
        <Typography variant="h4">No Posts In This Category yet.</Typography>
      </Box>
    );

    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setForumThreads(ForumThreadDeterminer(res)))
      .catch(() => setForumThreads([NoForumThreadHTML]));
  }, []);

  function fetchForumThreadsByCategory(category: string): void {
    // ... (same as before)
  }

   function FilterbyCategory(event: React.ChangeEvent< any>): void {
    const value = event.target.value as string;
    setCurrentFilter(value);
    fetchForumThreadsByCategory(value);
  }


  function generateForumThreadHTML(forumThreads: ForumThread[]): JSX.Element[] {
    const allForumThread = forumThreads.map((forumThread, index) => (
      <Grid item xs={12} key={index}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {forumThread.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {forumThread.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Posted by {forumThread.author}{" "}
              <TimeAgo date={forumThread.created_at} />
            </Typography>
            <Button
              component={Link}
              to={`/forumThread/${forumThread.id}`}
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
            >
              View Post
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ));
    return allForumThread;
  }

  const noForumThread = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <Typography variant="h4">
        No post yet. Why not <Link to="/newForumThread">Create One</Link>
      </Typography>
    </Box>
  );

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Latest Posts
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Bartering for textbooks/notes would be a way to increase liquidity
          </Typography>
        </Container>
      </Box>
      
           <Box
      sx={{
        
        bgcolor: "background.default",
      }}
    >
      <Container sx={{ py: 8 }} maxWidth="md">
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            component={Link}
            to="/newForumThread"
            variant="contained"
            color="primary"
          >
            Create New Post
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="category-label">Filter by Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={currentFilter}
              label="Filter by Category"
              onChange={FilterbyCategory}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Barter">Barter</MenuItem>
              <MenuItem value="Buy with AvoCurve Coin">
                Buy with AvoCurve Coin
              </MenuItem>
              <MenuItem value="Off-Advice">Off-Advice</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {forumThreads}
        </Grid>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          About
          </Button>
          
      </Container>
       </Box>
      
    </>
  );
};

export default ForumThreads;
