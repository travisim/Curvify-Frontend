import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "./App";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // Use for Snackbar open state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Use for error message
  
    const { user, setUser } = useContext(UserContext);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase()) && email.endsWith("@u.nus.edu");
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (password !== password_confirmation) {
      setErrorMessage("Passwords do not match."); // Set error message
      setSnackbarOpen(true); // Open the Snackbar
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format. Email must end with @u.nus.edu");
      setSnackbarOpen(true);
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
          localStorage.setItem("token", data.token);
          setUser(data.user);
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
          Sucessfully created account! Redirecting to posts, you are logged in.
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
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h2" component="h1" color="text.primary">
          Sign Up
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Use a NUS email (xxx@u.nus.edu)
        </Typography>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        {displaySucessfullyCreatedAccountAlert()}

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={(event) => onChange(event, setUsername)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={(event) => onChange(event, setName)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(event) => onChange(event, setEmail)}
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
            onChange={(event) => onChange(event, setPassword)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password Confirmation"
            type="password"
            id="password_confirmation"
            autoComplete="new-password"
            onChange={(event) => onChange(event, setPasswordConfirmation)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Button
                component={Link}
                to="/forumThreads"
                fullWidth
                variant="outlined"
              >
                Back to posts
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
