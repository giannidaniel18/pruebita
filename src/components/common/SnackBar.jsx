import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SnackBar({ title = "default title", severity = "info" }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false);
    }
    setOpen(false);
  };
  //error, warning, info ,success
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ width: "100%" }} severity={severity}>
          {title}
        </Alert>
      </Snackbar>
    </div>
  );
}
