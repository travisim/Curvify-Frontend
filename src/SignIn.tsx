import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Snackbar, Alert, TextField, Button, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";


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
    event: React.ChangeEvent<HTMLInputElement>,
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
          return
        }
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate(`/forumThreads`);
      })
    .catch(error => {
       setErrorMessage("An error occurred during login.");
       setSnackbarOpen(true);
     
    });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        bgcolor: theme.palette.background.paper, // Adapts to theme background
        boxShadow: 3,
        borderRadius: 2
      }}>
        <Typography component="h1" variant="h5" sx={{ color: theme.palette.text.primary }}>
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to="/forumThreads" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Back to Posts
            </Button>
          </Link>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignIn;
