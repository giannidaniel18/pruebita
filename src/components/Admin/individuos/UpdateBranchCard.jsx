import { Divider, Stack, Typography } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import React, { useState } from "react";
import UpdateEventos from "./UpdateBranchCard/UpdateEventos";
import UpdateTutorias from "./UpdateBranchCard/UpdateTutorias";
import UpdateVerificaciones from "./UpdateBranchCard/UpdateVerificaciones";
import UpdateBranchTabs from "./UpdateBranchTabs";

export default function UpdateBranchCard({ branch }) {
  const [propiedadAmodificar, setPropiedadAmodificar] = useState(0);
  const propiedades = {
    actualizarVerificaciones: 0,
    actualizarEventos: 1,
    actualizarTutoria: 2,
  };

  const handleChangePropiedadAmodificar = (newIndex) => {
    setPropiedadAmodificar(newIndex);
  };

  return (
    <Stack spacing={2} maxWidth={"xl"}>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography variant="h4">
          Actualizando el ramo {branch.titulo_Ramo}
        </Typography>
        <FeedIcon fontSize="large" />
      </Stack>
      <Divider />

      <UpdateBranchTabs
        handleChangePropiedadAmodificar={handleChangePropiedadAmodificar}
        defaultValue={propiedades.actualizarVerificaciones}
      />

      {propiedadAmodificar === propiedades.actualizarVerificaciones ? (
        <>
          <UpdateVerificaciones
            verificaciones={branch.verificaciones}
            tipoVerificacion="Critica"
            title="Administrar Verificaciones Criticas"
          />
          <UpdateVerificaciones
            verificaciones={branch.verificaciones}
            tipoVerificacion="Extra"
            title="Administrar Verificaciones Extras"
          />
        </>
      ) : propiedadAmodificar === propiedades.actualizarEventos ? (
        <UpdateEventos />
      ) : (
        <UpdateTutorias />
      )}
    </Stack>
  );
}
