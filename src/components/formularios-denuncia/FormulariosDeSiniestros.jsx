import * as React from "react";
import {
  TextField,
  Typography,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export function LineaSiniestradaBasic({ control }) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Linea Siniestrada</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lineaSiniestrada"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                type="number"
                name="lineaSiniestrada"
                label="Linea Siniestrada"
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
export function PolizaBasic({ control }) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Póliza</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nroPoliza"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                type="number"
                name="nroPoliza"
                label="Numero de póliza"
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
export function DatosPersonalesBasic({ control }) {
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
export function DatosPersonalesExtended({ control }) {
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
        <Grid item xs={12} sm={6}>
          <Controller
            name="domicilioTitular"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="domicilioTitular"
                label="Domicilio del titular (calle, altura, depto)"
                helperText="Avenida siempre viva 742  2D"
                fullWidth
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="ciudadDomicilioTitular"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="ciudadDomicilioTitular"
                label="Ciudad"
                helperText="CABA, Avellaneda, Martinez, etc..."
                fullWidth
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Controller
            name="codigoPostal"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                type="number"
                name="codigoPostal"
                label="Codigo postal"
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
export function DescripcionDelHechoBasic({ control }) {
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
export function DescripcionDelHechoExtended({
  control,
  tiposDeSiniestros = ["sin datos", "sin datos"],
}) {
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
              <FormControl fullWidth size="small">
                <InputLabel id="tipoDeSiniestroLabel">
                  Tipo de siniestro
                </InputLabel>
                <Select
                  {...fieldProps}
                  inputRef={ref}
                  labelId="tipoDeSiniestroLabel"
                  id="tipoDeSiniestroSelect"
                  value={value}
                  label="Tipo de siniestro"
                  onChange={onChange}
                >
                  {tiposDeSiniestros.map((tipoSiniestro, index) => (
                    <MenuItem key={index} value={tipoSiniestro}>
                      {tipoSiniestro}
                    </MenuItem>
                  ))}
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
export function FechaHoraLugarSiniestroBasic({ control }) {
  const [hora, setHora] = useState(new Date());
  const [date, setDate] = useState(new Date());

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
              defaultValue={format(date, "dd/MM/yyyy")}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <DatePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="fechaSiniestro"
                  label="dd/mm/yyyy"
                  value={date}
                  size="small"
                  onChange={(value) =>
                    onChange(format(value, "dd/MM/yyyy"), setDate(value))
                  }
                  renderInput={(params) => (
                    <TextField
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
              defaultValue={format(hora, "HH:mm aa")}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <TimePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="horaSiniestro"
                  inputFormat="HH:mm aa"
                  mask="__:__ _M"
                  value={hora}
                  onChange={(value) =>
                    onChange(format(value, "HH:mm aa"), setHora(value))
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
        <Grid item xs={12} sm={6}>
          <Controller
            name="callesEntrecallesBarrio"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="callesEntrecallesBarrio"
                label="Barrio, Calles y entrecalles del hecho"
                helperText="Independencia y Entre Rios / Monserrat"
                fullWidth
                autoComplete="none"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="ciudadOcurrencia"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="ciudadOcurrencia"
                label="Ciudad"
                helperText="CABA, Avellaneda, Martinez, etc..."
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
export function FechaHoraSiniestroBasic({ control }) {
  const [hora, setHora] = useState(new Date());
  const [date, setDate] = useState(new Date());

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
              defaultValue={format(date, "dd/MM/yyyy")}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <DatePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="fechaSiniestro"
                  label="dd/mm/yyyy"
                  value={date}
                  size="small"
                  onChange={(value) =>
                    onChange(format(value, "dd/MM/yyyy"), setDate(value))
                  }
                  renderInput={(params) => (
                    <TextField
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
              defaultValue={format(hora, "HH:mm aa")}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <TimePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="horaSiniestro"
                  inputFormat="HH:mm aa"
                  mask="__:__ _M"
                  value={hora}
                  onChange={(value) =>
                    onChange(format(value, "HH:mm aa"), setHora(value))
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
export function ObservacionesFinalesBasic({ control }) {
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
              <FormControl fullWidth size="small">
                <InputLabel id="siniestroDudosoLabel">
                  ¿ Es un siniestro dudoso ?
                </InputLabel>
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
export function ObservacionesFinalesExtended({ control }) {
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
              <FormControl fullWidth size="small">
                <InputLabel id="siniestroDudosoLabel">
                  ¿ Es un siniestro dudoso ?
                </InputLabel>
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
        <Grid item xs={12} sm={6}>
          <Controller
            name="siniestroMultiple"
            control={control}
            defaultValue={"No"}
            render={({ field: { onChange, ref, value, ...fieldProps } }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="siniestroMultipleLabel">
                  ¿ Es un siniestro Multiple ?
                </InputLabel>
                <Select
                  {...fieldProps}
                  inputRef={ref}
                  labelId="siniestroMultipleLabel"
                  id="siniestroMultipleSelect"
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
export function DatosLaboralesBasic({ control }) {
  const [date, setDate] = useState(new Date());
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Datos laborales</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombreDeLaEmpresa"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="nombreDeLaEmpresa"
                label="Nombre de la empresa"
                fullWidth
                autoComplete="none"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="fechaDesvinculacion"
              control={control}
              defaultValue={format(date, "dd/MM/yyyy")}
              render={({ field: { onChange, ref, value, ...fieldProps } }) => (
                <DatePicker
                  {...fieldProps}
                  inputRef={ref}
                  name="fechaDesvinculacion"
                  label="dd/mm/yyyy"
                  value={date}
                  size="small"
                  onChange={(value) =>
                    onChange(format(value, "dd/MM/yyyy"), setDate(value))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      helperText="Fecha de desvinculacion"
                    /> //textfild
                  )}
                /> //datepicker
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="antiguedad"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="antiguedad"
                label="Antiguedad en la empresa"
                fullWidth
                size="small"
                autoComplete="none"
                helperText="6 años y 2 meses"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="motivoDesvinculacion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                name="motivoDesvinculacion"
                label="Motivo de la desvinculacion"
                fullWidth
                size="small"
                autoComplete="none"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="finalizacionDeObra"
            control={control}
            defaultValue={"No"}
            render={({ field: { onChange, ref, value, ...fieldProps } }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="finalizacionDeObraLabel">
                  ¿ Es por finalización de obra ?
                </InputLabel>
                <Select
                  {...fieldProps}
                  inputRef={ref}
                  labelId="finalizacionDeObraLabel"
                  id="finalizacionDeObraSelect"
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
