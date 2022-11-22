import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBranchContext } from "../../../../context/BranchContext";
import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import TipificationTable from "../../../individuos/siniestros/TipíficationTable";
import TextImputControlSmall from "../../../common/TextImputControlSmall";
import DataNotFound from "../../../common/DataNotFound";
import AdministracionTable from "../../../common/AdministracionTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { AdminDrawerUpdate, AdminDrawerCreate, AdminDrawerMarkDown } from "../AdminDrawers";
import SnackBar from "../../../common/SnackBar";
import { useDocumentacion, useEventos, useSubtipos, useTipificaciones } from "../../../../hooks/useMangeRamo";
import { useDrawerHandler } from "../../../../hooks/useDrawerHandler";
import LoaderBasic from "../../../common/LoaderBasic";

const EVENTOS_HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];
const SUBTIPOS_HEADERS = [{ id: "subtipo", titulo: "Subtipos", cabecera: true }];
const DOCUMENTOS_HEADERS = [{ id: "documento", titulo: "Documentos", cabecera: true }];

export default function UpdateEventos({ idBranch }) {
  const [currentEvento, setCurrentEvento] = useState(null);
  const [currentSubtipo, setCurrentSubtipo] = useState(null);

  const handleCurrentEvent = (evento) => {
    if (evento.id === currentEvento?.id) {
      setCurrentEvento(null);
      setCurrentSubtipo(null);
    } else {
      setCurrentEvento(evento);
      setCurrentSubtipo(null);
    }
  };
  const resetCurrentEvent = () => {
    setCurrentEvento(null);
  };
  const handleCurrentSubtipo = (subtipo) => {
    subtipo.id === currentSubtipo?.id ? setCurrentSubtipo(null) : setCurrentSubtipo(subtipo);
    // setCurrentSubtipo(currentEvento.subtiposSiniestro.find((ev) => ev.id === e.currentTarget.id));
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
        <VisibilityIcon sx={{ verticalAlign: "top" }} /> de cada evento en la columna "Administrar".
      </Typography>

      <Stack spacing={4}>
        <EventosPanel
          idBranch={idBranch}
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

function EventosPanel({ idBranch, handleCurrentEvent, currentEvento, resetCurrentEvent }) {
  const { control, handleSubmit, resetField } = useForm();
  const { eventos, loading, createEvento, modifyEvento, removeEvento, requestStatus } = useEventos(idBranch);
  const {
    drawerDataToHandle,
    drawerVisibleMode,
    onToggleDrawerVisibleMode,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
  } = useDrawerHandler();
  const onSetData = (e) => {
    onSettingDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "evento",
      method: "update",
      data: [{ inputName: "evento", label: "Evento", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
  };
  const onSetCurrentEvento = (e) => {
    const newCurrentEvento = eventos.find((evento) => evento.id === e.currentTarget.id);
    handleCurrentEvent(newCurrentEvento);
  };

  //CRUD
  const onAddEvento = (newEvento) => {
    createEvento(newEvento);
    resetField("tituloEvento");
  };
  const onDeleteEvento = (eventoId) => {
    removeEvento(eventoId);
    resetCurrentEvent();
  };
  const onUpdateEvento = (updatedEvento) => {
    modifyEvento(drawerDataToHandle.id, updatedEvento.evento);
  };
  return (
    <>
      {loading ? (
        <LoaderBasic />
      ) : (
        <AdministracionTable
          headers={EVENTOS_HEADERS}
          rows={eventos}
          isContainer={true}
          selectedRow={currentEvento}
          handleSelectedRow={onSetCurrentEvento}
          updateFunction={onSetData}
          deleteFunction={onDeleteEvento}
          dataType={"Evento"}
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

      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateEvento}
          dataType="Evento"
        />
      )}
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
    </>
  );
}

function SubtiposPanel({ currentEvento, currentSubtipo, handleCurrentSubtipo, resetCurrentSubtipo }) {
  const { control, handleSubmit, resetField } = useForm();
  const { subtipos, loading, createSubtipo, modifySubtipo, modifyPlantillaSubtipo, removeSubtipo, requestStatus } =
    useSubtipos(currentEvento.id);

  const {
    drawerDataToHandle,
    drawerVisibleMode,
    onToggleDrawerVisibleMode,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
  } = useDrawerHandler();

  const onSetCurrentSubtipo = (e) => {
    const newCurrentSubtipo = subtipos.find((subtipo) => subtipo.id === e.currentTarget.id);
    handleCurrentSubtipo(newCurrentSubtipo);
  };

  const onSetData = (e) => {
    onSettingDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "subtipo",
      method: "update",
      data: [{ inputName: "subtipo", label: "Subtipo", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
  };

  const onAddSubtipo = (newSubtipo) => {
    resetField("tituloSubtipo");
    createSubtipo(newSubtipo, currentEvento.id);
    // const result = addSubtipoToEvento(newSubtipo, currentEvento.id);
    // setRequestStatus({ ...result, status: true });
  };
  const onDeleteSubtipo = (subtipoId) => {
    removeSubtipo(subtipoId);
    resetCurrentSubtipo();
  };
  const onUpdateSubtipo = (updatedSubtipo) => {
    modifySubtipo(updatedSubtipo.subtipo, drawerDataToHandle.id, currentEvento.id);
  };
  const onUpdatePlantilla = (updatedPlantilla) => {
    modifyPlantillaSubtipo(updatedPlantilla, currentSubtipo.id, currentEvento.id);
  };

  return (
    <Stack spacing={4}>
      <Divider />
      {loading ? (
        <LoaderBasic />
      ) : (
        <Stack spacing={2}>
          <Typography variant="subtitle1">
            En esta sección se encuentran los distintos subtipos vinculados a los eventos de la tabla anterior. Para ver
            la tipificacion y documentación de cada subtipo pulsá el botón{" "}
            <VisibilityIcon sx={{ verticalAlign: "top" }} /> de cada subtipo
          </Typography>
          <AdministracionTable
            headers={SUBTIPOS_HEADERS}
            rows={subtipos}
            isContainer={true}
            selectedRow={currentSubtipo}
            handleSelectedRow={onSetCurrentSubtipo}
            updateFunction={onSetData}
            deleteFunction={onDeleteSubtipo}
            dataType={"Subtipo"}
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
          <DocAndTip
            currentEvento={currentEvento}
            currentSubtipo={currentSubtipo}
            onUpdatePlantilla={onUpdatePlantilla}
          />
        ) : (
          <Typography variant="h5"> Por favor selecciona un Subtipo en la tabla superior</Typography>
        )}
      </Stack>
      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateSubtipo}
          dataType="Subtipo"
        />
      )}
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
    </Stack>
  );
}
// falta a partir de aca
function DocAndTip({ currentSubtipo, onUpdatePlantilla }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };

  const onUpdateTemplate = (updatedPlantilla) => {
    onUpdatePlantilla(updatedPlantilla);
  };

  return (
    <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 5 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h4">Subtipo {currentSubtipo.titulo}</Typography>
          <Button variant="outlined" startIcon={<EmailIcon />} onClick={onToggleDrawerVisibleMode}>
            Editar plantilla de mail
          </Button>
        </Stack>
        <DocumentosPanel currentSubtipoId={currentSubtipo.id} />
        <TipificacionPanel currentSubtipoId={currentSubtipo.id} />
      </Stack>
      {drawerVisibleMode && (
        <AdminDrawerMarkDown
          plantilla={currentSubtipo.plantilla}
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          updateFn={onUpdateTemplate}
        />
      )}
    </Card>
  );
}

function DocumentosPanel({ currentSubtipoId }) {
  const { control, handleSubmit, resetField } = useForm();
  const {
    drawerDataToHandle,
    drawerVisibleMode,
    onToggleDrawerVisibleMode,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
  } = useDrawerHandler();
  const { documentacion, loading, requestStatus, createDocumentacion, removeDocumentacion, modifyDocumentacion } =
    useDocumentacion(currentSubtipoId);

  const onSetData = (e) => {
    onSettingDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "documento",
      method: "update",
      data: [{ inputName: "documento", label: "Documento", multiline: true, valueToUpdate: e.currentTarget.name }],
    });
  };

  const onAddDocumento = (newDoc) => {
    resetField("documento");
    createDocumentacion(newDoc.documento, currentSubtipoId);
  };
  const onDeleteDocumento = (documentId) => {
    removeDocumentacion(documentId);
  };
  const onUpdateDocumento = (updatedDoc) => {
    modifyDocumentacion(updatedDoc.documento, drawerDataToHandle.id, currentSubtipoId);
  };

  return (
    <Stack spacing={4}>
      <Divider />
      <>
        <Typography variant="h6">ADMINISTRAR DOCUMENTACION A PRESENTAR</Typography>
        {loading ? (
          <LoaderBasic />
        ) : (
          <AdministracionTable
            headers={DOCUMENTOS_HEADERS}
            rows={documentacion}
            updateFunction={onSetData}
            deleteFunction={onDeleteDocumento}
            dataType={"Documento"}
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
      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateDocumento}
          dataType="Documento"
        />
      )}
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
    </Stack>
  );
}

