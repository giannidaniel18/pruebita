import { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextImputControlSmall from "../../../../components/common/TextImputControlSmall";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useForm } from "react-hook-form";
import DataNotFound from "../../../common/DataNotFound";
import { AdminDrawerUpdate } from "../AdminDrawers";
import ConfirmationAlert from "../../../common/ConfirmationAlert";
import { useManageRamo } from "../../../../hooks/useMangeRamo";

export default function UpdateVerificaciones({ verificaciones, tipoVerificacion, title }) {
  const { control, handleSubmit, resetField } = useForm();
  const { createVerificacion, removeVerificacion, modifyVerificacion } = useManageRamo();

  const arrayVerificaciones =
    tipoVerificacion === "criticas" ? verificaciones?.verificacionesCriticas : verificaciones?.verificacionesExtras;

  const onAddVerificacion = (data) => {
    resetField("titulo_Verificacion_" + tipoVerificacion);
    resetField("descripcion_Verificacion_" + tipoVerificacion);
    // addVerificacionToBranch(data, tipoVerificacion);
    createVerificacion(tipoVerificacion, data, verificaciones.id);
  };

  const onDeleteVerificacion = (verifId) => {
    removeVerificacion(tipoVerificacion, verifId);
  };

  const onUpdateVerificacion = (verifId, updatedVerif) => {
    modifyVerificacion(tipoVerificacion, updatedVerif, verifId, verificaciones.id);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        {arrayVerificaciones?.length ? (
          <>
            <Typography variant="h6">{title}</Typography>
            <TableVerificaciones
              onUpdateVerificacion={onUpdateVerificacion}
              onDeleteVerificacion={onDeleteVerificacion}
              verificaciones={arrayVerificaciones}
              tipoVerificacion={tipoVerificacion}
              dataType={"Verificacion"}
            />
          </>
        ) : (
          <DataNotFound>
            <Stack>
              <Typography px={2} variant="h5">
                No existen tipificaciones del tipo " {tipoVerificacion} " creadas para el ramo actual.
              </Typography>
              <Typography px={2} py={1} variant="h6">
                Crea la primera aqui!
              </Typography>
            </Stack>
          </DataNotFound>
        )}

        <form onSubmit={handleSubmit(onAddVerificacion)}>
          <Typography variant="h6" mb={2}>
            + Verificación {tipoVerificacion}
          </Typography>
          <Grid container alignItems="center" textAlign="end" spacing={2}>
            <Grid item xs={12} md={5}>
              <TextImputControlSmall
                control={control}
                name={"titulo_Verificacion_" + tipoVerificacion}
                label={"Titulo de la verificación " + tipoVerificacion}
                multiline={true}
                multilineRow={3}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextImputControlSmall
                control={control}
                name={"descripcion_Verificacion_" + tipoVerificacion}
                label={"Detalle de la verificación " + tipoVerificacion}
                multiline={true}
                multilineRow={3}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" type="submit">
                Agregar +
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Stack>
  );
}

function TableVerificaciones({
  onUpdateVerificacion,
  onDeleteVerificacion,
  verificaciones,
  tipoVerificacion,
  dataType,
}) {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});
  const [confirmationState, setConfirmationState] = useState({});

  // fragmento utilizado para confirmar la eliminación{start}
  const handleConfirmationToDelete = (e) => {
    setConfirmationState({
      onOpen: true,
      typeConfirm: "Eliminar",
      title: dataType + " " + tipoVerificacion,
      id: e.currentTarget.id,
    });
  };
  const getConfirmation = (confirmation) => {
    if (confirmation) handleDeleteVerificacion(confirmationState.id);
    setConfirmationState({});
  };
  //fragmento utilizado para confirmar la eliminación{end}
  //funciones para manejar la información a actualizar{start}
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
      type: "verificacion",
      method: "update",
      data: [
        {
          inputName: "title_verif",
          label: "Titulo Verificacion",
          multiline: false,
          valueToUpdate: e.currentTarget.getAttribute("title_verif"),
        },
        {
          inputName: "descrip_verif",
          label: "Detalle verificacion",
          multiline: true,
          valueToUpdate: e.currentTarget.getAttribute("descrip_verif"),
        },
      ],
    });
  };
  //funciones para manejar la información a actualizar{end}
  //funciones del context para el crud{start}
  const handleUpdateVerificacion = (updatedVerif) => {
    onUpdateVerificacion(drawerDataToHandle.id, updatedVerif);
  };
  const handleDeleteVerificacion = (verifId) => {
    onDeleteVerificacion(verifId);
    // deleteVerificacionFromBranch(verifId, tipoVerificacion);
  };
  //funciones del context para el crud{end}
  return (
    <Stack>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Titulo verificación</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="right">Administrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verificaciones?.map((row) => (
              <TableRow key={row?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{row?.titulo}</TableCell>
                <TableCell align="left">{row?.descripcion}</TableCell>
                <TableCell align="right" sx={{ minWidth: "115px" }}>
                  <IconButton
                    onClick={onSettingDrawerDataToHandle}
                    id={row?.id}
                    title_verif={row?.titulo}
                    descrip_verif={row?.descripcion}
                  >
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton onClick={handleConfirmationToDelete} id={row?.id}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {confirmationState.onOpen && (
          <ConfirmationAlert
            onOpen={confirmationState.onOpen}
            typeConfirm={confirmationState.typeConfirm}
            title={confirmationState.title}
            desc={confirmationState.desc}
            confirmation={getConfirmation}
          />
        )}
      </TableContainer>
      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={handleUpdateVerificacion}
          dataType={"Verificacion " + tipoVerificacion}
        />
      )}
    </Stack>
  );
}
