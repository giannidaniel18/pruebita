import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoaderBasic({ size }) {
  return <CircularProgress size={size} />;
}
