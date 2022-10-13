import { Button } from "@mui/material";
import React, { useState } from "react";

const StyleButton = ({ active, style, label, onToggle }) => {
  const _onToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <Button size="small" variant={active ? "contained" : "outlined"} onClick={_onToggle}>
      {label}
    </Button>
  );
};

export default React.memo(StyleButton);
