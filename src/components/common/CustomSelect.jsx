import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export default function CustomSelect({ control, name, defaultValue = "", optionArray }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: true }}
      render={({ field: { onChange, ref, value, ...fieldProps } }) => (
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id="BusinessID">Unidad de negocio</InputLabel>
          <Select
            required
            {...fieldProps}
            inputRef={ref}
            labelId="BusinessID"
            id="BusinessID"
            value={value}
            onChange={onChange}
          >
            {optionArray.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
