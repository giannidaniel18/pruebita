import { Box, Tabs, Tab } from "@mui/material";
import React from "react";

export default function UpdateBranchTabs({
  handleChangePropiedadAmodificar,
  defaultValue,
}) {
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangePropiedadAmodificar(newValue);
    console.log(event);
  };
  return (
    <Box>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Administrar verificaciones" />
        <Tab label="Administrar Eventos" />
        <Tab label="Administrar tutoria" />
      </Tabs>
    </Box>
  );
}
