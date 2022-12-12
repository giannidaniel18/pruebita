import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import { Link as ReactLink, Outlet } from "react-router-dom";

const drawerWidth = 180;

function AdminLayout(props) {
  const { window } = props;
  const [selectedOption, setSelectedOption] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const modulos = [
    {
      text: "Ramos",
      path: "abmramos",
      icon: <DesignServicesIcon fontSize="medium" />,
      disabled: false,
      tooltip: "Administracion de Ramos",
    },
    {
      text: "Cotizadores",
      path: "abmcotizadores",
      icon: <CalculateOutlinedIcon fontSize="medium" />,
      disabled: true,
      tooltip: "Administracion de consultas",
    },
    {
      text: "Consultas",
      path: "abmconsultas",
      icon: <AutoStoriesOutlinedIcon fontSize="medium" />,
      disabled: true,
      tooltip: "Administracion de cotizadores",
    },
    // { text: "Especialistas", path: "especialistas" },
    // { text: "Usuarios", path: "usuarios" },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSelectedOption = (e, index) => {
    setSelectedOption(index);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {modulos.map((modulo, index) => (
          <ListItem key={modulo.text} disablePadding>
            <Tooltip title={modulo.tooltip}>
              <ListItemButton
                component={ReactLink}
                to={`${modulo.path}`}
                disabled={modulo.disabled}
                selected={selectedOption === index}
                onClick={(e) => handleSelectedOption(e, index)}
              >
                <ListItemIcon>{modulo.icon}</ListItemIcon>
                <ListItemText value={modulo.text} primary={modulo.text} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          marginTop: { xs: "56px", sm: "64px", md: "69px" },
          display: { sm: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "60px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Administración
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        id="layoutContainer"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 6, sm: 3 },
          width: { xs: "100vw", sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
