import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export default function ConfirmationAlert({ onOpen, typeConfirm, title, desc, confirmation }) {
  const [open, setOpen] = React.useState(onOpen);

  const handleDesagree = () => {
    setOpen(false);
    confirmation(false);
  };
  const handleAgree = () => {
    setOpen(false);
    confirmation(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDesagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{typeConfirm}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿ Esta seguro de que desea {typeConfirm + " " + title} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDesagree}>Cancelar</Button>
          <Button onClick={handleAgree} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
