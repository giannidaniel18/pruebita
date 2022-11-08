import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SnackBar({ title = "default title", severity = "info", status, time }) {
  const [open, setOpen] = useState(false);

  //ver que onda esto, porque en realidad si yo le doy 2 veces seguidas al mismo elemento a eliminar el title y severity van a ser iguales
  useEffect(() => {
    setOpen(true);
  }, [time]);

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
