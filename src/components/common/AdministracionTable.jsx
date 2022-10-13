import React from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdministracionTable({
  headers,
  rows,
  isContainer = false,
  selectedRow,
  handleSelectedRow,
  updateFunction,
  deleteFunction,
}) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id} align={!header.cabecera ? "right" : "left"}>
                {header.titulo}
              </TableCell>
            ))}
            {isContainer && <TableCell align="center">Ver</TableCell>}
            <TableCell align="right"> Administrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" wrapped="true">
                {row.titulo}
              </TableCell>
              {isContainer && (
                <TableCell align="center" id={row.id} sx={{ width: "170px" }}>
                  <IconButton
                    size="small"
                    id={row.id}
                    color={row.id === selectedRow?.id ? "primary" : undefined}
                    onClick={handleSelectedRow}
                  >
                    {row.id === selectedRow?.id ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </TableCell>
              )}
              <TableCell align="right" sx={{ width: "115px" }}>
                <IconButton size="small" id={row.id} name={row.titulo} onClick={updateFunction}>
                  <ModeEditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" id={row.id} name={row.titulo} onClick={deleteFunction}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}