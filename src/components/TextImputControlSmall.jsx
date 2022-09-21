import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function TextImputControlSmall({ control, name, label, multiline = false, defaultValue, multilineRow }) {
  const [defaultInputValue, setDefaultInputValue] = useState(defaultValue);

  return (
    <Grid item>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultInputValue : ""}
        rules={{ required: true }}
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <TextField
            {...fieldProps}
            required
            multiline={multiline}
            rows={multiline ? (multilineRow ? multilineRow : 5) : undefined}
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
