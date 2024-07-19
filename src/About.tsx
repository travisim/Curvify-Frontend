import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";

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
            sx={{ color: textColor }}
          >
            About
          </Typography>
          <Typography variant="h5" paragraph sx={{ color: textColor }}>
            This project was driven by a realization that for some modules
            (BSP1702) require students to buy a physical textbook for use in the
            finals and the use of a printed pdf copy of the textbook would be
            prohibited. Additionally, since university students are cash
            strapped, bartering for textbooks/notes would be a way to increase
            liquidity in this market place.
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

export default About;
