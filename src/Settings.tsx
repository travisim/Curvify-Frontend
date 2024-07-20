import React from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

import { Container } from "@mui/material";
import { useState } from "react";
function Settings() {


  const [name, setName] = useState("");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
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
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
          <Typography variant="h2" component="h1" color="text.primary">
            Settings
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Customise your experience here!
          </Typography>

          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>
                    <TextField fullWidth variant="outlined" defaultValue="" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>
                    <TextField fullWidth variant="outlined" defaultValue="" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>
                    <TextField fullWidth variant="outlined" defaultValue="" />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                        src="/path-to-your-image.jpg"
                      />
                      <Box
                        sx={{
                          width: "100%",
                          padding: 2,
                          border: "2px dashed grey",
                          borderRadius: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          component="label"
                          sx={{ width: "100%", height: "100px" }}
                        >
                          To Upload: Click or Drag Here
                          <input type="file" hidden />
                        </Button>
                        <Typography variant="caption" display="block">
                          PNG, JPG or GIF up to 1MB
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" sx={{ marginTop: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
