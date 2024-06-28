import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from "./App";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';


const pages = ["Products"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserContext);
  function displayLoginStatus() {
    if (user === null) {
      return(  <Typography textAlign="center"></Typography>);
    } else {
      return(<Typography textAlign="center">Welcome back {user.username}</Typography>) ;
    }
  }

  function handleLogout(){
    setUser(null)
    localStorage.removeItem("token")
    navigate(`/forumThreads`)
    console.log("logged out")
  }

  function displaySignInOutbuttons() {
    if (user === null) {
      return (

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <MenuItem component={Link} to="/signIn">
          <Typography textAlign="center">Sign In</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/signUp">
          <Typography textAlign="center">Sign up</Typography>
        </MenuItem>
        </Box>
      );
    }
    else {
     
      return (
        <MenuItem onClick={handleLogout } >
      <Typography textAlign="center">Logout</Typography>
      </MenuItem>
      );
    }
    
  }
  //   console.log(displayLoginStatus());

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <MenuItem >

          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              // component={Link} to="/forumThreads"
            variant="h6"
            noWrap
            component="a"
            href="/forumThreads"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
      
          >
            
            Forum
            </Typography>
            </MenuItem>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <MenuItem>
         
          <Typography 
            variant="h5"
            noWrap
            component="a"
            href="/forumThreads"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Forum
            </Typography>
        </MenuItem>
            
          <Box sx={{ flexGrow: 2, flexDirection: 'row' }}>
            
           
          
          
          
          </Box>
          {displaySignInOutbuttons()}
          <Box>
           
           
              {displayLoginStatus()}
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" static/images/avatar/2src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
