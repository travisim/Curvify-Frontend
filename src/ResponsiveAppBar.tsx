import * as React from "react";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from "./App";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useContext, useMemo,useEffect } from "react";
import { ThemeContext } from "./theme/index";
import EditForumThreadComment from "./EditForumThreadComment";

// Defining constants for navigation and settings options
const pages = ["About"];
const settings = [/*"Profile"]; , "Account", "Dashboard",*/ "Logout"];

// Main component function
function ResponsiveAppBar() {
  // Hooks for navigation and theme context
  const navigate = useNavigate();

  const theme = useTheme();
  const { switchColorMode } = useContext(ThemeContext);

  // Using UserContext to manage user state
  const { user, setUser } = React.useContext(UserContext);

  // Function to handle logout
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    // fetch("/logout", {
    //   method: "POST",
    //   credentials: "include", // Important to include credentials to ensure cookies are sent
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data.message))
    //   .catch((error) => console.error("Error:", error));
    // navigate(`/forumThreads`);
    // console.log("logged out");
  }

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, you can verify the token with the backend here
      fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()).then((data) => {
        console.log(data);
        setUser(data);
      });
          
     
    }
  }, []);


  // State hooks for managing menu anchor elements
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // Handlers for opening and closing navigation and user menus
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
  const handleMenuItemClick = (setting: string) => {
    if (setting === "Logout") {
      handleLogout();
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
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

          {pages.map((page) => (
            <MenuItem
              component={Link}
              to={`/${page.toLowerCase()}`}
              key={page}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}

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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Toggle Dark/Light Mode">
              <IconButton
                sx={{ mr: 1 }}
                onClick={switchColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                  <Tooltip title="Settings">
              <IconButton
                sx={{ mr: 1 }}
                color="inherit"
                component={Link}
                to="/settings"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={user.avatar || ""}>
                      {!user.avatar && user.username.charAt(0)}
                    </Avatar>
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
                  <Typography textAlign="center" sx={{ p: 2 }}>
                    Welcome, {user.username}
                  </Typography>
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuItemClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/signIn"
                variant="contained"
                color="primary"
              >
                <Typography textAlign="center">Sign In</Typography>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
