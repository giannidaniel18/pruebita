import { Divider, Stack, Typography } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import React, { useState } from "react";
import UpdateEventos from "./UpdateBranchCard/UpdateEventos";
import UpdateTutorias from "./UpdateBranchCard/UpdateTutorias";
import UpdateVerificaciones from "./UpdateBranchCard/UpdateVerificaciones";
import UpdateBranchTabs from "./UpdateBranchTabs";
import DataNotFound from "../../common/DataNotFound";

const TABARRAY = [
  { id: "AdminVerificaciones", label: "Administrar verificaciones", position: 0 },
  { id: "AdminEventos", label: "Administrar Eventos", position: 1 },
  { id: "AdminTutoria", label: "Administrar tutoria", position: 2 },
];

export default function UpdateBranchCard({ branch }) {
  const [propiedadAmodificar, setPropiedadAmodificar] = useState(TABARRAY[0].position); //modificar a 0 antes de pasar a DEV

  const handleChangePropiedadAmodificar = (newIndex) => {
    setPropiedadAmodificar(newIndex);
  };

  return !branch ? (
    <DataNotFound>
      <Stack>
        <Typography px={2} variant="h5">
          Ups! aparentemente ya no existe el ramo que acabas de seleccionar
        </Typography>
      </Stack>
    </DataNotFound>
  ) : (
    <Stack spacing={2}>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography variant="h3">Actualizando el ramo {branch.titulo}</Typography>
        <FeedIcon fontSize="large" />
      </Stack>
      <Divider />
      <UpdateBranchTabs
        handleChangePropiedadAmodificar={handleChangePropiedadAmodificar}
        defaultValue={TABARRAY[0].position} //modificar a 0 antes de pasar a DEV
        tabArray={TABARRAY}
      />

      {propiedadAmodificar === TABARRAY[0].position ? (
        <>
          <UpdateVerificaciones
            verificaciones={branch.verificaciones}
            tipoVerificacion="criticas"
            title="Administrar Verificaciones Criticas"
          />
          <UpdateVerificaciones
            verificaciones={branch.verificaciones}
            tipoVerificacion="extras"
            title="Administrar Verificaciones Extras"
          />
        </>
      ) : propiedadAmodificar === TABARRAY[1].position ? (
        <UpdateEventos eventos={branch.eventos} />
      ) : (
        <UpdateTutorias tutorias={branch.tutorias} />
      )}
    </Stack>
  );
}
