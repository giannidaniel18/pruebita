import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TextImputControlSmall from "../../../components/common/TextImputControlSmall";
import TableAbmRamos from "../../../components/Admin/individuos/TableAbmRamos";
import LoaderBasic from "../../../components/common/LoaderBasic";
import SnackBar from "../../../components/common/SnackBar";
import { useRamos } from "../../../hooks/useRamos";

export default function AbmRamosGeneralContainer() {
  const { control, handleSubmit, resetField } = useForm();
  const { branches, loading, createRamo, requestStatus, updateRamo, deleteRamo, updateStatusRamo } = useRamos();

  const onAddRamo = (data) => {
    const newRamo = { titulo: data.titulo_ramo };
    createRamo(newRamo);
    resetField("titulo_ramo");
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
                <Grid container spacing={2} alignItems="center" textAlign="end" p={2}>
                  <Grid item xs={12} sm={7}>
                    <TextImputControlSmall control={control} name="titulo_ramo" label="Nombre del ramo a crear" />
                  </Grid>
                  <Grid item xs={12} sm={5}>
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
      {requestStatus.status && <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} />}
    </Stack>
  );
}
