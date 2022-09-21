import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TextImputControlSmall from "../../../components/TextImputControlSmall";
import TableAbmRamos from "../../../components/Admin/individuos/TableAbmRamos";
import { useForm } from "react-hook-form";

import { useBranchContext } from "../../../context/BranchContext";

export default function AbmRamosGeneralContainer() {
  const { control, handleSubmit, resetField } = useForm();
  const { addBranchToBranches, branches } = useBranchContext();
  const onSubmit = (data) => {
    addBranchToBranches(data.titulo_ramo);
    resetField("titulo_ramo");
  };

  return (
    <Stack spacing={4}>
      <TableAbmRamos branches={branches} />
      <Stack spacing={1}>
        <Typography variant="h6"> Agrega un nuevo ramo</Typography>
        <Paper>
          <form onSubmit={handleSubmit(onSubmit)}>
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
    </Stack>
  );
}
