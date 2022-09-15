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
  const { addEventoToBranch, deleteEventoFromBranch } = useBranchContext();
  const [evento, setEvento] = useState(null);
  const { control, handleSubmit, resetField } = useForm();
  const [updateMode, setUpdateMode] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState([]);

  const renderData = (id) => {
    setEvento(eventos.find((ev) => ev._id === id));
  };

  const onSubmit = (data) => {
    resetField("tituloEvento");
    addEventoToBranch(data);
  };

  const onDelete = (id) => {
    deleteEventoFromBranch(id);
  };
  const onSettingDataToUpdate = (dataObject) => {
    setDataToUpdate([dataObject]);
  };

  const onToggleUpdateMode = () => {
    setUpdateMode(!updateMode);
  };

  const onUpdateEvento = (newData) => {
    const updatedData = dataToUpdate;
    updatedData.oldValue = newData.evento;
    console.log(newData.evento);
  };

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
          onDelete={onDelete}
          onSettingDataToUpdate={onSettingDataToUpdate}
          onToggleUpdateMode={onToggleUpdateMode}
        />
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <EventosAccordion evento={evento} />
        ) : (
          <Typography variant="h5"> Por favor selecciona un en la tabla superior</Typography>
        )}
      </Stack>
      <AdminDrawerEventos
        updateMode={updateMode}
        onToggleUpdateMode={onToggleUpdateMode}
        dataToUpdate={dataToUpdate}
        onUpdateEvento={onUpdateEvento}
      />
    </Stack>
  );
}

function EventosTable({ eventos, renderData, selectedID = "", onDelete, onSettingDataToUpdate, onToggleUpdateMode }) {
  const theme = useTheme();
  const handleRenderData = (e) => {
    renderData(e.currentTarget.id);
  };

  const HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];

  const handleDelete = (e) => {
    onDelete(e.currentTarget.id);
  };
  const handleTogleUpdateMode = (e) => {
    onToggleUpdateMode();
    onSettingDataToUpdate({
      id: e.currentTarget.id,
      oldValue: e.currentTarget.name,
      label: "Evento",
      type: "evento",
    });
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

function EventosAccordion({ evento }) {
  return (
    <Stack spacing={4} boxShadow={5} p={2}>
      {evento.subtipos_Siniestro.length ? (
        <Typography variant="h5"> Subtipos de siniestros Creados para el evento: {evento?.siniestro}</Typography>
      ) : (
        <Typography variant="h5">
          No existen Subtipos para el evento: {evento?.siniestro}, creá uno nuevo aquí
        </Typography>
      )}

      <Stack>
        {evento?.subtipos_Siniestro.map((subtipo) => (
          <Accordion key={subtipo._id}>
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
                  <TipificationTable tipificaciones={subtipo.tipificacion} updateMode={true} />
                </Card>
                <Button sx={{ width: "fit-content" }} alignself="flex-end">
                  + Tipificacion
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
      <Button sx={{ width: "fit-content" }} variant="outlined">
        + Nuevo subtipo de siniestro
      </Button>
    </Stack>
  );
}

function AdminDrawerEventos({ updateMode, onToggleUpdateMode, dataToUpdate, onUpdateEvento }) {
  const { control, handleSubmit } = useForm();
  const CloseDrawer = () => {
    onToggleUpdateMode();
  };

  const onSubmit = (data) => {
    switch (dataToUpdate[0].type) {
      case "evento":
        onUpdateEvento(data);
        break;
      case "subtipo":
        console.log("updating subtipo");
        break;
      case "documento":
        console.log("updating documento");
        break;
      case "tipificacion":
        console.log("updating tipificacion");
        break;

      default:
        break;
    }
  };

  return (
    <Drawer anchor={"right"} open={updateMode}>
      <Stack marginTop={10} width={{ xs: "300px", sm: "500px" }}>
        <Button sx={{ alignSelf: "flex-end" }} onClick={CloseDrawer}>
          X
        </Button>

        <Stack p={{ xs: 1, sm: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center" textAlign="end" spacing={2}>
              {dataToUpdate.map((data) => (
                <Grid key={data.id} item xs={12}>
                  <TextImputControlSmall
                    control={control}
                    name={data.type}
                    label={data.label}
                    defaultValue={data.oldValue}
                    multiline={true}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button sx={{ alignSelf: "flex-end" }} variant="outlined" type="submit" onClick={CloseDrawer}>
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Stack>
    </Drawer>
  );
}
