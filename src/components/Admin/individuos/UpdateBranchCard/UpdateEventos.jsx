import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TipificationTable from "../../../siniestros/TipíficationTable";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../../../config/ColorsPalette";
import TextImputControlSmall from "../../../TextImputControlSmall";
import { useBranchContext } from "../../../../context/BranchContext";
import { useForm } from "react-hook-form";

export default function UpdateEventos({ eventos }) {
  const {
    addEventoToBranch,
    deleteEventoFromBranch,
    updateEventoFromBranch,
    addSubtipo_siniestro,
    deleteSubtipo_siniestroFromBranch,
    updateSubtipo_siniestroFromBranch,
    addTipificacionToBranch,
    updateTipificacionFromBranch,
    deleteTipificacionFromBranch,
    addDocumentoToBranch,
    deleteDocumentoFromBranch,
    updateDocumentoFromBranch,
  } = useBranchContext();
  const { control, handleSubmit, resetField } = useForm();
  const [evento, setEvento] = useState(null);
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState([]);
  console.log(evento);
  const onToggleDrawerVisibleMode = () => {
    // esta funcion creo que esta de mas lo que hace, lo puede hacer el SetDrawerVisibleMode
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const onSettingDrawerDataToHandle = (dataArray) => {
    // esta funcion creo que esta de mas, hace lo mismo que el setDrawerDataToHandle
    setDrawerDataToHandle(dataArray);
  };
  const renderData = (id) => {
    id === evento?._id ? setEvento(null) : setEvento(eventos.find((ev) => ev._id === id));
  };

  // handling Eventos
  const onSubmitEvento = (newEvento) => {
    resetField("tituloEvento");
    addEventoToBranch(newEvento);
  };
  const onDeleteEvento = (id) => {
    deleteEventoFromBranch(id);
  };
  const onUpdateEvento = (updatedEvento) => {
    updateEventoFromBranch(drawerDataToHandle[0].id, updatedEvento.evento);
    setDrawerDataToHandle([]);
  };

  //Handling Subtipos
  const onSubmitSubtipo = (newSubtipo) => {
    addSubtipo_siniestro(newSubtipo, evento._id);
  };
  const onDeleteSubtipo = (idSubtipo) => {
    deleteSubtipo_siniestroFromBranch(idSubtipo, evento._id);
  };
  const onUpdateSubtipo = (updatedSubtipo) => {
    updateSubtipo_siniestroFromBranch(drawerDataToHandle[0].id, updatedSubtipo.subtipo, evento._id);
    setDrawerDataToHandle([]);
  };

  //Handling Tipificaciones
  const onSubmitTipificacion = (newTipificacion) => {
    addTipificacionToBranch(newTipificacion, drawerDataToHandle[0].currentSubtipoId, evento._id);
  };
  const onDeleteTipificacion = (idTipificacion, idSubtipo) => {
    deleteTipificacionFromBranch(idTipificacion, idSubtipo, evento._id);
  };
  const onUpdateTipificacion = (updatedTipificacion) => {
    updateTipificacionFromBranch(
      drawerDataToHandle[0].tipificacionId,
      updatedTipificacion,
      drawerDataToHandle[0].currentSubtipoId,
      evento._id
    );
  };

  //Handling Documentacion
  const onSubmitDoc = (newDoc) => {
    addDocumentoToBranch(newDoc.tituloDoc, drawerDataToHandle[0].subtipoid, evento._id);
  };
  const onDeleteDoc = (idDoc, idSubtipo) => {
    deleteDocumentoFromBranch(idDoc, idSubtipo, evento._id);
  };
  const onUpdateDoc = (updatedDoc, idDoc) => {
    updateDocumentoFromBranch(drawerDataToHandle[0].docId, updatedDoc, drawerDataToHandle[0].subtipoid, evento._id);
  };

  return (
    <Stack spacing={2} textAlign={{ xs: "center", md: "left" }}>
      <Stack direction={"row"} justifyContent="space-between">
        <Typography variant="h5">Eventos creados actualmente </Typography>
      </Stack>
      <Typography variant="subtitle1">
        Para ver la información de cada evento y poder actualizarla pulsa el botón "{"{ }"}" de cada evento en la
        columna "Administrar subtipos"
      </Typography>
      <Stack spacing={4}>
        <EventosTable
          eventos={eventos}
          renderData={renderData}
          selectedID={evento?._id}
          onDeleteEvento={onDeleteEvento}
          onSettingDrawerDataToHandle={onSettingDrawerDataToHandle}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        />
      </Stack>
      <form onSubmit={handleSubmit(onSubmitEvento)}>
        <Grid container alignItems="center" textAlign="end" spacing={2}>
          <Grid item xs={12} md={8}>
            <TextImputControlSmall control={control} name="tituloEvento" label="Evento a agregar" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="outlined" type="submit">
              Agregar evento +
            </Button>
          </Grid>
        </Grid>
      </form>
      <Stack>
        {evento ? (
          <EventosAccordion
            evento={evento}
            onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
            onSettingDrawerDataToHandle={onSettingDrawerDataToHandle}
            onSubmitSubtipo={onSubmitSubtipo}
            onDeleteSubtipo={onDeleteSubtipo}
            onDeleteTipificacion={onDeleteTipificacion}
            onSubmitDoc={onSubmitDoc}
            onDeleteDoc={onDeleteDoc}
          />
        ) : (
          <Typography variant="h5"> Por favor selecciona un Evento en la tabla superior</Typography>
        )}
      </Stack>
      <AdminDrawerEventos
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        setDrawerDataToHandle={setDrawerDataToHandle}
        onUpdateEvento={onUpdateEvento}
        onUpdateSubtipo={onUpdateSubtipo}
        onSubmitTipificacion={onSubmitTipificacion}
        onUpdateTipificacion={onUpdateTipificacion}
        onUpdateDoc={onUpdateDoc}
      />
    </Stack>
  );
}

function EventosTable({
  eventos,
  renderData,
  selectedID = "",
  onDeleteEvento,
  onSettingDrawerDataToHandle,
  onToggleDrawerVisibleMode,
}) {
  const HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];
  const theme = useTheme();

  const handleRenderData = (e) => {
    renderData(e.currentTarget.id);
  };
  const handleDelete = (e) => {
    onDeleteEvento(e.currentTarget.id);
  };
  const handleTogleUpdateMode = (e) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: e.currentTarget.id,
        inputName: "evento",
        valueToUpdate: e.currentTarget.name,
        label: "Evento",
        type: "evento",
        method: "update",
      },
    ]);
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
      <Table size="small">
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

            <TableCell align="center">Administrar subtipos</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventos &&
            eventos.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.siniestro}
                </TableCell>
                <TableCell align="center" id={row._id}>
                  <IconButton
                    size="small"
                    id={row._id}
                    color={row._id === selectedID ? "primary" : undefined}
                    onClick={handleRenderData}
                  >
                    {row._id === selectedID ? "{...}" : "{ }"}
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" id={row._id} name={row.siniestro} onClick={handleTogleUpdateMode}>
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" id={row._id} name={row.siniestro} onClick={handleDelete}>
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

