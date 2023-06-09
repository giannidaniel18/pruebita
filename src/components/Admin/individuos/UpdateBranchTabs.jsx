import { Box, Tabs, Tab } from "@mui/material";
import React from "react";

export default function UpdateBranchTabs({ handleChangePropiedadAmodificar, defaultValue, tabArray }) {
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangePropiedadAmodificar(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        {tabArray.map((tab) => (
          <Tab key={tab.id} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
