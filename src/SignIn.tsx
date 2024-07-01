import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Snackbar, Alert } from "@mui/material"; 

interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}
const SignIn = () => {
  const navigate = useNavigate();
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
    if (username.length === 0) return;
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
      console.error('Error:', error);
     
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Sign In</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                required
                onChange={(event) => onChange(event, setUsername)}
              />
            </div>
            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                required
                onChange={(event) => onChange(event, setPassword)}
              />
            </div>

            <button type="submit" className="btn btn-dark mt-3">
              Sign In
            </button>

            <Link to="/forumThreads" className="btn btn-dark mt-3 ">
              Back to posts
            </Link>
          </form>
        </div>
      </div>
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
    </div>
  );
};

export default SignIn;
