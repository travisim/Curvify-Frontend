import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
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
            About
          </Typography>
          <Typography variant="h5" paragraph color="text.secondary">
            Curvify is a platform for students to trade textbooks and notes.
          </Typography>
          <Box sx={{ my: 4 }}>
            <Button
              component={Link}
              to="/forumThreads"
              variant="contained"
              color="primary"
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

export default About;
