import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { UserContext } from "./App";
import TimeAgo from "react-timeago";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardActions, Grid } from "@mui/material";

import { styled } from "@mui/system";

const StyledHero = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  padding: theme.spacing(4),
}));

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const StyledContent = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const StyledForm = styled("form")({
  position: "relative",
});

const StyledButton = styled(Button)({
  position: "absolute",
  bottom: 8,
  right: 8,
});

interface ForumThreadStorage {
  title: string;
  body: string;
  category: string;
  author: string;
  user_id: number;
  created_at: string;
  id: number;
}

interface ForumThreadCommentStorage {
  id: number;
  body: string;
  author: string;
  user_id: number;
  created_at: string;
}

interface UserStorage {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}
// {id: 2, username: 'dean', created_at: '2024-01-24T00:34:20.363Z', updated_at: '2024-01-24T00:34:20.363Z'}
const ForumThread = (): JSX.Element => {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const params = useParams();
  const navigate = useNavigate();
  const [forumThread, setForumThread] = useState<ForumThreadStorage>({
    title: "",
    body: "",
    category: "",
    author: "",
    user_id: 0,
    created_at: "",
    id: 0,
  });
  const [body, setBody] = useState("");
  const { user, setUser } = useContext(UserContext);

  const [forumThreadComments, setForumThreadComments] = useState<
    ForumThreadCommentStorage[]
  >([]);

  console.log(body, "body");

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
      .catch(() => navigate("/forumThreads"));
  }, [params.id, navigate]);

  // const token = (
  //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  // ).content;

  const addHtmlEntities = (str: string): string => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteForumThread = (): void => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/destroy/${params.id}`;
    // const token = (
    //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    // ).content;

    fetch(url, {
      method: "DELETE",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/forumThreads"))
      .catch((error) => console.log(error.message));
  };

  const deleteForumThreadComments = (id: number): void => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/destroy/${id}`;
    // const token = (
    //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    // ).content;
    fetch(url, {
      method: "DELETE",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchCommentsForThread();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then()
      .catch((error) => console.log(error.message));
  };

  const forumThreadBody = addHtmlEntities(forumThread.body);

  const AccessControlComments = (
    forumThreadCommentUserID: number,
    forumThreadCommentID: number
  ): JSX.Element | null => {
    if (user == null) return null;
    if (user.id === forumThreadCommentUserID) {
      return (
       

         <div>
          <div className="btn-group mr-2" role="group">
            <Link
              to={`/editForumThreadComment/${forumThreadCommentID}`}
              className="btn btn-dark"
            >
              Edit
            </Link>
          </div>
          <div className="btn-group mr-2" role="group">
            <button
              type="button"
              className="btn btn-danger "
              onClick={(event) => {
                const id = forumThreadCommentID;
                deleteForumThreadComments(id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const AccessControlThread = (forumThreadID: number): JSX.Element | null => {
    if (user == null) return null;
    if (user.id === forumThreadID) {
      return (
        <Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/editForumThread/${forumThread.id}`}
            sx={{ ml: 2 }}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={deleteForumThread}>
            Delete thread
          </Button>
        </Box>
      );
    }
    return null;
  };

  const generateForumThreadCommentsHTML = (
    forumThreadComments: ForumThreadCommentStorage[]
  ): JSX.Element[] => {
    const allForumThreadComments = forumThreadComments.map(
      (forumThreadComments, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 3, width: "100%" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: forumThreadComments.body.replace(
                  /&lt;br&gt; &lt;br&gt;/g,
                  "<br>"
                ),
              }}
            />

            <Typography variant="body2" color="text.secondary">
              {forumThreadComments.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              <TimeAgo date={forumThread.created_at} />
            </Typography>
            {AccessControlComments(
              forumThreadComments.user_id,
              forumThreadComments.id
            )}
          </CardContent>
        </Card>
      )
    );
    return allForumThreadComments;
  };

  const NoForumThreadCommentsHTML = (
    <Box
      sx={{
        width: "100vw",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" color="text.primary">
        No Comments yet, why not{" "}
        <Link
     
          to="/newforumThreadComments"
         
          color="primary"
    
        >
          create one
        </Link>
      </Typography>
    </Box>
  );

  const ForumThreadCommentsDeterminer = (
    forumThreadComments: ForumThreadCommentStorage[]
  ): JSX.Element => {
    if (forumThreadComments.length > 0) {
      return <>{generateForumThreadCommentsHTML(forumThreadComments)}</>;
    } else {
      return NoForumThreadCommentsHTML;
    }
  };

  const fetchCommentsForThread = (): void => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/showCommentsForThread/${params.id}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setForumThreadComments(res);
      })
      .catch(/*() => navigate("/")*/);
  };

  useEffect(() => {
    fetchCommentsForThread();
  }, []);

  const stripHtmlEntities = (str: string): string => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: Function
  ): void => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const forumThreadCommentContent = {
      body: stripHtmlEntities(body),
      author: user.username,
      user_id: user.id,
      forum_thread_id: params.id,
    };
    setBody("");
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/create`;
    if (body.length === 0) return;
    fetch(url, {
      method: "POST",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadCommentContent),
    })
      .then((response) => {
        if (response.ok) {
          fetchCommentsForThread();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
   
    <Box
      sx={{
        minHeight: "100vh", // Ensure the Box takes the full height of the viewport
        display: "flex",
        flexDirection: "column",

        bgcolor: "background.default",
      }}
    >
      <StyledHero>
        <Overlay />
        <StyledContent sx={{ textAlign: "center" }}>
          <Typography variant="h2" component="h1">
            {forumThread.title}
          </Typography>
          <Typography variant="h4">{forumThread.category}</Typography>
          <Typography variant="h4">{forumThread.author}</Typography>
          <Typography dangerouslySetInnerHTML={{ __html: forumThreadBody }} />
        </StyledContent>
      </StyledHero>

      <Container sx={{ py: 5 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={7}>
            <Grid container>
              <Grid item xs={12} mb={4}>
                <StyledForm onSubmit={onSubmit}>
                  <TextField
                    value={body}
                    placeholder="Comments?"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    onChange={(event) => onChange(event, setBody)}
                  />
                  <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Comment
                  </StyledButton>
                </StyledForm>
              </Grid>
            </Grid>
            <Grid container spacing={0} justifyContent="center" alignItems="center">{ForumThreadCommentsDeterminer(forumThreadComments)}</Grid>
          </Grid>
          <Grid item xs={7}>
            {AccessControlThread(forumThread.user_id)}
          </Grid>
        </Grid>
        {/* <Link
          href="/forumThreads"
          component={Button}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Back to threads
        </Link> */}

        <Button component={Link} to="/forumThreads" variant="outlined">
          Back to posts
        </Button>
      </Container>
    </Box>
  );
};

export default ForumThread;
