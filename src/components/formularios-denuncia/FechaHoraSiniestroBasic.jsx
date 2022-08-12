import * as React from "react";
import { TextField, Typography, Grid, Container } from "@mui/material";
import { Controller } from "react-hook-form";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { TimePicker } from "@mui/x-date-pickers";

export default function FechaHoraSiniestroBasic({ control }) {
  const [date, setDate] = React.useState(new Date());
  const defaultDate = format(date, "dd/MM/yyyy");

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Fecha y hora de ocurrencia</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="fechaSiniestro"
              control={control}
              defaultValue={defaultDate}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <DatePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="fechaSiniestro"
                  label="dd/mm/yyyy"
                  value={value}
                  size="small"
                  onChange={(value) => onChange(format(value, "dd/MM/yyyy"))}
                  renderInput={(params) => (
                    <TextField
                      value={value}
                      {...params}
                      fullWidth
                      size="small"
                      helperText="Fecha del hecho"
                    /> //textfild
                  )}
                /> //datepicker
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="horaSiniestro"
              control={control}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <TimePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="horaSiniestro"
                  inputFormat="HH:mm aa"
                  mask="__:__ _M"
                  value={date}
                  onChange={(value) =>
                    onChange(format(value, "HH:mm aa"), setDate(value))
                  }
                  renderInput={(params) => (
                    <TextField
                      value={value}
                      {...params}
                      fullWidth
                      size="small"
                      helperText="Hora aproximada del hecho"
                    /> //textfild
                  )}
                /> //datepicker
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Container>
  );
}
