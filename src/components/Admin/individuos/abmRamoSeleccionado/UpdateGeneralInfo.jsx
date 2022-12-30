import React from "react";
import { useForm } from "react-hook-form";
import { Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useGeneralInfo } from "hooks/useMangeRamo";
import CustomSelect from "components/common/CustomSelect";
import SnackBar from "components/common/SnackBar";
import { useDrawerHandler } from "hooks/useDrawerHandler";
import { AdminDrawerUpdate } from "../AdminDrawers";
import { ArrayNegocios } from "constants/variablesGlobales";
import SyncIcon from "@mui/icons-material/Sync";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useConfirmation from "hooks/useConfirmation";
import ConfirmationAlert from "components/common/ConfirmationAlert";

export default function UpdateGeneralInfo({ branch }) {
  const { currentBranch, updateRamo, requestStatus, deleteRamo } = useGeneralInfo(branch);
  const { dataToConfirm, handleConfirmation, resetDataToConfirm } = useConfirmation();
  const { control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const {
    drawerDataToHandle,
    drawerVisibleMode,
    onToggleDrawerVisibleMode,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
  } = useDrawerHandler();
  //MODIFICACION DEL RAMO
  const onSetData = (e) => {
    onSettingDrawerDataToHandle({
      id: currentBranch.id,
      type: "ramo",
      method: "update",
      data: [{ inputName: "titulo", label: "titulo", multiline: false, valueToUpdate: currentBranch.titulo }],
    });
  };

  const handleUpdateTitulo = (updatedRamo) => {
    updateRamo("titulo", updatedRamo.titulo);
  };
  const handleUpdateNegocio = (data) => {
    updateRamo("negocio", data.negocio);
  };

  //ELIMINACION DEL RAMO
  const onSetConfirmation = (e) => {
    handleConfirmation({
      onOpen: true,
      typeConfirm: "Eliminar",
      title: "Ramo",
      id: currentBranch.id,
    });
  };
  const getConfirmation = (confirmation) => {
    if (confirmation) handleRemoveRamo(dataToConfirm.id);
    resetDataToConfirm({});
  };
  const handleRemoveRamo = async () => {
    const resp = await deleteRamo();
    const requestStatus = { responseStatus: "success", text: resp.data.message, status: true };
    navigate("/abmramos", { state: requestStatus });
  };

  // Watch es una funcion de RHF que espia el valor del inputName que le pasas en el primer parametro,
  // El segundo valor es un defaultValue porque si no lo tiene en el primer render si empre devuelve undefined

  const currentNegocio = watch("negocio", currentBranch.negocio);

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Typography variant="h5"> Bienvenido a la administracion general del Ramo</Typography>
        <Typography variant="subtitle1">
          en esta seccion podras editar el titulo a mostrar del mismo, asignar su respectiva unidad de negocio,
          habilitarlo o deshabilitarlo segun sea necesario y eliminarlo de la base de datos
        </Typography>
      </Stack>
      <Stack>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "start", md: "center" }} spacing={2}>
          <Typography variant="h4">TITULO : {currentBranch.titulo}</Typography>
          <Button endIcon={<EditIcon />} variant="outlined" onClick={onSetData}>
            Editar Titulo
          </Button>
          <Button endIcon={<DeleteIcon />} onClick={onSetConfirmation} color="error" variant="outlined">
            Eliminar Ramo
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit(handleUpdateNegocio)}>
          <Stack direction={"row"} spacing={2}>
            <Box width={300}>
              <CustomSelect
                control={control}
                name={"negocio"}
                defaultValue={currentBranch.negocio}
                optionArray={ArrayNegocios}
              />
            </Box>
            <Button
              variant="outlined"
              disabled={currentNegocio !== currentBranch.negocio ? false : true}
              endIcon={<SyncIcon />}
              type="submit"
            >
              Actualizar
            </Button>
          </Stack>
          <FormHelperText>Selecciona la unidad de negocio que quieras asignar a este ramo</FormHelperText>
        </form>
      </Stack>

      {drawerVisibleMode && (
        <AdminDrawerUpdate
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
          drawerDataToHandle={drawerDataToHandle}
          resetDrawerDataToHandle={resetDrawerDataToHandle}
          onPersistData={handleUpdateTitulo}
          dataType="Ramo"
        />
      )}
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
      {dataToConfirm.onOpen && <ConfirmationAlert {...dataToConfirm} confirmation={getConfirmation} />}
    </Stack>
  );
}
