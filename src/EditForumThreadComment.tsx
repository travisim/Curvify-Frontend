import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

interface ForumThreadCommentStorage {
  forum_thread_id: any;
  id: number;
  body: string;
  author: string;
  // user_id: number;
  // created_at: string;
}

const EditForumThreadComment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThreadComment, setForumThreadComment] =
    useState<ForumThreadCommentStorage>({
      forum_thread_id: "",
      id: 0,
      body: "",
      author:""
    });

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
        // console.log(forumThreadComment, "forumThreadComment");

          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setForumThreadComment(response);
        // console.log(forumThreadComment, "forumThreadComment");
      })
      .catch();
  }, [ params.id]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForumThreadComment({
      ...forumThreadComment,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread_comments/update/${params.id}`;
      if (
        forumThreadComment.body.length === 0
      )
        return;
    const forumThreadCommentContent = {
      body: stripHtmlEntities(forumThreadComment.body),
    };
    // const token = (
    //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    // ).content;
    fetch(url, {
      method: "PUT",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadCommentContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() =>
        navigate(`/forumThread/${forumThreadComment.forum_thread_id}`)
      )
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
          Edit Comment
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Body"
              id="body"
              name="body"
              multiline
              rows={5}
              required
              value={forumThreadComment.body}
              onChange={handleChange}
            />
          </FormControl>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Save Edit
            </Button>
            <Button
              component={Link}
              to={`/forumThread/${forumThreadComment.forum_thread_id}`}
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
            >
              Back to Post
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditForumThreadComment;



