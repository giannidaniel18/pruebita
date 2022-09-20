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
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const HEADERS = [
  { id: "event", titulo: "Situación", cabecera: true },
  { id: "core", titulo: "Core" },
  { id: "accion", titulo: "Accion" },
  { id: "resgesdesc", titulo: "Resultado de gestión" },
  { id: "tipgesdesc", titulo: "Tipo de resultado" },
];
export default function TipificationTable({
  tipificaciones,
  updateMode = false,
  handleDeleteTipificacion,
  handleUpdateTipificacion,
  subtipoId,
}) {
  const theme = useTheme();

  const onDelete = (e) => {
    handleDeleteTipificacion(e.currentTarget.id, subtipoId);
  };
  const onUpdate = (e) => {
    handleUpdateTipificacion(e.currentTarget.dataset, subtipoId);
  };

  return (
    <TableContainer
      component={Paper}
      sx={
        theme.palette.mode === "dark"
          ? { backgroundColor: ColorsPalette.bg_dark.light }
          : { backgroundColor: ColorsPalette.bg_light.dark }
      }
    >
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead
          sx={
            theme.palette.mode === "dark"
              ? { backgroundColor: ColorsPalette.bg_dark.dark }
              : { backgroundColor: ColorsPalette.bg_light.DeepDark }
          }
        >
          <TableRow>
            {HEADERS.map((header) => (
              <TableCell key={header.id} align={!header.cabecera ? "right" : "left"}>
                {header.titulo}
              </TableCell>
            ))}

            {updateMode && (
              <>
                <TableCell align="center">Actualizar</TableCell>
                <TableCell align="center">Eliminar</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tipificaciones &&
            tipificaciones.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th">{row.evento}</TableCell>
                <TableCell align="right">{row.core ? row.core : "sin info"}</TableCell>
                <TableCell align="right">{row.accion ? row.accion : "sin info"}</TableCell>
                <TableCell align="right">{row.resultado_de_gestion ? row.resultado_de_gestion : "sin info"}</TableCell>
                <TableCell align="right">{row.tipo_de_resultado ? row.tipo_de_resultado : "sin info"}</TableCell>

                {updateMode && (
                  <>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        id={row._id}
                        data-id={row._id}
                        data-evento={row.evento}
                        data-core={row.core}
                        data-accion={row.accion}
                        data-resgesdesc={row.resultado_de_gestion}
                        data-tipgesdesc={row.tipo_de_resultado}
                        onClick={onUpdate}
                      >
                        <ModeEditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" id={row._id} onClick={onDelete}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
