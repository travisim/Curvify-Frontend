import * as React from "react";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from "./App";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { ThemeContext } from "./theme/index";


const pages = ["About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

    const theme = useTheme();
    const { switchColorMode } = useContext(ThemeContext);
    const activateName = useMemo(
      () => (theme.palette.mode === "dark" ? "Light" : "Dark"),
      [theme]
    );

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
    fetch("/logout", {
      method: "POST",
      credentials: "include", // Important to include credentials to ensure cookies are sent
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.error("Error:", error));
    navigate(`/forumThreads`)
    console.log("logged out")
  }
  

  function displaySignInOutbuttons() {
    if (user === null) {
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <MenuItem component={Link} to="/about">
            <Typography textAlign="center">About</Typography>
          </MenuItem>
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
          <MenuItem>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%", // Ensure the container takes full width of the parent
              }}
            >
              {/* Logo */}
              <Box
                component="img"
                sx={{
                  height: 50,
                  width: 50,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginRight: "8px", // Add some space between the logo and the text
                }}
                alt="Logo"
                src={process.env.PUBLIC_URL + "/AvoLogo.png"}
              />
              {/* Text */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/forumThreads"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Curvify
              </Typography>
            </Box>
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
              Curvify
            </Typography>
          </MenuItem>

          <Box sx={{ flexGrow: 2, flexDirection: "row" }}></Box>
          {displaySignInOutbuttons()}
          <Box>{displayLoginStatus()}</Box>

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

          <IconButton sx={{ ml: 1 }} onClick={switchColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
