import * as React from "react";
import { TextField, Typography, Grid, Container } from "@mui/material";
import { Controller } from "react-hook-form";

export default function DatosPersonalesBasic({ control }) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Datos personales</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombreyapellido"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="nombreyapellido"
                name="nombreyapellido"
                label="Nombre y apellido"
                fullWidth
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="parentesco"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                id="parentesco"
                name="parentesco"
                label="Parentesco"
                fullWidth
                helperText="Titular, Madre, Padre, Hijo, etc..."
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                type="email"
                id="email"
                name="email"
                label="Correo electronico"
                helperText="correo@electronico.com.ar"
                fullWidth
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="telefono"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="telefono"
                name="telefono"
                label="Telefono de contacto"
                fullWidth
                autoComplete="none"
                helperText="+549 11 113454515"
                size="small"
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
