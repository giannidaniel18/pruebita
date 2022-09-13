import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../config/ColorsPalette";

export default function TipificationTable({ tipificaciones }) {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={
        theme.palette.mode === "dark"
          ? { backgroundColor: ColorsPalette.bg_dark.light }
          : { backgroundColor: ColorsPalette.bg_light.dark }
      }
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Evento</TableCell>
            <TableCell align="right">Core</TableCell>
            <TableCell align="right">Acción</TableCell>
            <TableCell align="right">Resultado de gestión</TableCell>
            <TableCell align="right">Tipo de resultado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tipificaciones &&
            tipificaciones.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.evento}
                </TableCell>
                <TableCell align="right">{row.core ? row.core : "sin info"}</TableCell>
                <TableCell align="right">{row.accion ? row.accion : "sin info"}</TableCell>
                <TableCell align="right">{row.resultado_de_gestion ? row.resultado_de_gestion : "sin info"}</TableCell>
                <TableCell align="right">{row.tipo_de_resultado ? row.tipo_de_resultado : "sin info"}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
