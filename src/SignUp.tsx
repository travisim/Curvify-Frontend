import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Snackbar, Alert, useTheme } from "@mui/material";// Import Alert from MUI

const SignUp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // Use for Snackbar open state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Use for error message

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== password_confirmation) {
      setErrorMessage("Passwords do not match."); // Set error message
      setSnackbarOpen(true); // Open the Snackbar
      return;
    }
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/create`;
    if (username.length === 0) return;
    const signInContent = {
      username,
      name,
      email,
      password,
      password_confirmation,
    };
    // const token = document
    //   .querySelector('meta[name="csrf-token"]')
    //   ?.getAttribute("content");
    fetch(url, {
      method: "POST",
      headers: {
        // "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
      // credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (!data.errors) {
          setIsUserCreated(true);
          setTimeout(() => {
            navigate(`/forumThreads`);
          }, 2000);
        } else {
          setErrorMessage(data.errors[0]);
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message || "An error occurred during sign up.");
        setSnackbarOpen(true);
      });
  };

  function displaySucessfullyCreatedAccountAlert() {
    if (isUserCreated === false) {
      return;
    } else {
      return (
        <div className="alert alert-success" role="alert">
          Sucessfully created account! Redirecting to posts, please sign in...
        </div>
      );
    }
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the Snackbar
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        padding: 3,
        borderRadius: 1,
        boxShadow: 3,
      }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            id="passwordConfirmation"
            value={password_confirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link to="/forumThreads" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
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

export default SignUp;
