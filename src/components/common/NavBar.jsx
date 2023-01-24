//REACT AND FUNCTIONS
import React, { useEffect, useState } from "react";
import { ColorModeContext } from "config/ColorModeContextProvider";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
//ICONS
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import BusinessIcon from "@mui/icons-material/Business";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useUserContext } from "context/UserContext";

const settings = [{ idsetting: "logout", title: "LogOut" }];

export default function NavBar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const { currentUser, logOut } = useUserContext();

  //Esto se deberia reemplazar por el contexto del usuario
  useEffect(() => {
    currentUser.group === "admin" ? setIsAdmin(null) : setIsAdmin("none");
  }, [currentUser]);

  const pages = [
    { text: "Individuos", path: "/individuos", display: null, icon: <PersonIcon /> },
    { text: "Empresas", path: "/empresas", display: null, icon: <BusinessIcon /> },
    { text: "Pymes", path: "/pymes", display: null, icon: <StoreIcon /> },
    { text: "Especialistas", path: "/especialistas", display: null, icon: <SupportAgentIcon /> },
    { text: "Administracion", path: "/abmramos", display: isAdmin, icon: <SettingsSuggestIcon /> },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setSelectedNavItem(e.target.text);
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    logOut();
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box px={4} sx={{ paddingX: { xs: 0, sm: 5 } }}>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={ReactLink}
            onClick={() => setSelectedNavItem(null)}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: { xs: 300, md: 400 },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Galicia Seguros
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
                <MenuItem
                  key={page.text}
                  component={ReactLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ display: page.display }}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Galicia Seguros
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                component={ReactLink}
                to={page.path}
                name={page.text}
                onClick={handleCloseNavMenu}
                startIcon={page.icon}
                sx={{
                  my: 2,
                  color: "white",
                  display: page.display,
                  textDecoration: selectedNavItem === page.text && "underline",
                  textUnderlinePosition: "under",
                }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          <Button
            href="https://cacscripting.azurewebsites.net/"
            target="_blank"
            endIcon={<OpenInNewIcon />}
            rel="noreferrer"
            sx={{
              color: "white",
            }}
          >
            Legacy
          </Button>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {currentUser.userName && (
              <>
                <Tooltip title={currentUser.userName}>
                  <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                    <Avatar alt="Remy Sharp" src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
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
                    <MenuItem key={setting.idsetting} onClick={handleLogOut}>
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
