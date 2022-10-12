import {
  Button,
  Grid,
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
import { useForm } from "react-hook-form";

import { formsAndInfo } from "../../../../constants/variablesGlobales";
import { useBranchContext } from "../../../../context/BranchContext";
import AdministracionTable from "../../../common/AdministracionTable";
import TextImputControlSmall from "../../../common/TextImputControlSmall";
import { AdminDrawerUpdate } from "../AdminDrawers";
import DataNotFound from "../../../common/DataNotFound";

const FORMULARIOS_HEADERS = [
  { id: "form", titulo: "Formulario", cabecera: true },
  { id: "info", titulo: "Información solicitada" },
];
const TUTORIA_HEADERS = [{ id: "tutoria", titulo: "tutorias", cabecera: true }];

export default function UpdateTutorias({ tutorias }) {
  const [currentTutoria, setCurrentTutoria] = useState(null);
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
  const { control, handleSubmit, resetField } = useForm();
  const { addTutoriaToBranch, deleteTutoriaFromBranch, updateTutoriaFromBranch } = useBranchContext();

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle({});
  };

  const onAddTutoriaToBranch = (newTutoria) => {
    resetField("titulo");
    addTutoriaToBranch(newTutoria);
  };
  const onDeleteTutoriaFromBranch = (e) => {
    deleteTutoriaFromBranch(e.currentTarget.id);
    setCurrentTutoria(null);
  };
  const onUpdateTutoriaFromBranch = (updatedTutoria) => {
    updateTutoriaFromBranch(drawerDataToHandle.id, updatedTutoria.tutoria);
  };
  const handleCurrentTutoria = (e) => {
    if (e.currentTarget.id === currentTutoria?.id) {
      setCurrentTutoria(null);
    } else {
      setCurrentTutoria(tutorias.find((tutoria) => tutoria.id === e.currentTarget.id));
    }
  };

  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();

    setDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "tutoria",
      method: "update",
      data: [{ inputName: "tutoria", label: "Titulo tutoria", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
  };

  return (
    <Stack spacing={2}>
      {!tutorias.length ? (
        <DataNotFound>
          <Stack>
            <Typography px={2} variant="h5">
              No existen Tutorias creadas para el ramo actual.
            </Typography>
            <Typography px={2} py={1} variant="h6">
              Crea la primera aqui!
            </Typography>
          </Stack>
        </DataNotFound>
      ) : (
        <AdministracionTable
          headers={TUTORIA_HEADERS}
          rows={tutorias}
          isContainer={true}
          selectedRow={currentTutoria}
          handleSelectedRow={handleCurrentTutoria}
          updateFunction={onSettingDrawerDataToHandle}
          deleteFunction={onDeleteTutoriaFromBranch}
          type="tutorias"
        />
      )}
      <form onSubmit={handleSubmit(onAddTutoriaToBranch)}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <TextImputControlSmall control={control} name="titulo" label="Tutoria a agregar" />
          </Grid>
          <Grid item xs={12} md={4} textAlign="right">
            <Button variant="outlined" type="submit">
              Tutoria +
            </Button>
          </Grid>
        </Grid>
      </form>
      {currentTutoria && <TutoriaTable tutoria={currentTutoria} />}

      <AdminDrawerUpdate
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        resetDrawerDataToHandle={resetDrawerDataToHandle}
        onPersistData={onUpdateTutoriaFromBranch}
      />
    </Stack>
  );
}

function TutoriaTable({ tutoria }) {
  const { updateFormulariosFromTutoria } = useBranchContext();
  const onUpdateFormulariosFromTutoria = (idform, status) => {
    updateFormulariosFromTutoria(tutoria.id, idform, status);
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
                    handleUpdateTutoria={onUpdateFormulariosFromTutoria}
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
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(status);
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
