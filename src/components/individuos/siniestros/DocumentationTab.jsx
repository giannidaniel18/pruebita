import * as React from "react";
import { Box, Tabs, Tab } from "@mui/material";

export default function SubtipoCard({ eventos, handleChangeEvento }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangeEvento(event.currentTarget.id);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs variant="scrollable" onChange={handleChange} value={value}>
          {eventos && eventos.map((evento) => <Tab key={evento._id} id={evento._id} label={evento.siniestro} />)}
        </Tabs>
      </Box>
    </Box>
  );
}
