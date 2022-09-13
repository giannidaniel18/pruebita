import { Divider, Stack, Typography } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import React, { useState } from "react";
import UpdateEventos from "./UpdateBranchCard/UpdateEventos";
import UpdateTutorias from "./UpdateBranchCard/UpdateTutorias";
import UpdateVerificaciones from "./UpdateBranchCard/UpdateVerificaciones";
import UpdateBranchTabs from "./UpdateBranchTabs";

export default function UpdateBranchCard({ branch }) {
  const [propiedadAmodificar, setPropiedadAmodificar] = useState(1); //modificar a 0 antes de pasar a DEV

  const tabArray = [
    { id: "AdminVerificaciones", label: "Administrar verificaciones", position: 0 },
    { id: "AdminEventos", label: "Administrar Eventos", position: 1 },
    { id: "AdminTutoria", label: "Administrar tutoria", position: 2 },
  ];
  const handleChangePropiedadAmodificar = (newIndex) => {
    setPropiedadAmodificar(newIndex);
  };

  return (
    <Stack spacing={2} maxWidth={"xl"}>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography variant="h4">Actualizando el ramo {branch.titulo_Ramo}</Typography>
        <FeedIcon fontSize="large" />
      </Stack>
      <Divider />
      <UpdateBranchTabs
        handleChangePropiedadAmodificar={handleChangePropiedadAmodificar}
        defaultValue={tabArray[1].position} //modificar a 0 antes de pasar a DEV
        tabArray={tabArray}
      />

      {propiedadAmodificar === tabArray[0].position ? (
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
      ) : propiedadAmodificar === tabArray[1].position ? (
        <UpdateEventos eventos={branch.eventos} />
      ) : (
        <UpdateTutorias />
      )}
    </Stack>
  );
}
