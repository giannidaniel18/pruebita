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
  } = useBranchContext();
  const [evento, setEvento] = useState(null);
  const { control, handleSubmit, resetField } = useForm();
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState([]);
  console.log(drawerDataToHandle);

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const renderData = (id) => {
    id === evento?._id ? setEvento(null) : setEvento(eventos.find((ev) => ev._id === id));
  };

  const onSettingDrawerDataToHandle = (dataArray) => {
    setDrawerDataToHandle(dataArray);
  };

  // handling Eventos
  const onSubmitEvento = (data) => {
    resetField("tituloEvento");
    addEventoToBranch(data);
  };
  const onDeleteEvento = (id) => {
    deleteEventoFromBranch(id);
  };
  const onUpdateEvento = (newData) => {
    updateEventoFromBranch(drawerDataToHandle[0].id, newData.evento);
    setDrawerDataToHandle([]);
  };

  //Handling Subtipos
  const onSubmitSubtipo = (data) => {
    addSubtipo_siniestro(data, evento._id);
  };
  const onDeleteSubtipo = (idSubtipo) => {
    deleteSubtipo_siniestroFromBranch(idSubtipo, evento._id);
  };
  const onUpdateSubtipo = (data) => {
    updateSubtipo_siniestroFromBranch(drawerDataToHandle[0].id, data.subtipo, evento._id);
    setDrawerDataToHandle([]);
  };

  //Handling Tipificaciones

  const onSubmitTipificacion = (data) => {
    addTipificacionToBranch(data, drawerDataToHandle[0].currentSubtipoId, evento._id);
  };
  const onDeleteTipificacion = (data) => {};
  const onUpdateTipificacion = (data) => {};
  const tipificacionMethods = {
    onSubmitTipificacion: onSubmitTipificacion,
    onDeleteTipificacion: onDeleteTipificacion,
    onUpdateTipificacion: onUpdateTipificacion,
  };
  //Handling Documentacion

  return (
    <Stack spacing={2} textAlign={{ xs: "center", md: "left" }}>
      <Stack direction={"row"} justifyContent="space-between">
        <Typography variant="h5">Eventos creados actualmente </Typography>
      </Stack>
      <Typography variant="subtitle1">
        Para ver la información de cada evento y poder actualizarla pulsa el botón "{"{...}"}" de cada evento en la
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
            tipificacionMethods={tipificacionMethods}
          />
        ) : (
          <Typography variant="h5"> Por favor selecciona un en la tabla superior</Typography>
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
  const theme = useTheme();
  const handleRenderData = (e) => {
    renderData(e.currentTarget.id);
  };

  const HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];

  const handleDelete = (e) => {
    onDeleteEvento(e.currentTarget.id);
  };
  const handleTogleUpdateMode = (e) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: e.currentTarget.id,
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

function DocumentacionTable({ documentacion }) {
  const theme = useTheme();

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
                  <IconButton size="small" id={row._id} onClick={() => console.log("actualizar Evento")}>
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" id={row._id} onClick={() => console.log("Eliminar Evento")}>
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
  tipificacionMethods,
}) {
  const { control, handleSubmit, resetField } = useForm();

  const onSubmit = (data) => {
    resetField("tituloSubtipo");
    onSubmitSubtipo(data);
  };
  const handleDelete = (e) => {
    onDeleteSubtipo(e.currentTarget.id);
  };
  const handleTogleUpdateMode = (e) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: e.currentTarget.id,
        valueToUpdate: e.currentTarget.name,
        label: "Subtipo",
        type: "subtipo",
        method: "update",
      },
    ]);
  };

  const { onDeleteTipificacion, onUpdateTipificacion } = tipificacionMethods;

  const onAddTipificacion = (e) => {
    onToggleDrawerVisibleMode();
    onSettingDrawerDataToHandle([
      {
        id: "situacion",
        valueToUpdate: null,
        label: "situation",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "core",
        valueToUpdate: null,
        label: "Core",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "accion",
        valueToUpdate: null,
        label: "Accion",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "resgesdesc",
        valueToUpdate: null,
        label: "Resultado de gestion",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
      },
      {
        id: "tipgesdesc",
        valueToUpdate: null,
        label: "Tipo de resultado",
        type: "tipificacion",
        method: "Add",
        currentSubtipoId: e.currentTarget.id,
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
                <Stack>
                  <Card>
                    <DocumentacionTable documentacion={subtipo.documentacion} />
                  </Card>
                  <Button sx={{ width: "fit-content" }}>+ Documento</Button>
                </Stack>
                <Stack>
                  <Card>
                    <TipificationTable tipificaciones={subtipo.tipificacion} drawerVisibleMode={true} />
                  </Card>
                  <Button
                    sx={{ width: "fit-content" }}
                    alignself="flex-end"
                    id={subtipo._id}
                    onClick={onAddTipificacion}
                  >
                    + Tipificacion
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Stack direction={"row"} height="fit-content">
              <IconButton size="small" id={subtipo._id} name={subtipo.descripcion} onClick={handleTogleUpdateMode}>
                <ModeEditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" id={subtipo._id} onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
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

function AdminDrawerEventos({
  drawerVisibleMode,
  onToggleDrawerVisibleMode,
  drawerDataToHandle,
  setDrawerDataToHandle,
  onUpdateEvento,
  onUpdateSubtipo,
  onSubmitTipificacion,
}) {
  const { control, handleSubmit } = useForm();
  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
    setDrawerDataToHandle([]);
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
        console.log("updating documento");
        break;
      case "tipificacion":
        drawerDataToHandle[0].method === "Add"
          ? onSubmitTipificacion(data)
          : console.log("Updateando tipificacion", data);
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
                    name={data.method === "Add" ? data.id : data.type}
                    label={data.label}
                    defaultValue={data.valueToUpdate}
                    multiline={true}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button sx={{ alignSelf: "flex-end" }} variant="outlined" type="submit">
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
