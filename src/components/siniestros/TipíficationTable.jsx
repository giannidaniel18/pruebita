import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  onSettingDrawerDataToHandle,
  onDeleteTipificacion,
}) {
  const onDelete = (e) => {
    onDeleteTipificacion(e.currentTarget.id);
  };
  const onUpdate = (e) => {
    onSettingDrawerDataToHandle(e);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {HEADERS.map((header) => (
              <TableCell key={header.id} align={!header.cabecera ? "right" : "left"}>
                {header.titulo}
              </TableCell>
            ))}

            {updateMode && (
              <>
                <TableCell align="center">Administrar</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tipificaciones &&
            tipificaciones.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" wrapped="true">
                  {row.evento}
                </TableCell>
                <TableCell align="right">{row.core ? row.core : "sin info"}</TableCell>
                <TableCell align="right">{row.accion ? row.accion : "sin info"}</TableCell>
                <TableCell align="right">{row.resultado_de_gestion ? row.resultado_de_gestion : "sin info"}</TableCell>
                <TableCell align="right">{row.tipo_de_resultado ? row.tipo_de_resultado : "sin info"}</TableCell>

                {updateMode && (
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      id={row._id}
                      name={"update"}
                      data-evento={row.evento}
                      data-core={row.core}
                      data-accion={row.accion}
                      data-resgesdesc={row.resultado_de_gestion}
                      data-tipgesdesc={row.tipo_de_resultado}
                      onClick={onUpdate}
                    >
                      <ModeEditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" id={row._id} onClick={onDelete}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
