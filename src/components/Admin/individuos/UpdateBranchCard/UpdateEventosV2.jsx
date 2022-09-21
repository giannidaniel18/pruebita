import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../../../config/ColorsPalette";
import TextImputControlSmall from "../../../TextImputControlSmall";
import { useBranchContext } from "../../../../context/BranchContext";
import { useForm } from "react-hook-form";

const EVENTOS_HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];
const SUBTIPOS_HEADERS = [{ id: "subtipo", titulo: "Subtipos", cabecera: true }];
const DOCUMENTOS_HEADERS = [{ id: "documento", titulo: "Documentos", cabecera: true }];

export default function UpdateEventosV2({ eventos }) {
  const [currentEvento, setCurrentEvento] = useState(null);
  const [currentSubtipo, setCurrentSubtipo] = useState(null);
  const theme = useTheme();

  const handleCurrentEvent = (e) => {
    if (e.currentTarget.id === currentEvento?._id) {
      setCurrentEvento(null);
      setCurrentSubtipo(null);
    } else {
      setCurrentEvento(eventos.find((ev) => ev._id === e.currentTarget.id));
      setCurrentSubtipo(null);
    }
  };
  const resetCurrentEvent = () => {
    setCurrentEvento(null);
  };
  const handleCurrentSubtipo = (e) => {
    e.currentTarget.id === currentSubtipo?._id
      ? setCurrentSubtipo(null)
      : setCurrentSubtipo(currentEvento.subtipos_Siniestro.find((ev) => ev._id === e.currentTarget.id));
  };
  const resetCurrentSubtipo = () => {
    setCurrentSubtipo(null);
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
        <EventosPanel
          eventos={eventos}
          handleCurrentEvent={handleCurrentEvent}
          currentEvento={currentEvento}
          resetCurrentEvent={resetCurrentEvent}
        />
      </Stack>

      <Stack>
        {currentEvento ? (
          <SubtiposPanel
            currentEvento={currentEvento}
            handleCurrentSubtipo={handleCurrentSubtipo}
            currentSubtipo={currentSubtipo}
            resetCurrentSubtipo={resetCurrentSubtipo}
          />
        ) : (
          <Typography variant="h5"> Por favor selecciona un Evento en la tabla superior</Typography>
        )}
      </Stack>
    </Stack>
  );
}

function EventosPanel({ eventos, handleCurrentEvent, currentEvento, resetCurrentEvent }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState([]);
  const { control, handleSubmit, resetField } = useForm();
  const { addEventoToBranch, deleteEventoFromBranch, updateEventoFromBranch } = useBranchContext();

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle([]);
  };
  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();
    setDrawerDataToHandle([
      {
        id: e.currentTarget.id,
        inputName: "evento",
        valueToUpdate: e.currentTarget.name,
        label: "Evento",
        type: "evento",
        method: "update",
        multiline: false,
      },
    ]);
  };
  const onAddEvento = (newEvento) => {
    addEventoToBranch(newEvento);
    resetField("tituloEvento");
  };
  const onDeleteEvento = (e) => {
    deleteEventoFromBranch(e.currentTarget.id);
    resetCurrentEvent();
  };
  const onUpdateEvento = (updatedEvento) => {
    updateEventoFromBranch(drawerDataToHandle[0].id, updatedEvento.evento);
  };
  return (
    <>
      <TableContainer sx={{ borderRadius: 50 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {EVENTOS_HEADERS.map((header) => (
                <TableCell key={header.id} align={!header.cabecera ? "right" : "left"}>
                  {header.titulo}
                </TableCell>
              ))}

              <TableCell align="center">Administrar subtipos</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos?.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.siniestro}
                </TableCell>
                <TableCell align="center" id={row._id}>
                  <IconButton
                    size="small"
                    id={row._id}
                    color={row._id === currentEvento?._id ? "primary" : undefined}
                    onClick={handleCurrentEvent}
                  >
                    {row._id === currentEvento?._id ? "{...}" : "{ }"}
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" id={row._id} name={row.siniestro} onClick={onSettingDrawerDataToHandle}>
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" id={row._id} name={row.siniestro} onClick={onDeleteEvento}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={handleSubmit(onAddEvento)}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <TextImputControlSmall control={control} name="tituloEvento" label="Evento a agregar" />
          </Grid>
          <Grid item xs={12} md={4} textAlign="right">
            <Button variant="outlined" type="submit">
              Evento +
            </Button>
          </Grid>
        </Grid>
      </form>
      <AdminDrawerEventos
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        resetDrawerDataToHandle={resetDrawerDataToHandle}
        onUpdateEvento={onUpdateEvento}
      />
    </>
  );
}

