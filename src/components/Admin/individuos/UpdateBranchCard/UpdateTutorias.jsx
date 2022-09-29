import {
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import { formsAndInfo } from "../../../../constants/variablesGlobales";
import { useBranchContext } from "../../../../context/BranchContext";
import AdministracionTable from "../../../common/AdministracionTable";

const FORMULARIOS_HEADERS = [
  { id: "form", titulo: "Formulario", cabecera: true },
  { id: "info", titulo: "Información solicitada" },
];
const TUTORIA_HEADERS = [{ id: "tutoria", titulo: "tutorias", cabecera: true }];

export default function UpdateTutorias({ tutorias }) {
  const [currentTutoria, setCurrentTutoria] = useState(null);

  const handleCurrentTutoria = (e) => {
    if (e.currentTarget.id === currentTutoria?._id) {
      setCurrentTutoria(null);
    } else {
      setCurrentTutoria(tutorias.find((tutoria) => tutoria._id === e.currentTarget.id));
    }
  };

  const onSettingDrawerDataToHandle = (e) => {
    console.log("update tutoria", e.currentTarget.id);
  };

  const onDeleteTutoria = (e) => {
    console.log("delete tutoria", e.currentTarget.id);
  };

  return (
    <Stack spacing={2}>
      <AdministracionTable
        headers={TUTORIA_HEADERS}
        rows={tutorias}
        isContainer={true}
        selectedRow={currentTutoria}
        handleSelectedRow={handleCurrentTutoria}
        updateFunction={onSettingDrawerDataToHandle}
        deleteFunction={onDeleteTutoria}
        type="tutorias"
      />

      {currentTutoria ? <TutoriaTable tutoria={currentTutoria} /> : "null"}
    </Stack>
  );
}

function TutoriaTable({ tutoria }) {
  const { updateForms } = useBranchContext();

  const handleUpdateTutoria = (idform, status) => {
    updateForms(idform, status);
  };

  return (
    <Stack spacing={2}>
      <Typography>{tutoria.titulo}</Typography>
      <TableContainer sx={{ borderRadius: 50 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {FORMULARIOS_HEADERS.map((header) => (
                <TableCell key={header.id} align="left">
                  {header.titulo}
                </TableCell>
              ))}

              <TableCell align="left">Administrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formsAndInfo?.map((row, index) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="left" id={row.id}>
                  {row.info}
                </TableCell>
                <TableCell>
                  <FormSwitch
                    idform={row.id}
                    handleUpdateTutoria={handleUpdateTutoria}
                    status={tutoria.formularios.includes(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

function FormSwitch({ status, idform, handleUpdateTutoria }) {
  const [checked, setChecked] = React.useState(status);

  useEffect(() => {
    return () => {
      setChecked(status);
    };
  }, [status]);

  const handleChange = (e) => {
    setChecked(!checked);
    handleUpdateTutoria(idform, e.target.checked);
  };

  return (
    <Switch checked={checked} onChange={handleChange} />
    // <form>
    //   <Controller
    //     control={control}
    //     name={idform}
    //     defaultValue={checked}
    //     render={({ field: { onChange, onBlur, value, name, ref } }) => (
    //       <Switch
    //         onBlur={onBlur} // notify when input is touched
    //         onChange={(value) => onChange(value, handleChange(value.target.value))} // send value to hook form
    //         checked={value}
    //         inputRef={ref}
    //       />
    //     )}
    //   />
    // </form>
  );
}
