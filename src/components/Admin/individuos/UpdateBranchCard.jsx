import { Stack } from "@mui/material";

import React from "react";
import UpdateEventos from "./UpdateBranchCard/UpdateEventos";
import UpdateTutorias from "./UpdateBranchCard/UpdateTutorias";
import UpdateVerificaciones from "./UpdateBranchCard/UpdateVerificaciones";

export default function UpdateBranchCard({ branch }) {
  return (
    <Stack>
      <UpdateVerificaciones verificaciones={branch.verificaciones} />
      <UpdateEventos />
      <UpdateTutorias />
    </Stack>
  );
}
