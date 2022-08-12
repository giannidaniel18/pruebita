import * as React from "react";
import { TextField, Typography, Grid, Container } from "@mui/material";
import { Controller } from "react-hook-form";

export default function DescripcionDelHechoBasic({ control }) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Descripción del hecho</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="relatoDelSuceso"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="relatoDelSuceso"
                label="Relato de lo sucedido"
                fullWidth
                multiline
                autoComplete="none"
                size="normal"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="bienesSiniestrados"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="bienesSiniestrados"
                label="Bienes siniestrados"
                fullWidth
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
