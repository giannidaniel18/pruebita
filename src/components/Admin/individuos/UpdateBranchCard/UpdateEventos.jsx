import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBranchContext } from "../../../../context/BranchContext";
import { Button, Divider, Drawer, Grid, Stack, Typography } from "@mui/material";
import TipificationTable from "../../../individuos/siniestros/TipíficationTable";
import TextImputControlSmall from "../../../common/TextImputControlSmall";
import DataNotFound from "../../../common/DataNotFound";
import AdministracionTable from "../../../common/AdministracionTable";
import VisibilityIcon from "@mui/icons-material/Visibility";

const EVENTOS_HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];
const SUBTIPOS_HEADERS = [{ id: "subtipo", titulo: "Subtipos", cabecera: true }];
const DOCUMENTOS_HEADERS = [{ id: "documento", titulo: "Documentos", cabecera: true }];

export default function UpdateEventos({ eventos }) {
  const [currentEvento, setCurrentEvento] = useState(null);
  const [currentSubtipo, setCurrentSubtipo] = useState(null);

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
        <Typography variant="h5">Bienvenido a la administración de eventos </Typography>
      </Stack>
      <Typography variant="subtitle1">
        Para ver la información de cada evento y poder actualizarla pulsa el botón{" "}
        <VisibilityIcon sx={{ verticalAlign: "top" }} /> de cada evento en la columna "Administrar subtipos".
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
          <>
            <SubtiposPanel
              currentEvento={currentEvento}
              handleCurrentSubtipo={handleCurrentSubtipo}
              currentSubtipo={currentSubtipo}
              resetCurrentSubtipo={resetCurrentSubtipo}
            />
          </>
        ) : (
          ""
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
      {!eventos.length ? (
        <DataNotFound>
          <Stack>
            <Typography px={2} variant="h5">
              No existen Eventos creados para el ramo actual.
            </Typography>
            <Typography px={2} py={1} variant="h6">
              Crea el primero aqui!
            </Typography>
          </Stack>
        </DataNotFound>
      ) : (
        <AdministracionTable
          headers={EVENTOS_HEADERS}
          rows={eventos}
          isContainer={true}
          selectedRow={currentEvento}
          handleSelectedRow={handleCurrentEvent}
          updateFunction={onSettingDrawerDataToHandle}
          deleteFunction={onDeleteEvento}
          type="eventos"
        />
      )}

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
      <Divider />
      {!currentEvento.subtipos_Siniestro.length ? (
        <DataNotFound>
          <Stack>
            <Typography px={2} variant="h5">
              No existen Eventos creados para el ramo actual.
            </Typography>
            <Typography px={2} py={1} variant="h6">
              Crea el primero aqui!
            </Typography>
          </Stack>
        </DataNotFound>
      ) : (
        <Stack spacing={2}>
          <Typography variant="subtitle1">
            En esta sección se encuentran los distintos subtipos vinculados a los eventos de la tabla anterior. Para ver
            la tipificacion y documentación de cada subtipo pulsá el botón{" "}
            <VisibilityIcon sx={{ verticalAlign: "top" }} /> de cada subtipo
          </Typography>
          <AdministracionTable
            headers={SUBTIPOS_HEADERS}
            rows={currentEvento.subtipos_Siniestro}
            isContainer={true}
            selectedRow={currentSubtipo}
            handleSelectedRow={handleCurrentSubtipo}
            updateFunction={onSettingDrawerDataToHandle}
            deleteFunction={onDeleteSubtipo}
            type="subtipos"
          />
        </Stack>
      )}

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
      <Divider />
      <>
        {!documentos.length ? (
          <DataNotFound>
            <Stack>
              <Typography px={2} variant="h6">
                Todavía no hay documentos
              </Typography>
              <Typography px={2} variant="h6">
                Crea el primero aquí!
              </Typography>
            </Stack>
          </DataNotFound>
        ) : (
          <AdministracionTable
            headers={DOCUMENTOS_HEADERS}
            rows={documentos}
            updateFunction={onSettingDrawerDataToHandle}
            deleteFunction={onDeleteDocumento}
            type="documentos"
          />
        )}
      </>
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
      <Divider />
      {!tipificaciones.length ? (
        <DataNotFound>
          <Stack>
            <Typography px={2} variant="h6">
              Todavía no hay tipificaciones
            </Typography>
            <Typography px={2} variant="h6">
              crea la primera aqui!
            </Typography>
          </Stack>
        </DataNotFound>
      ) : (
        <TipificationTable
          tipificaciones={tipificaciones}
          updateMode={true}
          onDeleteTipificacion={onDeleteTipificacion}
          onSettingDrawerDataToHandle={onSettingDrawerDataToHandle}
        />
      )}

      <Grid container>
        <Grid item xs={12} md={12} textAlign="right">
          <Button variant="contained" name="AddTipificacion" onClick={onSettingDrawerDataToHandle}>
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
