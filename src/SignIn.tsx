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

interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const [username, setUsername] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInContent = {
      username,
      password,
    };

    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage("Username or password is incorrect.");
          setSnackbarOpen(true);
          return;
        }
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate(`/forumThreads`);
      })
      .catch((error) => {
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
      <Container
        maxWidth="sm"
        sx={{ mt: 0}}
      >
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
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                component={Link}
                to="/forumThreads"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Back to posts
              </Button>
            </Grid>
          </Grid>
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
