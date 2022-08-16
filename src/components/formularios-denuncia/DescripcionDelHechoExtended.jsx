import React , {useState}  from "react";
import { TextField, Typography, Grid, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

export default function DescripcionDelHechoExtended({ control, tiposDeSiniestros = ["sin datos", "sin datos"] }) {
   
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Descripción del hecho</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="tipoSiniestro"
            control={control}
            defaultValue={tiposDeSiniestros[0]}
            render={({ field: { onChange, ref, value, ...fieldProps } }) => (
              <FormControl fullWidth size="small" >
              <InputLabel id="tipoDeSiniestroLabel">Tipo de siniestro</InputLabel>
              <Select
              {...fieldProps}
              inputRef={ref}
                labelId="tipoDeSiniestroLabel"
                id="tipoDeSiniestroSelect"
                value={value}
                label="Tipo de siniestro"
                onChange={onChange}
              >
                {tiposDeSiniestros.map((tipoSiniestro, index) => (<MenuItem key={index} value={tipoSiniestro}>{tipoSiniestro}</MenuItem>))}
                
              </Select>
            </FormControl>
            )}
          />
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
        <Grid item xs={12} sm={6}>
          <Controller
            name="montoEstipadoPesos"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                type="number"
                name="montoEstipadoPesos"
                label="Monto estimado en $ARS"
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
