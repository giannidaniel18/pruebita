import { Stack, Typography } from "@mui/material";
import React from "react";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";

export default function BuildingPage() {
  return (
    <Stack height={"80vh"} direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h1" alignContent={"center"}>
        <Stack direction="row" alignItems={"center"}>
          Estamos construyendo esta pagina <RoomPreferencesIcon fontSize="50" />
        </Stack>
      </Typography>
    </Stack>
  );
}
