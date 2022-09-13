import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { drawerWidth } from "../constants/variablesGlobales";
import { branch } from "../data";
import { Link as ReactLink } from "react-router-dom";

export default function SideNav() {
  const [ramos, setRamos] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    setRamos(branch);
  }, []);

  const handleSelectedBranch = (e, index) => {
    setSelectedBranch(index);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0.1,
        "& .MuiDrawer-paper": {
          marginTop: 8,
          width: "auto",
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {ramos.map((ramo, index) => (
          <ListItem key={ramo.id_branch} disablePadding>
            <ListItemButton
              component={ReactLink}
              to={`${ramo.id_branch}`}
              selected={selectedBranch === index}
              onClick={(e) => handleSelectedBranch(e, index)}
            >
              <ListItemText value={ramo.id_branch} primary={ramo.text_branch} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
