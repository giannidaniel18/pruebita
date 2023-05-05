import React from "react";
import { Button, Card, Stack, Typography } from "@mui/material";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import HomeIcon from "@mui/icons-material/Home";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, mensajeError: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, mensajeError: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Card>
          <Stack spacing={4} alignItems="center" p={4}>
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <SentimentVeryDissatisfiedOutlinedIcon color="primary" sx={{ fontSize: 100 }} />

              <Typography variant={"h5"} color="primary">
                Ups! Algo no salió como esperábamos
              </Typography>
            </Stack>
            <Button href="/" variant="contained" startIcon={<HomeIcon />}>
              Volver al inicio
            </Button>
          </Stack>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