function EventosAccordion({
  evento,
  onSubmitSubtipo,
  onDeleteSubtipo,
  onSettingDrawerDataToHandle,
  onToggleDrawerVisibleMode,
  onDeleteTipificacion,
  onSubmitDoc,
  onDeleteDoc,
}) {
  const { control, handleSubmit, resetField } = useForm();

  //Handlers ABM SUBTIPOS
  const handleAddSubtipo = (newSubtipo) => {
    resetField("tituloSubtipo");
    onSubmitSubtipo(newSubtipo);
  };
  const handleDeleteSubtipo = (e) => {
    onDeleteSubtipo(e.currentTarget.id);
  };
  const handleUpdateSubtipo = (e) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: e.currentTarget.id,
        inputName: "subtipo",
        valueToUpdate: e.currentTarget.name,
        label: "Subtipo",
        type: "subtipo",
        method: "update",
      },
    ]);
  };
  //Handlers ABM TIPIFICACIONES
  // a diferencia de la otras altas, para las tipificaciones al tener mas de 1 campo, abro el drawer con la cantidad de campos necesarios en el drawerDataToHanlde
  const handleAddTipificacion = (e) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: "situacion",
        inputName: "situacion",
        valueToUpdate: null,
        label: "situation",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "core",
        inputName: "core",
        valueToUpdate: null,
        label: "Core",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "accion",
        inputName: "accion",
        valueToUpdate: null,
        label: "Accion",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "resgesdesc",
        inputName: "resgesdesc",
        valueToUpdate: null,
        label: "Resultado de gestion",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "tipgesdesc",
        inputName: "tipgesdesc",
        valueToUpdate: null,
        label: "Tipo de resultado",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
    ]);
  };
  const handleDeleteTipificacion = (idTipificacion, subtipoId) => {
    onDeleteTipificacion(idTipificacion, subtipoId);
  };
  const handleUpdateTipificacion = (tipificacionObject, subtipoId) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: "situacion",
        inputName: "situacion",
        valueToUpdate: tipificacionObject.evento,
        label: "situation",
        type: "tipificacion",
        method: "Update",
        currentSubtipoId: subtipoId,
        tipificacionId: tipificacionObject.id,
      },
      {
        id: "core",
        inputName: "core",
        valueToUpdate: tipificacionObject.core,
        label: "Core",
        type: "tipificacion",
        method: "Update",
        currentSubtipoId: subtipoId,
        tipificacionId: tipificacionObject.id,
      },
      {
        id: "accion",
        inputName: "accion",
        valueToUpdate: tipificacionObject.accion,
        label: "Accion",
        type: "tipificacion",
        method: "Update",
        currentSubtipoId: subtipoId,
        tipificacionId: tipificacionObject.id,
      },
      {
        id: "resgesdesc",
        inputName: "resgesdesc",
        valueToUpdate: tipificacionObject.resgesdesc,
        label: "Resultado de gestion",
        type: "tipificacion",
        method: "Update",
        currentSubtipoId: subtipoId,
        tipificacionId: tipificacionObject.id,
      },
      {
        id: "tipgesdesc",
        inputName: "tipgesdesc",
        valueToUpdate: tipificacionObject.tipgesdesc,
        label: "Tipo de resultado",
        type: "tipificacion",
        method: "Update",
        currentSubtipoId: subtipoId,
        tipificacionId: tipificacionObject.id,
      },
    ]);
  };
  //Handlers ABM DOCUMENTOS
  const handleAddDoc = (newDoc) => {
    resetField("tituloDoc");
    onSubmitDoc(newDoc);
  };
  const handleDeleteDoc = (idDoc, idSubtipo) => {
    onDeleteDoc(idDoc, idSubtipo);
  };
  const handleUpdateDoc = (idDoc, titleDoc, idSubtipo) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: "tituloDoc",
        inputName: "tituloDocumento",
        valueToUpdate: titleDoc,
        label: "titulo del documento",
        type: "documento",
        method: "update",
        docId: idDoc,
        subtipoid: idSubtipo,
      },
    ]);
  };

  return (
    <Stack spacing={4} boxShadow={5} p={2}>
      {evento.subtipos_Siniestro.length ? (
        <Typography variant="h5"> Subtipos de siniestros Creados para el evento: {evento?.siniestro}</Typography>
      ) : (
        <Typography variant="h5">
          No existen Subtipos para el evento: {evento?.siniestro}, creá uno nuevo aquí
        </Typography>
      )}
      <Stack id="stackAccordion">
        {evento?.subtipos_Siniestro.map((subtipo) => (
          <Stack key={subtipo._id} direction={{ xs: "column-reverse", md: "row" }}>
            <Accordion sx={{ width: { md: "100%" } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={subtipo.descripcion} id={subtipo._id}>
                {subtipo.descripcion}
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Stack spacing={2}>
                    <DocumentacionTable
                      documentacion={subtipo.documentacion}
                      subtipoId={subtipo._id}
                      handleDeleteDoc={handleDeleteDoc}
                      handleUpdateDoc={handleUpdateDoc}
                    />
                    <form onSubmit={handleSubmit(handleAddDoc)}>
                      <Grid container alignItems="center" textAlign="end" spacing={2}>
                        <Grid item xs={12} md={8}>
                          <TextImputControlSmall control={control} name="tituloDoc" label="Documentacion a agregar" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Button
                            variant="outlined"
                            type="submit"
                            onClick={() => onSettingDrawerDataToHandle([{ subtipoid: subtipo._id }])}
                          >
                            Documentación +
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Stack>

                  <Stack>
                    <TipificationTable
                      tipificaciones={subtipo.tipificacion}
                      subtipoId={subtipo._id}
                      updateMode={true}
                      handleDeleteTipificacion={handleDeleteTipificacion}
                      handleUpdateTipificacion={handleUpdateTipificacion}
                    />

                    <Button
                      sx={{ width: "fit-content" }}
                      alignself="flex-end"
                      id={subtipo._id}
                      onClick={handleAddTipificacion}
                    >
                      Tipificacion +
                    </Button>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Stack direction={"row"} height="fit-content">
              <IconButton size="small" id={subtipo._id} name={subtipo.descripcion} onClick={handleUpdateSubtipo}>
                <ModeEditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" id={subtipo._id} onClick={handleDeleteSubtipo}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <form onSubmit={handleSubmit(handleAddSubtipo)}>
        <Grid container alignItems="center" textAlign="end" spacing={2}>
          <Grid item xs={12} md={8}>
            <TextImputControlSmall control={control} name="tituloSubtipo" label="Subtipo a agregar" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="outlined" type="submit">
              Subtipo +
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}

function DocumentacionTable({ documentacion, handleDeleteDoc, subtipoId, handleUpdateDoc }) {
  const theme = useTheme();

  const onDelete = (e) => {
    handleDeleteDoc(e.currentTarget.id, subtipoId);
  };
  const onUpdate = (e) => {
    handleUpdateDoc(e.currentTarget.id, e.currentTarget.dataset.documenttitle, subtipoId);
  };

  const HEADERS = [{ id: "doc", titulo: "Documento", cabecera: true }];

  return (
    <TableContainer
      component={Paper}
      sx={
        theme.palette.mode === "dark"
          ? { backgroundColor: ColorsPalette.bg_dark.light }
          : { backgroundColor: ColorsPalette.bg_light.dark }
      }
    >
      <Table size="small">
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

            <TableCell align="center">Actualizar</TableCell>
            <TableCell align="center">Actualizar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentacion &&
            documentacion.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.titulo}
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" id={row._id} data-documenttitle={row.titulo} onClick={onUpdate}>
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" id={row._id} onClick={onDelete}>
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

function AdminDrawerEventos({
  drawerVisibleMode,
  onToggleDrawerVisibleMode,
  drawerDataToHandle,
  setDrawerDataToHandle,
  onUpdateEvento,
  onUpdateSubtipo,
  onSubmitTipificacion,
  onUpdateTipificacion,
  onUpdateDoc,
}) {
  const { control, handleSubmit } = useForm();
  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
    setDrawerDataToHandle([]); // creo que lo puse cuando estaba creando el alta de tipificaciones,
  };

  const onSubmit = (data) => {
    switch (drawerDataToHandle[0].type) {
      case "evento":
        onUpdateEvento(data);
        break;
      case "subtipo":
        onUpdateSubtipo(data);
        break;
      case "documento":
        onUpdateDoc(data);
        break;
      case "tipificacion":
        drawerDataToHandle[0].method === "Add" ? onSubmitTipificacion(data) : onUpdateTipificacion(data);
        break;

      default:
        break;
    }
  };

  return (
    <Drawer anchor={"right"} open={drawerVisibleMode}>
      <Stack marginTop={10} width={{ xs: "300px", sm: "500px" }}>
        <Button sx={{ alignSelf: "flex-end" }} onClick={CloseDrawer}>
          X
        </Button>

        <Stack p={{ xs: 1, sm: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center" textAlign="end" spacing={2}>
              {drawerDataToHandle.map((data) => (
                <Grid key={data.id} item xs={12}>
                  <TextImputControlSmall
                    control={control}
                    name={data.inputName}
                    label={data.label}
                    defaultValue={data.valueToUpdate}
                    multiline={true}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  sx={{ alignSelf: "flex-end" }}
                  variant="outlined"
                  type="submit"
                  onClick={onToggleDrawerVisibleMode}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Stack>
    </Drawer>
  );
}
