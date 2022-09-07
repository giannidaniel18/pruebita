import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormAbmRamos({ control, name, label }) {
  return (
    <Grid item xs={12} sm={7}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            required
            name={name}
            label={label}
            fullWidth
            autoComplete="none"
            size="small"
          />
        )}
      />
    </Grid>
  );
}
