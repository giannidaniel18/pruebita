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
import AdministracionTable from "../../../common/AdministracionTable";
import TextImputControlSmall from "../../../common/TextImputControlSmall";
import { AdminDrawerUpdate } from "../AdminDrawers";
import { useDrawerHandler } from "../../../../hooks/useDrawerHandler";
import { useTutorias } from "../../../../hooks/useMangeRamo";
import LoaderBasic from "../../../common/LoaderBasic";
import SnackBar from "../../../common/SnackBar";
import StatusSwitch from "../../../common/StatusSwitch";

const FORMULARIOS_HEADERS = [
  { id: "form", titulo: "Formulario", cabecera: true },
  { id: "info", titulo: "Información solicitada" },
];
const TUTORIA_HEADERS = [{ id: "tutoria", titulo: "tutorias", cabecera: true }];

export default function UpdateTutorias({ idBranch }) {
  const [currentTutoria, setCurrentTutoria] = useState(null);
  const { control, handleSubmit, resetField } = useForm();
  const { tutorias, createTutoria, loading, modifyTutoria, removeTutoria, requestStatus, updateFormularios } =
    useTutorias(idBranch);

  const {
    drawerDataToHandle,
    drawerVisibleMode,
    onToggleDrawerVisibleMode,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
  } = useDrawerHandler();

  const onAddTutoriaToBranch = (newTutoria) => {
    resetField("titulo");
    createTutoria(newTutoria);
  };
  const onDeleteTutoriaFromBranch = (idTutoria) => {
    removeTutoria(idTutoria);
    setCurrentTutoria(null);
  };
  const onUpdateTutoriaFromBranch = (updatedTutoria) => {
    modifyTutoria(drawerDataToHandle.id, updatedTutoria.tutoria);
  };
  const onUpdateFormsTutorias = async (idTutoria, idForm, status) => {
    const apiResponse = await updateFormularios(idTutoria, idForm, status);
    return apiResponse;
  };

  const handleCurrentTutoria = (e) => {
    if (e.currentTarget.id === currentTutoria?.id) {
      setCurrentTutoria(null);
    } else {
      setCurrentTutoria(tutorias.find((tutoria) => tutoria.id === e.currentTarget.id));
    }
  };
  const onSetData = (e) => {
    onSettingDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "tutoria",
      method: "update",
      data: [{ inputName: "tutoria", label: "Titulo tutoria", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
  };

  return (
    <Stack spacing={2}>
      {loading ? (
        <LoaderBasic />
      ) : (
        <>
          <Typography variant="h5">Bienvenido a la administración Tutorias </Typography>
          <Typography variant="subtitle1">
            En esta sección podrás crear las tutorías necesarias para la toma de denuncia de cada Ramo! para lograr una
            estructura homogénea recomendamos utilizar los mismos nombres para las tutorías. Por ejemplo : "Siniestro
            standard" - "Siniestro express"
          </Typography>
          <AdministracionTable
            headers={TUTORIA_HEADERS}
            rows={tutorias}
            isContainer={true}
            selectedRow={currentTutoria}
            handleSelectedRow={handleCurrentTutoria}
            updateFunction={onSetData}
            deleteFunction={onDeleteTutoriaFromBranch}
            type="tutorias"
          />
        </>
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
      {currentTutoria && <TutoriaTable tutoria={currentTutoria} updateFormsFunc={onUpdateFormsTutorias} />}
      <AdminDrawerUpdate
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        resetDrawerDataToHandle={resetDrawerDataToHandle}
        onPersistData={onUpdateTutoriaFromBranch}
        dataType="Tutoria"
      />
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
    </Stack>
  );
}

function TutoriaTable({ tutoria, updateFormsFunc }) {
  const onUpdateFormulariosFromTutoria = async (idform, status) => {
    const apiResponse = await updateFormsFunc(tutoria.id, idform, status);
    return apiResponse;
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h4">{tutoria.titulo}</Typography>
      <Typography>
        Activa o desactiva el formulario que quieres incluir en la tutoria {tutoria.titulo} de esta manera el asesor
        vera reflejado en la sección de siniestros los datos a solicitarle al cliente. En caso de no encontrar un
        formulario que solicite la información requerida, ponte en contacto con el area desarrolladora del scripting
      </Typography>
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
                  <StatusSwitch
                    idToUpdate={row.id}
                    onChangeFunc={onUpdateFormulariosFromTutoria}
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

// function FormSwitch({ status, idform, handleUpdateTutoria }) {
//   const [checked, setChecked] = React.useState(false);

//   useEffect(() => {
//     setChecked(status);
//   }, [status]);

//   const handleChange = async (e) => {
//     await handleUpdateTutoria(idform, e.target.checked);
//     setChecked(!checked);
//   };

//   return <Switch checked={checked} onChange={handleChange} />;
// }
