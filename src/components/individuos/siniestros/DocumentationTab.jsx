import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";

export default function DocumentationTab({ eventos, handleChangeEvento }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, [eventos]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangeEvento(event.currentTarget.id);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs variant="scrollable" onChange={handleChange} value={value}>
          {eventos && eventos.map((evento) => <Tab key={evento.id} id={evento.id} label={evento.titulo} />)}
        </Tabs>
      </Box>
    </Box>
  );
}
