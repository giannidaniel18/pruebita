import React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../config/ColorsPalette";
import { Typography, Button, Grid, Divider } from "@mui/material";

import { useForm } from "react-hook-form";

import DescripcionDelHechoBasic from "../formularios-denuncia/DescripcionDelHechoBasic";
import DescripcionDelHechoExtended from "../formularios-denuncia/DescripcionDelHechoExtended";
import DatosPersonalesBasic from "../formularios-denuncia/DatosPersonalesBasic";
import FechaHoraSiniestroBasic from "../formularios-denuncia/FechaHoraSiniestroBasic";
import ObservacionesFinalesBasic from "../formularios-denuncia/ObservacionesFinalesBasic";

export default function TutoriaHogar({tutoria}) {

  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const theme = useTheme();


  // falta ponerle una key a cada componenete porque es como un map cuando se renderiza el array
  const allForms=[ <Grid container spacing={2}>
    <Grid item xs={12}>
      <DatosPersonalesBasic control={control} />
    </Grid>
    <Grid item xs={12}>
      <FechaHoraSiniestroBasic control={control} />
    </Grid>
    <Grid item xs={12}>
      <DescripcionDelHechoBasic control={control} />
    </Grid>
    <Grid item xs={12}>
      <DescripcionDelHechoExtended  control={control} />
    </Grid>
    <Grid item xs={12}>
      <ObservacionesFinalesBasic  control={control} />
    </Grid>

    <Grid item>
      <Button type="submit" variant="text" color="primary">
        Submit
      </Button>
    </Grid>
  </Grid>]



  return (
    <Container
      maxWidth="lg"
      sx={{
        borderRadius: 2,
        padding: 2,
        backgroundColor:
          theme.palette.mode === "dark"
            ? ColorsPalette.bg_dark.light
            : ColorsPalette.bg_light.dark,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Tutoria Hogar
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {allForms}
      </form>
    </Container>
  );
}
