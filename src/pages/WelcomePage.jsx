import React from "react";
import { Typography, Card, Stack } from "@mui/material";
import { welcomePagesData } from "constants/variablesGlobales";
import ErrorBoundary from "components/common/ErrorBoundary";

export default function WelcomePage({ idWelcome }) {
  const welcomeObject = welcomePagesData?.find((data) => data.id === idWelcome);

  return (
    <ErrorBoundary>
      <Card>
        <Stack spacing={4} alignItems="center" p={4}>
          <Typography variant={"h5"} color="primary">
            Bienvenido a la sección {welcomeObject.titulo}
          </Typography>
          <Typography variant={"h5"}>{welcomeObject.subtitulo}</Typography>
        </Stack>
      </Card>
    </ErrorBoundary>
  );
}
