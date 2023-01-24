import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useUserContext } from "context/UserContext";
import { Link as ReactLink } from "react-router-dom";

export default function Home() {
  const { currentUser } = useUserContext();
  return (
    <Stack alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
      {currentUser.userName ? (
        <>
          <Typography variant="h1" color="primary">
            bienvenido al Scripting CAC
          </Typography>
          <Typography variant="h2" color="white">
            usuario : {currentUser.userName}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h1" color="primary">
            Scripting CAC
          </Typography>
          <Typography variant="h2" color="white">
            <Button to={"/login"} component={ReactLink} variant="contained">
              Iniciar sesión
            </Button>
          </Typography>
        </>
      )}
    </Stack>
  );
}
