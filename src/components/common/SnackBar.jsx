import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SnackBar({ title = "default title", severity = "info", status = true }) {
  const [open, setOpen] = React.useState(status);

  const handleClose = (event, reason) => {
    console.log(reason);
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Note archived">
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {title}
        </Alert>
      </Snackbar>
    </div>
  );
}
