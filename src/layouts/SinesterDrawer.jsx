import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import img from "../logo-horizontal.png";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../config/ColorModeContextProvider";
import BranchContainer from "../pages/siniestros/BranchContainer";
import { branch } from "../data";
// import Link from '@mui/material/Link';

const drawerWidth = 300;

function SinesterDrawer() {
  const [ramos, setRamos] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  useEffect(() => {
    const asd = branch;
    setRamos(asd);
  }, []);
  useEffect(() => {
    if (ramos.length > 0) {
      setSelectedTab(ramos[2].id_branch);
    }
  }, [ramos]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const drawer = (
    <div>
      <Toolbar>
        <img src={img} alt="horse" width={"100%"} />
      </Toolbar>

      <Tabs
        orientation="vertical"
        value={selectedTab}
        textColor="primary"
        variant="scrollable"
        onChange={handleChange}
      >
        {ramos.map((text, index) => (
          <Tab
            sx={{
              alignItems: "flex-start",
              "&:hover": {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            key={text.id_branch}
            label={text.text_branch}

            // component={Link}
            // to={`/branch/${text.id_branch}`}
          />
        ))}
      </Tabs>
    </div>
  );

  if (!ramos.length || !selectedTab) {
    return;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
          <Stack
            direction={"row"}
            alignItems="center"
            sx={{ justifyContent: "space-between" }} //ver porque no toma el justify content
          >
            <Stack>
              <Typography variant="h6" noWrap component="div">
                Siniestros
              </Typography>
            </Stack>

            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0.2, md: 0.5, xl: 10 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
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
          p: 2,
          width: "100%",
        }}
      >
        <Toolbar />
        {ramos.map((text, index) => (
          <BranchContainer value={selectedTab} index />
        ))}
      </Box>
    </Box>
  );
}

export default SinesterDrawer;
