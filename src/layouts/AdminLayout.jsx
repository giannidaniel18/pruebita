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
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link as ReactLink, Outlet } from "react-router-dom";

const drawerWidth = 180;

function AdminLayout(props) {
  const { window } = props;
  const [selectedOption, setSelectedOption] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const modulos = [
    { text: "individuos", path: "individuos " },
    // { text: "Empresas", path: "empresas" },
    // { text: "Pymes", path: "pymes" },
    // { text: "Especialistas", path: "especialistas" },
    { text: "Usuarios", path: "usuarios" },
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
            <ListItemButton
              component={ReactLink}
              to={`${modulo.path}`}
              selected={selectedOption === index}
              onClick={(e) => handleSelectedOption(e, index)}
            >
              <ListItemText value={modulo.text} primary={modulo.text} />
            </ListItemButton>
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
