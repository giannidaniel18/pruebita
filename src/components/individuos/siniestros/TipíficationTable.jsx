import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ConfirmationAlert from "../../common/ConfirmationAlert";

const HEADERS = [
  { id: "event", titulo: "Situación", cabecera: true },
  { id: "core", titulo: "Core" },
  { id: "accion", titulo: "Accion" },
  { id: "tipgesdesc", titulo: "Tipo de resultado" },
  { id: "resgesdesc", titulo: "Resultado de gestión" },
];
export default function TipificationTable({
  tipificaciones,
  updateMode = false,
  onSettingDrawerDataToHandle,
  onDeleteTipificacion,
  dataType,
}) {
  const [confirmationState, setConfirmationState] = useState({});

  const handleConfirmationToDelete = (e) => {
    setConfirmationState({
      onOpen: true,
      typeConfirm: "Eliminar",
      title: dataType,
      id: e.currentTarget.id,
    });
  };

  const getConfirmation = (confirmation) => {
    if (confirmation) onDelete(confirmationState.id);
    setConfirmationState({});
  };

  const onDelete = (tipificacionId) => {
    onDeleteTipificacion(tipificacionId);
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
                <TableCell align="right"> Administrar</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tipificaciones &&
            tipificaciones.map((row, index) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" wrapped="true">
                  {row.titulo}
                </TableCell>
                <TableCell align="right">{row.core ? row.core : "sin info"}</TableCell>
                <TableCell align="right">{row.accion ? row.accion : "sin info"}</TableCell>
                <TableCell align="right">{row.tipo_De_Resultado ? row.tipo_De_Resultado : "sin info"}</TableCell>
                <TableCell align="right">
                  {row.resultado_De_La_Gestion ? row.resultado_De_La_Gestion : "sin info"}
                </TableCell>

                {updateMode && (
                  <TableCell align="right" sx={{ width: "115px" }}>
                    <IconButton
                      size="small"
                      id={row.id}
                      name={"update"}
                      data-titulo={row.titulo}
                      data-core={row.core}
                      data-accion={row.accion}
                      data-resgesdesc={row.resultado_De_La_Gestion}
                      data-tipgesdesc={row.tipo_De_Resultado}
                      onClick={onUpdate}
                    >
                      <ModeEditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" id={row.id} onClick={handleConfirmationToDelete}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {confirmationState.onOpen && (
        <ConfirmationAlert
          onOpen={confirmationState.onOpen}
          typeConfirm={confirmationState.typeConfirm}
          title={confirmationState.title}
          desc={confirmationState.desc}
          confirmation={getConfirmation}
        />
      )}
    </TableContainer>
  );
}
