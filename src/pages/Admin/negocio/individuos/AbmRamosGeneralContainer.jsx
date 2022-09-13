import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TextImputControlSmall from "../../../../components/Admin/individuos/TextImputControlSmall";
import TableAbmRamos from "../../../../components/Admin/individuos/TableAbmRamos";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../../../config/ColorsPalette";
import { useBranchContext } from "../../../../context/BranchContext";

export default function AbmRamosGeneralContainer() {
  const theme = useTheme();
  const { control, handleSubmit, resetField } = useForm();
  const { addBranchToBranches, branches } = useBranchContext();
  const onSubmit = (data) => {
    addBranchToBranches(data.titulo_ramo);
    resetField("titulo_ramo");
  };

  console.log(branches);

  return (
    <Stack spacing={5}>
      <TableAbmRamos branches={branches} />
      <Stack
        spacing={1}
        sx={{
          width: { xs: "310px", sm: "100%" },
          marginTop: { xs: "50px", sm: "10px" },
        }}
      >
        <Typography variant="h6"> Agrega un nuevo ramo</Typography>
        <Paper
          sx={
            theme.palette.mode === "dark"
              ? { backgroundColor: ColorsPalette.bg_dark.light }
              : { backgroundColor: ColorsPalette.bg_light.dark }
          }
        >
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
