import React  from "react";
import { TextField, Typography, Grid, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

export default function ObservacionesFinalesBasic({ control, tiposDeSiniestros = ["sin datos", "sin datos"] }) {
   
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Descripción del hecho</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="observaciones"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="observaciones"
                label="Observaciones del siniestro"
                fullWidth
                multiline
                autoComplete="none"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="siniestroDudoso"
            control={control}
            defaultValue={"No"}
            render={({ field: { onChange, ref, value, ...fieldProps } }) => (
              <FormControl fullWidth size="small" >
              <InputLabel id="siniestroDudosoLabel">¿ Es un siniestro dudoso ?</InputLabel>
              <Select
              {...fieldProps}
              inputRef={ref}
                labelId="siniestroDudosoLabel"
                id="siniestroDudosoSelect"
                value={value}
                onChange={onChange}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Si">Si</MenuItem>
                
              </Select>
            </FormControl>
            )}
          />
        </Grid>
        
      </Grid>
    </Container>
  );
}
