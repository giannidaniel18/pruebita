import React from "react";

import { Typography, Button, Grid, Divider, Card } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  DescripcionDelHechoBasic,
  DescripcionDelHechoExtended,
  DatosPersonalesBasic,
  FechaHoraSiniestroBasic,
  ObservacionesFinalesBasic,
  DatosPersonalesExtended,
  FechaHoraLugarSiniestroBasic,
  ObservacionesFinalesExtended,
  PolizaBasic,
  DatosLaboralesBasic,
  LineaSiniestradaBasic,
} from "../formularios-denuncia/FormulariosDeSiniestros";

export default function Tutoria({ formularios = ["PolizaBasic"], tituloTutoria = "XXX" }) {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("copied data : ", data);
  };

  const formsMapping = [
    { idform: "PolizaBasic", componente: <PolizaBasic control={control} /> },
    {
      idform: "LineaSiniestradaBasic",
      componente: <LineaSiniestradaBasic control={control} />,
    },
    {
      idform: "DatosPersonalesBasic",
      componente: <DatosPersonalesBasic control={control} />,
    },
    {
      idform: "DatosPersonalesExtended",
      componente: <DatosPersonalesExtended control={control} />,
    },
    {
      idform: "DatosLaboralesBasic",
      componente: <DatosLaboralesBasic control={control} />,
    },
    {
      idform: "FechaHoraSiniestroBasic",
      componente: <FechaHoraSiniestroBasic control={control} />,
    },
    {
      idform: "FechaHoraLugarSiniestroBasic",
      componente: <FechaHoraLugarSiniestroBasic control={control} />,
    },
    {
      idform: "DescripcionDelHechoBasic",
      componente: <DescripcionDelHechoBasic control={control} />,
    },
    {
      idform: "DescripcionDelHechoExtended",
      componente: <DescripcionDelHechoExtended control={control} />,
    },
    {
      idform: "ObservacionesFinalesBasic",
      componente: <ObservacionesFinalesBasic control={control} />,
    },
    {
      idform: "ObservacionesFinalesExtended",
      componente: <ObservacionesFinalesExtended control={control} />,
    },
  ];

  const mapeo = formsMapping.filter((item) => formularios.includes(item.idform));

  const formulariosArenderizar = mapeo.map((form) => (
    <Grid key={form.idform} item xs={12}>
      {form.componente}
    </Grid>
  ));

  return (
    <Card
      sx={{
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Tutoria : {tituloTutoria}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {/* el onchange me crea Data para poder contar los caracteres online y despues en el onSubmit hago el copy to clipboard */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent="right">
          {formulariosArenderizar}
          <Grid item>
            <Button type="submit" variant="text" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
