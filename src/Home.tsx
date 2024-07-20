import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Home = () => {
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
            Curvify
          </Typography>
          <Typography variant="h5" paragraph sx={{ color: textColor }}>
            Make mutually beneficial exchanges in by bartering or using AvoCurve
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