function SubtiposPanel({ currentEvento, currentSubtipo, handleCurrentSubtipo, resetCurrentSubtipo }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState([]);
  const { control, handleSubmit, resetField } = useForm();
  const { addSubtipoToEvento, deleteSubtipoFromEvento, updateSubtipoFromEvento } = useBranchContext();

  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle([]);
  };
  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();
    setDrawerDataToHandle([
      {
        id: e.currentTarget.id,
        inputName: "subtipo",
        valueToUpdate: e.currentTarget.name,
        label: "Subtipo",
        type: "subtipo",
        method: "update",
        multiline: false,
      },
    ]);
  };

  const onAddSubtipo = (newSubtipo) => {
    addSubtipoToEvento(newSubtipo, currentEvento._id);
    resetField("tituloSubtipo");
  };
  const onDeleteSubtipo = (e) => {
    deleteSubtipoFromEvento(e.currentTarget.id, currentEvento._id);
    resetCurrentSubtipo();
  };
  const onUpdateSubtipo = (updatedSubtipo) => {
    updateSubtipoFromEvento(drawerDataToHandle[0].id, updatedSubtipo.subtipo, currentEvento._id);
  };

  return (
    <Stack spacing={4}>
      {currentEvento.subtipos_Siniestro.length ? (
        <Typography variant="h5"> Subtipos de siniestros Creados para el evento: {currentEvento?.siniestro}</Typography>
      ) : (
        <Typography variant="h5">
          No existen Subtipos para el evento: {currentEvento?.siniestro}, creá uno nuevo aquí
        </Typography>
      )}

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {SUBTIPOS_HEADERS.map((header) => (
                <TableCell key={header.id} align={!header.cabecera ? "right" : "left"}>
                  {header.titulo}
                </TableCell>
              ))}

              <TableCell align="center">Documentacion y Tipificaciones</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEvento.subtipos_Siniestro?.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.descripcion}
                </TableCell>
                <TableCell align="center" id={row._id}>
                  <IconButton
                    size="small"
                    id={row._id}
                    color={row._id === currentSubtipo?._id ? "primary" : undefined}
                    onClick={handleCurrentSubtipo}
                  >
                    {row._id === currentSubtipo?._id ? "{...}" : "{ }"}
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" id={row._id} name={row.descripcion} onClick={onSettingDrawerDataToHandle}>
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" id={row._id} name={row.descripcion} onClick={onDeleteSubtipo}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={handleSubmit(onAddSubtipo)}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <TextImputControlSmall control={control} name="tituloSubtipo" label="Subtipo a agregar" />
          </Grid>
          <Grid item xs={12} md={4} textAlign="right">
            <Button variant="outlined" type="submit">
              subtipo +
            </Button>
          </Grid>
        </Grid>
      </form>
      <Stack>
        {currentSubtipo ? (
          <DocAndTip currentEvento={currentEvento} currentSubtipo={currentSubtipo} />
        ) : (
          <Typography variant="h5"> Por favor selecciona un Subtipo en la tabla superior</Typography>
        )}
      </Stack>
      <AdminDrawerEventos
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        resetDrawerDataToHandle={resetDrawerDataToHandle}
        onUpdateSubtipo={onUpdateSubtipo}
      />
    </Stack>
  );
}

function DocAndTip({ currentEvento, currentSubtipo }) {
  return (
    <Stack spacing={4}>
      <DocumentosPanel
        documentos={currentSubtipo.documentacion}
        currentEventoId={currentEvento._id}
        currentSubtipoId={currentSubtipo._id}
      />
      <TipificacionPanel
        tipificaciones={currentSubtipo.tipificacion}
        currentEventoId={currentEvento._id}
        currentSubtipoId={currentSubtipo._id}
      />
    </Stack>
  );
}

