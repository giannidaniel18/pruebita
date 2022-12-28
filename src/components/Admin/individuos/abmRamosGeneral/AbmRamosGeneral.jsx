import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRamos } from "hooks/useRamos";
import { ArrayNegocios } from "constants/variablesGlobales";

import CustomSelect from "components/common/CustomSelect";
import LoaderBasic from "components/common/LoaderBasic";
import SnackBar from "components/common/SnackBar";
import TextImputControlSmall from "components/common/TextImputControlSmall";
import TableAbmRamos from "./TableAbmRamos";
import { useLocation } from "react-router-dom";

export default function AbmRamosGeneral() {
  const { control, handleSubmit, resetField } = useForm();
  const { branches, loading, createRamo, requestStatus, updateRamo, deleteRamo, updateStatusRamo } = useRamos();

  const { state } = useLocation();

  const onAddRamo = (data) => {
    const newRamo = { titulo: data.titulo_ramo, negocio: data.negocio };
    createRamo(newRamo);
    resetField("titulo_ramo");
    resetField("negocio");
  };
  const onUpdateRamo = (idBranch, updatedBranch) => {
    updateRamo(idBranch, updatedBranch);
  };
  const onUpdateRamoStatus = (branchId, newState) => {
    const enpdointResponse = updateStatusRamo(branchId, newState);
    return enpdointResponse;
  };
  const onDeleteRamo = (idBranch) => {
    deleteRamo(idBranch);
  };

  return (
    <Stack spacing={4}>
      {loading ? (
        <LoaderBasic />
      ) : (
        <>
          <TableAbmRamos
            branches={branches}
            onUpdateRamo={onUpdateRamo}
            onUpdateRamoStatus={onUpdateRamoStatus}
            onDeleteRamo={onDeleteRamo}
            requestStatus={requestStatus}
          />
          <Stack spacing={1}>
            <Typography variant="h6"> Agrega un nuevo ramo</Typography>
            <Paper>
              <form onSubmit={handleSubmit(onAddRamo)}>
                <Grid container spacing={2} alignItems="center" p={2}>
                  <Grid item xs={12} sm={6}>
                    <TextImputControlSmall control={control} name="titulo_ramo" label="Nombre del ramo a crear" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomSelect control={control} name="negocio" optionArray={ArrayNegocios} />
                  </Grid>
                  <Grid item xs={12} sm={3} textAlign="end">
                    <Button variant="outlined" type="submit">
                      Agregar +
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Stack>
        </>
      )}
      {requestStatus?.status && <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} />}
      {state?.status && <SnackBar title={state.text} severity={state.responseStatus} />}
    </Stack>
  );
}
