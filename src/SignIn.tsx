import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

interface UserStorage {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
  avatar: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  // State hooks for form inputs and error handling
  const [username, setUsername] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handler for input changes
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  // Handler for form submission
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInContent = {
      username,
      password,
    };

    // Fetch request to backend API for login
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Handle login error
          setErrorMessage("Username or password is incorrect.");
          setSnackbarOpen(true);
          return;
        }
        // On successful login
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate(`/forumThreads`);
      })
      .catch((error) => {
        // Handle fetch error
        setErrorMessage("An error occurred during login.");
        setSnackbarOpen(true);
      });
  };

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
          Sign In
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Welcome back
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => onChange(event, setUsername)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => onChange(event, setPassword)}
          />

          <Box >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
            <Link to="/forumThreads" style={{ textDecoration: "none" }}>
              <Button variant="outlined" sx={{ mt: 2, ml: 2 }}>
                Back to Posts
              </Button>
            </Link>
          </Box>
          
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default SignIn;