function DocumentosPanel({ documentos, currentEventoId, currentSubtipoId }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState([]);
  const { control, handleSubmit, resetField } = useForm();
  const { addDocumentoToSubtipo, deleteDocumentoFromSubtipo, updateDocumentoFromSubtipo } = useBranchContext();

  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle([]);
  };
  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();
    setDrawerDataToHandle([
      {
        id: e.currentTarget.id,
        inputName: "documento",
        valueToUpdate: e.currentTarget.name,
        label: "Documento",
        type: "documento",
        method: "update",
        multiline: true,
      },
    ]);
  };

  const onAddDocumento = (newDoc) => {
    resetField("documento");
    addDocumentoToSubtipo(newDoc.documento, currentSubtipoId, currentEventoId);
  };
  const onDeleteDocumento = (e) => {
    deleteDocumentoFromSubtipo(e.currentTarget.id, currentSubtipoId, currentEventoId);
  };
  const onUpdateDocumento = (updatedDoc) => {
    updateDocumentoFromSubtipo(drawerDataToHandle[0].id, updatedDoc.documento, currentSubtipoId, currentEventoId);
  };

  return (
    <Stack spacing={4}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {DOCUMENTOS_HEADERS.map((header) => (
                <TableCell key={header.id} align={!header.cabecera ? "right" : "left"}>
                  {header.titulo}
                </TableCell>
              ))}

              <TableCell align="center">Administrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos?.map((row, index) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" wrapped="true">
                  {row.titulo}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" id={row._id} name={row.titulo} onClick={onSettingDrawerDataToHandle}>
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" id={row._id} name={row.titulo} onClick={onDeleteDocumento}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={handleSubmit(onAddDocumento)}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <TextImputControlSmall control={control} name="documento" label="Documento a agregar" />
          </Grid>
          <Grid item xs={12} md={4} textAlign="right">
            <Button variant="outlined" type="submit">
              Documento +
            </Button>
          </Grid>
        </Grid>
      </form>
      <AdminDrawerEventos
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        resetDrawerDataToHandle={resetDrawerDataToHandle}
        onUpdateDocumento={onUpdateDocumento}
      />
    </Stack>
  );
}

