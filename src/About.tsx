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
            gutterBottom // Adds bottom margin
            color="text.primary"
          >
            About
          </Typography>
          <Typography variant="h5" paragraph color="text.secondary">
            This project was driven by a realization that for some modules
            (BSP1702) require students to buy a physical textbook for use in the
            finals and the use of a printed pdf copy of the textbook would be
            prohibited. Additionally, since university students are cash
            strapped, trading textbooks/notes would be a way to increase
            liquidity in this market place.
          </Typography>
          <Box sx={{ my: 4 }}>
            <Button
              component={Link} // Makes the button act as a React Router Link
              to="/forumThreads" // The path to navigate to when the button is clicked
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
