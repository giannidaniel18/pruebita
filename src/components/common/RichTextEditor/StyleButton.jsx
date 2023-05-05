import { IconButton } from "@mui/material";
import React from "react";

const StyleButton = ({ active, style, icon, onToggle }) => {
  const _onToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <IconButton size="small" color={active ? "primary" : undefined} onClick={_onToggle}>
      {icon}
    </IconButton>
  );
};

export default React.memo(StyleButton);