function TipificacionPanel({ tipificaciones, currentEventoId, currentSubtipoId }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState([]);
  const { addTipificacionToSubtipo, updateTipificacionFromSubtipo, deleteTipificacionFromSubtipo } = useBranchContext();

  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle([]);
  };
  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();
    if (e.currentTarget.name === "AddTipificacion") {
      setDrawerDataToHandle([
        {
          id: "situacion",
          inputName: "situacion",
          valueToUpdate: null,
          label: "situation",
          type: "tipificacion",
          method: "Add",
          multiline: true,
        },
        {
          id: "core",
          inputName: "core",
          valueToUpdate: null,
          label: "Core",
          type: "tipificacion",
          method: "Add",
          multiline: false,
        },
        {
          id: "accion",
          inputName: "accion",
          valueToUpdate: null,
          label: "Accion",
          type: "tipificacion",
          method: "Add",
          multiline: false,
        },
        {
          id: "resgesdesc",
          inputName: "resgesdesc",
          valueToUpdate: null,
          label: "Resultado de gestion",
          type: "tipificacion",
          method: "Add",
          multiline: false,
        },
        {
          id: "tipgesdesc",
          inputName: "tipgesdesc",
          valueToUpdate: null,
          label: "Tipo de resultado",
          type: "tipificacion",
          method: "Add",
          multiline: false,
        },
      ]);
    } else {
      setDrawerDataToHandle([
        {
          id: "situacion",
          inputName: "situacion",
          valueToUpdate: e.currentTarget.dataset.evento,
          label: "situation",
          type: "tipificacion",
          method: "Update",
          multiline: true,
          tipificacionId: e.currentTarget.id,
        },
        {
          id: "core",
          inputName: "core",
          valueToUpdate: e.currentTarget.dataset.core,
          label: "Core",
          type: "tipificacion",
          method: "Update",
          multiline: false,
          tipificacionId: e.currentTarget.id,
        },
        {
          id: "accion",
          inputName: "accion",
          valueToUpdate: e.currentTarget.dataset.accion,
          label: "Accion",
          type: "tipificacion",
          method: "Update",
          multiline: false,
          tipificacionId: e.currentTarget.id,
        },
        {
          id: "resgesdesc",
          inputName: "resgesdesc",
          valueToUpdate: e.currentTarget.dataset.resgesdesc,
          label: "Resultado de gestion",
          type: "tipificacion",
          method: "Update",
          multiline: false,
          tipificacionId: e.currentTarget.id,
        },
        {
          id: "tipgesdesc",
          inputName: "tipgesdesc",
          valueToUpdate: e.currentTarget.dataset.tipgesdesc,
          label: "Tipo de resultado",
          type: "tipificacion",
          method: "Update",
          multiline: false,
          tipificacionId: e.currentTarget.id,
        },
      ]);
    }
  };

  const onAddTipificacion = (newTipificacion) => {
    addTipificacionToSubtipo(newTipificacion, currentSubtipoId, currentEventoId);
  };

  const onDeleteTipificacion = (tipificacionId) => {
    deleteTipificacionFromSubtipo(tipificacionId, currentSubtipoId, currentEventoId);
  };
  const onUpdateTipificacion = (updatedTipificacion) => {
    updateTipificacionFromSubtipo(
      drawerDataToHandle[0].tipificacionId,
      updatedTipificacion,
      currentSubtipoId,
      currentEventoId
    );
  };

  return (
    <Stack spacing={4}>
      <TipificationTable
        tipificaciones={tipificaciones}
        updateMode={true}
        onDeleteTipificacion={onDeleteTipificacion}
        onSettingDrawerDataToHandle={onSettingDrawerDataToHandle}
      />
      <Grid container>
        <Grid item xs={12} md={12} textAlign="right">
          <Button variant="outlined" name="AddTipificacion" onClick={onSettingDrawerDataToHandle}>
            Tipificacion +
          </Button>
        </Grid>
      </Grid>
      <AdminDrawerEventos
        drawerVisibleMode={drawerVisibleMode}
        onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        drawerDataToHandle={drawerDataToHandle}
        resetDrawerDataToHandle={resetDrawerDataToHandle}
        onUpdateTipificacion={onUpdateTipificacion}
        onAddTipificacion={onAddTipificacion}
      />
    </Stack>
  );
}

function AdminDrawerEventos({
  drawerVisibleMode,
  onToggleDrawerVisibleMode,
  drawerDataToHandle,
  resetDrawerDataToHandle,
  onUpdateEvento,
  onUpdateSubtipo,
  onAddTipificacion,
  onUpdateTipificacion,
  onUpdateDocumento,
}) {
  const { control, handleSubmit, resetField } = useForm();
  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
    resetDrawerDataToHandle([]);
  };

  const onSubmit = (data) => {
    switch (drawerDataToHandle[0].type) {
      case "evento":
        onUpdateEvento(data);
        onToggleDrawerVisibleMode();
        break;
      case "subtipo":
        onUpdateSubtipo(data);
        onToggleDrawerVisibleMode();
        break;
      case "documento":
        onUpdateDocumento(data);
        onToggleDrawerVisibleMode();
        break;
      case "tipificacion":
        if (drawerDataToHandle[0].method === "Add") {
          onAddTipificacion(data);
          resetField(drawerDataToHandle[0].inputName);
          resetField(drawerDataToHandle[1].inputName);
          resetField(drawerDataToHandle[2].inputName);
          resetField(drawerDataToHandle[3].inputName);
          resetField(drawerDataToHandle[4].inputName);
          onToggleDrawerVisibleMode();
        } else {
          onUpdateTipificacion(data);
          onToggleDrawerVisibleMode();
        }

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
              {drawerDataToHandle?.map((data) => (
                <Grid key={data.id} item xs={12}>
                  <TextImputControlSmall
                    control={control}
                    name={data.inputName}
                    label={data.label}
                    defaultValue={data.valueToUpdate}
                    multiline={data.multiline ? true : false}
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
