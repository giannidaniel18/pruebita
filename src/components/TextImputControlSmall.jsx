import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function TextImputControlSmall({ control, name, label, multiline = false, defaultValue }) {
  const [defaultInputValue, setDefaultInputValue] = useState(defaultValue);

  return (
    <Grid item>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultInputValue : ""}
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <TextField
            {...fieldProps}
            required
            multiline={multiline}
            name={name}
            label={label}
            value={defaultValue ? defaultInputValue : value}
            onChange={defaultValue ? (value) => onChange(value, setDefaultInputValue(value.target.value)) : onChange}
            fullWidth
            autoComplete="none"
            size="small"
          />
        )}
      />
    </Grid>
  );
}
