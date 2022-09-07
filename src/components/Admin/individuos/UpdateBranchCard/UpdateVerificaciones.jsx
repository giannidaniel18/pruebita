import {
  Card,
  CardContent,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TableVerificaciones from "./TableVerificaciones";

export default function UpdateVerificaciones({ verificaciones }) {
  console.log(verificaciones);
  return (
    <Stack>
      <Typography variant="h4">Administrar Verificaciones</Typography>
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h6">
              Administrar Verificaciones Criticas
            </Typography>
            <TableVerificaciones
              verificaciones={verificaciones.verificaciones_Criticas}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
