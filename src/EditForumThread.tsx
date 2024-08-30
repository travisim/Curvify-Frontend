import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";


interface ForumThreadStorage {
  title: string;
  category: string;
  body: string;
  id?: number;
}

const EditForumThread: React.FC = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [forumThread, setForumThread] = useState<ForumThreadStorage>({
    title: "",
    category: "",
    body: "",
  });


  const stripHtmlEntities = (str: string): string => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setFunction(event.target.value);
  };


  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setForumThread(response))
      .catch();
  }, [params.id]);


  const handleChange = (e: React.ChangeEvent<any>): void => {
    setForumThread({
      ...forumThread,
      [e.target.name]: e.target.value,
    });
  };


  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/update/${params.id}`;
    if (
      forumThread.title.length === 0 ||
      forumThread.category.length === 0 ||
      forumThread.body.length === 0
    )
      return;
    const forumThreadContent = {
      title: forumThread.title,
      category: forumThread.category,
      body: stripHtmlEntities(forumThread.body),
      // user_id: user.id,
    };
    // const token = (
    //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    // ).content;
    fetch(url, {
      method: "PUT",
      headers: {
        // "X-CSRF-Token": token,
        Authorization: `Bearer ${localStorage.getItem("token")}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate(`/forumThread/${forumThread.id}`))
      .catch((error) => console.log(error.message));
  };


  return (
    <Box
      justifyContent="center"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Box width={{ xs: "100%", lg: "50%" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          Edit Thread
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Thread Name"
              type="text"
              name="title"
              id="title"
              required
              value={forumThread.title ? forumThread.title : ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category name</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              id="category"
              required
              value={forumThread.category}
              onChange={handleChange}
            >
              <MenuItem value="Trade">Trade</MenuItem>
              <MenuItem value="Buy with AvoCurve Coin">
                Buy with AvoCurve Coin
              </MenuItem>
              <MenuItem value="Donations">Donations</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>


          <FormControl fullWidth margin="normal">
            <TextField
              label="Body"
              id="body"
              name="body"
              multiline
              rows={5}
              required
              value={forumThread.body}
              onChange={handleChange}
            />
          </FormControl>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Edit Thread
            </Button>
            <Button
              component={Link}
              to="/forumThreads"
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
            >
              Back to threads
            </Button>
          </Box>
        </form>
      </Box>
    </Box>

  );
};

export default EditForumThread;
