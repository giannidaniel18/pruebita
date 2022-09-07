import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../../../config/ColorsPalette";

export default function TableVerificaciones({ verificaciones }) {
  const theme = useTheme();
  return (
    <TableContainer>
      <Paper
        sx={
          theme.palette.mode === "dark"
            ? { backgroundColor: ColorsPalette.bg_dark.light }
            : { backgroundColor: ColorsPalette.bg_light.dark }
        }
      >
        <Table aria-label="simple table" size="small">
          <TableHead
            sx={
              theme.palette.mode === "dark"
                ? { backgroundColor: ColorsPalette.bg_dark.dark }
                : { backgroundColor: ColorsPalette.bg_light.DeepDark }
            }
          >
            <TableRow>
              <TableCell>Titulo verificación</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="right">Actualizar</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verificaciones.map((row) => (
              <TableRow key={row._id}>
                <TableCell scope="row">{row.titulo}</TableCell>
                <TableCell align="left">{row.descripcion}</TableCell>
                <TableCell align="center">a</TableCell>
                <TableCell align="center">b</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
}
