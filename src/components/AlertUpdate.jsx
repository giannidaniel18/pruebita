import { Alert } from "@mui/material";
import React from "react";

export default function AlertUpdate({ text, severity, color }) {
  return (
    <Alert severity={severity} variant="outlined" color={color} sx={{ paddingY: 0 }}>
      {text}
    </Alert>
  );
}
