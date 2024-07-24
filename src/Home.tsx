import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// Defines the Home component
const Home = () => {
  // Returns the JSX for the Home component
  return (
    // Box component used as the outer container with full viewport width and height
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
            color = "text.primary"
          >
            Curvify
          </Typography>
          <Typography variant="h5" paragraph color= "text.secondary">
            Make mutually beneficial exchanges in by trading or using AvoCurve
            coins.
          </Typography>
          <Box sx={{ my: 4 }}>
            <Button
              component={Link}
              to="/forumThreads"
              variant="contained"
              color="secondary"
              size="large"
            >
              View Posts
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
