import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  FormControl,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./App";


import { Container } from "@mui/material";
import { useState, useEffect } from "react";

interface UserStorage {
  id: number;
  username: string;
  avatar: string;
  email: string;
  password: string;
}

function Settings() {

  const { user, setUser } = React.useContext(UserContext);
 const [userTemp, setUserTemp] = useState<UserStorage>({
   id: 0,
   username: "",
   avatar: "",
   email: "",
   password: "",
 });
  const params = useParams();
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<any>): void => {
    setUserTemp({
      ...userTemp,
      [e.target.name]: e.target.value,
    });
  };


   const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
     event.preventDefault();
     const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/user/update/${params.id}`;
     if (
       user.name.length === 0 
     )
       return;
     const userContent = {
       name: user.name,
       username: user.username,
       email: user.email,
       password: user.password,
       // user_id: user.id,
     };
     // const token = (
     //   document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
     // ).content;
     fetch(url, {
       method: "PUT",
       headers: {
         // "X-CSRF-Token": token,
         "Content-Type": "application/json",
       },
       body: JSON.stringify(userContent),
     })
       .then((response) => {
         if (response.ok) {
           return response.json();
         }
         throw new Error("Network response was not ok.");
       })
       .then(() => navigate(`/forumThreads`))
       .catch((error) => console.log(error.message));
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
          <form onSubmit={onSubmit}>
            <FormControl fullWidth margin="normal">
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          variant="outlined"
                          defaultValue=""
                          value={user.name}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          variant="outlined"
                          defaultValue=""
                          value={user.username}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          variant="outlined"
                          defaultValue=""
                          value={user.email}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Password</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          variant="outlined"
                          defaultValue=""
                          
                
                          onChange={handleChange}
                        />
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

              <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                Save Changes
              </Button>
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
