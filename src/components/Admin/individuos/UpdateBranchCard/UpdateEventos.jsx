import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBranchContext } from "../../../../context/BranchContext";
import { Button, Card, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import TipificationTable from "../../../individuos/siniestros/TipíficationTable";
import TextImputControlSmall from "../../../common/TextImputControlSmall";
import DataNotFound from "../../../common/DataNotFound";
import AdministracionTable from "../../../common/AdministracionTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { AdminDrawerUpdate, AdminDrawerCreate, AdminDrawerPlantilla } from "../AdminDrawers";

const EVENTOS_HEADERS = [{ id: "event", titulo: "Eventos", cabecera: true }];
const SUBTIPOS_HEADERS = [{ id: "subtipo", titulo: "Subtipos", cabecera: true }];
const DOCUMENTOS_HEADERS = [{ id: "documento", titulo: "Documentos", cabecera: true }];

export default function UpdateEventos({ eventos }) {
  const [currentEvento, setCurrentEvento] = useState(null);
  const [currentSubtipo, setCurrentSubtipo] = useState(null);

  const handleCurrentEvent = (e) => {
    if (e.currentTarget.id === currentEvento?.id) {
      setCurrentEvento(null);
      setCurrentSubtipo(null);
    } else {
      setCurrentEvento(eventos.find((ev) => ev.id === e.currentTarget.id));
      setCurrentSubtipo(null);
    }
  };
  const resetCurrentEvent = () => {
    setCurrentEvento(null);
  };
  const handleCurrentSubtipo = (e) => {
    e.currentTarget.id === currentSubtipo?.id
      ? setCurrentSubtipo(null)
      : setCurrentSubtipo(currentEvento.subtiposSiniestro.find((ev) => ev.id === e.currentTarget.id));
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
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
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

    setDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "evento",
      method: "update",
      data: [{ inputName: "evento", label: "Evento", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
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
    updateEventoFromBranch(drawerDataToHandle.id, updatedEvento.evento);
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
        />
      )}
    </>
  );
}

function SubtiposPanel({ currentEvento, currentSubtipo, handleCurrentSubtipo, resetCurrentSubtipo }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
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

    setDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "subtipo",
      method: "update",
      data: [{ inputName: "subtipo", label: "Subtipo", multiline: false, valueToUpdate: e.currentTarget.name }],
    });
  };

  const onAddSubtipo = (newSubtipo) => {
    addSubtipoToEvento(newSubtipo, currentEvento.id);
    resetField("tituloSubtipo");
  };
  const onDeleteSubtipo = (e) => {
    deleteSubtipoFromEvento(e.currentTarget.id, currentEvento.id);
    resetCurrentSubtipo();
  };
  const onUpdateSubtipo = (updatedSubtipo) => {
    updateSubtipoFromEvento(drawerDataToHandle.id, updatedSubtipo.subtipo, currentEvento.id);
  };

  return (
    <Stack spacing={4}>
      <Divider />
      {!currentEvento.subtiposSiniestro.length ? (
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
            rows={currentEvento.subtiposSiniestro}
            isContainer={true}
            selectedRow={currentSubtipo}
            handleSelectedRow={handleCurrentSubtipo}
            updateFunction={onSettingDrawerDataToHandle}
            deleteFunction={onDeleteSubtipo}
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
      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateSubtipo}
        />
      )}
    </Stack>
  );
}

function DocAndTip({ currentEvento, currentSubtipo }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);

  const rawContent = {
    blocks: [
      {
        key: "1ft1a",
        text: 'This is an "immutable" entity: Superman. Deleting any characters will delete the entire entity. Adding characters will remove the entity from the range.',
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 152,
            style: "ITALIC",
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: "4mph4",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "6naic",
        text: 'This is a "mutable" entity: Batman. Characters may be added  and removed.',
        type: "header-one",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "658ic",
        text: "Hola xxx (indicar nombre del cliente)",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "162lh",
        text: "lo que ocurrió en tu Hogar ",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "84bd3",
        text: "poder iniciar el análisis de tu siniestro y gestionarlo lo más rápido posible, necesitamos contar con\ntoda la info de lo que te pasó.",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "8vk2k",
        text: "Por eso te pedimos que completes todas las secciones del formulario que\npodes descargar desde el siguiente link:",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "9d48",
        text: 'This is a "segmented" entity: Green Lantern. Deleting any characters will delete the current "segment" from the range. Adding characters will remove the entire entity from the range.',
        type: "header-two",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
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
        <DocumentosPanel
          documentos={currentSubtipo.documentacion}
          currentEventoId={currentEvento.id}
          currentSubtipoId={currentSubtipo.id}
        />
        <TipificacionPanel
          tipificaciones={currentSubtipo.tipificacion}
          currentEventoId={currentEvento.id}
          currentSubtipoId={currentSubtipo.id}
        />
      </Stack>
      {drawerVisibleMode && (
        <AdminDrawerPlantilla
          rawContent={rawContent ? rawContent : null}
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        />
      )}
    </Card>
  );
}

function DocumentosPanel({ documentos, currentEventoId, currentSubtipoId }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
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
    setDrawerDataToHandle({
      id: e.currentTarget.id,
      type: "documento",
      method: "update",
      data: [{ inputName: "documento", label: "Documento", multiline: true, valueToUpdate: e.currentTarget.name }],
    });
  };

  const onAddDocumento = (newDoc) => {
    resetField("documento");
    addDocumentoToSubtipo(newDoc.documento, currentSubtipoId, currentEventoId);
  };
  const onDeleteDocumento = (e) => {
    deleteDocumentoFromSubtipo(e.currentTarget.id, currentSubtipoId, currentEventoId);
  };
  const onUpdateDocumento = (updatedDoc) => {
    updateDocumentoFromSubtipo(drawerDataToHandle.id, updatedDoc.documento, currentSubtipoId, currentEventoId);
  };

  return (
    <Stack spacing={4}>
      <Divider />
      <>
        <Typography variant="h6">ADMINISTRAR DOCUMENTACION A PRESENTAR</Typography>
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
      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={onUpdateDocumento}
        />
      )}
    </Stack>
  );
}

function TipificacionPanel({ tipificaciones, currentEventoId, currentSubtipoId }) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
  const { addTipificacionToSubtipo, updateTipificacionFromSubtipo, deleteTipificacionFromSubtipo } = useBranchContext();

  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle({});
  };
  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const onSettingDrawerDataToHandle = (e) => {
    onToggleDrawerVisibleMode();
    if (e.currentTarget.name === "AddTipificacion") {
      setDrawerDataToHandle({
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
      setDrawerDataToHandle({
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
    addTipificacionToSubtipo(newTipificacion, currentSubtipoId, currentEventoId);
  };

  const onDeleteTipificacion = (tipificacionId) => {
    deleteTipificacionFromSubtipo(tipificacionId, currentSubtipoId, currentEventoId);
  };
  const onUpdateTipificacion = (updatedTipificacion) => {
    updateTipificacionFromSubtipo(drawerDataToHandle.id, updatedTipificacion, currentSubtipoId, currentEventoId);
  };

  return (
    <Stack spacing={4}>
      <Divider />
      <Typography variant="h6">ADMINISTRAR TIPIFICACIONES</Typography>
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
        />
      )}
    </Stack>
  );
}
