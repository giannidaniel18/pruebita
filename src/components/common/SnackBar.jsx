import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SnackBar({ title = "default title", severity = "info", status = false }) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [title]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false);
    }

    setOpen(false);
  };
  //error, warning, info ,successd
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
