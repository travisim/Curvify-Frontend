import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
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
      <Container maxWidth="md">
        <Box sx={{ bgcolor: "transparent" }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="text.primary"
          >
            Curvify
          </Typography>
          <Typography variant="h5" paragraph color="text.secondary">
            Curvify is a platform for students to trade textbooks and notes.
          </Typography>
          <Box sx={{ my: 4 }}>
            <Button
              component={Link}
              to="/signUp"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
            <Link to="/forumThreads" style={{ textDecoration: "none" }}>
              <Button variant="outlined" sx={{ mt: 2, ml: 2 }}>
                View Posts
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
