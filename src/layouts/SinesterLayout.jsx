import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ReactLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

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
  Toolbar,
  Typography,
  ListItemText,
} from "@mui/material";
import { useRamos } from "../hooks/useRamos";

const drawerWidth = 230;

export default function SinesterLayout({ negocio }) {
  const { branches } = useRamos();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectedBranch = (e) => {
    setSelectedBranch(e.currentTarget.id);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {branches
          .filter((ramoActivo) => ramoActivo.estado)
          .filter((ramo) => ramo.negocio === negocio) //ver como filtrar aca por individuos dependiendo de la ruta
          .map((ramo) => (
            <ListItem key={ramo.id} disablePadding>
              <ListItemButton
                component={ReactLink}
                to={`${ramo.id}`}
                selected={selectedBranch === ramo.id}
                id={ramo.id}
                onClick={handleSelectedBranch}
              >
                <ListItemText value={ramo.id} primary={ramo.titulo} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

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
            Siniestros
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
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
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3 },
          py: 3,
          width: { xs: "100vw", sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