function TipificacionPanel({ currentSubtipoId }) {
  const {
    drawerDataToHandle,
    drawerVisibleMode,
    onToggleDrawerVisibleMode,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
  } = useDrawerHandler();

  const { tipificaciones, createTipificacion, loading, modifyTipificacion, removeTipificacion, requestStatus } =
    useTipificaciones(currentSubtipoId);

  const onSetData = (e) => {
    onToggleDrawerVisibleMode();
    if (e.currentTarget.name === "AddTipificacion") {
      onSettingDrawerDataToHandle({
        id: "",
        type: "tipificacion",
        method: "add",
        data: [
          {
            inputName: "titulo",
            label: "situation",
            multiline: true,
          },
          {
            inputName: "core",
            label: "Core",
            multiline: false,
          },
          {
            inputName: "accion",
            label: "Accion",
            multiline: false,
          },
          {
            inputName: "tipgesdesc",
            label: "Tipo de resultado",
            multiline: false,
          },
          {
            inputName: "resgesdesc",
            label: "Resultado de gestion",
            multiline: false,
          },
        ],
      });
    } else {
      onSettingDrawerDataToHandle({
        id: e.currentTarget.id,
        type: "tipificacion",
        method: "update",
        data: [
          {
            inputName: "titulo",
            valueToUpdate: e.currentTarget.dataset.titulo,
            label: "situation",
            multiline: true,
          },
          {
            inputName: "core",
            valueToUpdate: e.currentTarget.dataset.core,
            label: "Core",
            multiline: false,
          },
          {
            inputName: "accion",
            valueToUpdate: e.currentTarget.dataset.accion,
            label: "Accion",
            multiline: false,
          },
          {
            inputName: "tipgesdesc",
            valueToUpdate: e.currentTarget.dataset.tipgesdesc,
            label: "Tipo de resultado",
            multiline: false,
          },
          {
            inputName: "resgesdesc",
            valueToUpdate: e.currentTarget.dataset.resgesdesc,
            label: "Resultado de gestion",
            multiline: false,
          },
        ],
      });
    }
  };

  const onAddTipificacion = (newTipificacion) => {
    createTipificacion(newTipificacion, currentSubtipoId);
  };
  const onDeleteTipificacion = (tipificacionId) => {
    removeTipificacion(tipificacionId, currentSubtipoId);
  };
  const onUpdateTipificacion = (updatedTipificacion) => {
    modifyTipificacion(drawerDataToHandle.id, updatedTipificacion, currentSubtipoId);
  };

  return (
    <Stack spacing={4}>
      <Divider />
      <Typography variant="h6">ADMINISTRAR TIPIFICACIONES</Typography>
      {loading ? (
        <LoaderBasic />
      ) : (
        <TipificationTable
          tipificaciones={tipificaciones}
          updateMode={true}
          onDeleteTipificacion={onDeleteTipificacion}
          onSettingDrawerDataToHandle={onSetData}
          dataType="Tipificación"
        />
      )}

      <Grid container>
        <Grid item xs={12} md={12} textAlign="right">
          <Button variant="contained" name="AddTipificacion" onClick={onSetData}>
            Tipificación +
          </Button>
        </Grid>
      </Grid>

      {drawerDataToHandle.method === "add" ? (
        <AdminDrawerCreate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onAddTipificacion}
        />
      ) : (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateTipificacion}
          dataType="Tipificación"
        />
      )}
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
    </Stack>
  );
}
