import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Component for creating a new forum thread
const NewForumThread = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [title, setTitle] = useState<string>(""); // State for the thread title
  const [category, setCategory] = useState<string>("Trade"); // State for the thread category, defaulting to "Barter"
  const [body, setBody] = useState<string>(""); // State for the thread body
  const { user, setUser } = useContext(UserContext); // Using context to access the current user
  const theme = useTheme(); // Accessing the current theme
  const textColor = theme.palette.mode === "dark" ? "white" : "black"; // Determining text color based on theme mode

  // Function to strip HTML entities from a string
  const stripHtmlEntities = (str: string) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  // Generic onChange handler for form inputs
  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setFunction(event.target.value);
  };

  // Handler for form submission
  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Preventing default form submission behavior
    if (!user) {
      alert("You must be logged in to create a new thread");
      return;
    }

    // Constructing the URL for the API call
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/forum_thread/create`;
    // Early return if any field is empty
    if ((title.length === 0 || body.length === 0, category.length === 0))
      return;

    // Constructing the payload for the API call
    const forumThreadContent = {
      title,
      category,
      body: stripHtmlEntities(body),
      author: user.username,
      user_id: user.id,
    };

    // const token = document.querySelector<HTMLMetaElement>(
    //   'meta[name="csrf-token"]'
    // )?.content;
    // if (!token) {
    //   console.error("CSRF token not found");
    //   return;
    // }

    // Making the API call to create a new forum thread
    fetch(url, {
      method: "POST",
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
      .then((response) => navigate(`/forumThread/${response.id}`))  // Navigating to the newly created thread
      .catch((error) => console.log(error.message)); // Logging any errors
  };

  // Rendering the form for creating a new forum thread
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 0 }}>
        <Typography variant="h2" component="h1" color="text.primary">
          Add a New Post
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Thread Title"
              variant="outlined"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <MenuItem value="Trade">Trade</MenuItem>
              <MenuItem value="Buy with AvoCurve Coin">
                Buy with AvoCurve Coin
              </MenuItem>
              <MenuItem value="Donations">Donations</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {/* ["Trade", "Buy with AvoCurve Coin", "Donations", "Other"] */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Body"
              variant="outlined"
              multiline
              minRows={5}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create Post
          </Button>
          <Link to="/forumThreads" style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ mt: 2, ml: 2 }}>
              Back to Posts
            </Button>
          </Link>
        </form>
      </Container>
    </Box>
  );
};

export default NewForumThread;
