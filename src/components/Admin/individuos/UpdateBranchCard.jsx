import { Divider, Stack, Typography } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import React, { useState } from "react";
import UpdateEventosV2 from "./UpdateBranchCard/UpdateEventosV2";
import UpdateEventos from "./UpdateBranchCard/UpdateEventos";
import UpdateTutorias from "./UpdateBranchCard/UpdateTutorias";
import UpdateVerificaciones from "./UpdateBranchCard/UpdateVerificaciones";
import UpdateBranchTabs from "./UpdateBranchTabs";
import DataNotFound from "../../DataNotFound";

export default function UpdateBranchCard({ branch }) {
  const [propiedadAmodificar, setPropiedadAmodificar] = useState(0); //modificar a 0 antes de pasar a DEV

  const tabArray = [
    { id: "AdminVerificaciones", label: "Administrar verificaciones", position: 0 },
    { id: "AdminEventos", label: "Administrar Eventos", position: 1 },
    { id: "AdminTutoria", label: "Administrar tutoria", position: 2 },
  ];
  const handleChangePropiedadAmodificar = (newIndex) => {
    setPropiedadAmodificar(newIndex);
  };

  return !branch ? (
    <DataNotFound />
  ) : (
    <Stack spacing={2}>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography variant="h4">Actualizando el ramo {branch.titulo_Ramo}</Typography>
        <FeedIcon fontSize="large" />
      </Stack>
      <Divider />
      <UpdateBranchTabs
        handleChangePropiedadAmodificar={handleChangePropiedadAmodificar}
        defaultValue={tabArray[0].position} //modificar a 0 antes de pasar a DEV
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
        <UpdateEventosV2 eventos={branch.eventos} />
      ) : (
        <UpdateTutorias />
      )}
    </Stack>
  );
}
