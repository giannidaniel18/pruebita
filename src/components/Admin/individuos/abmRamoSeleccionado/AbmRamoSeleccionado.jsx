import { Divider, Stack, Typography } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import React, { useState } from "react";
// import DataNotFound from "../../../common/DataNotFound";
import UpdateEventos from "./UpdateEventos";
import UpdateTutorias from "./UpdateTutorias";
import UpdateVerificaciones from "./UpdateVerificaciones";
import UpdateBranchTabs from "../UpdateBranchTabs";
import UpdateGeneralInfo from "./UpdateGeneralInfo";
// import { useNavigate } from "react-router-dom";

const TABARRAY = [
  { id: "AdminGral", label: "Administración general", position: 0 },
  { id: "AdminVerificaciones", label: "Administrar verificaciones", position: 1 },
  { id: "AdminEventos", label: "Administrar Eventos", position: 2 },
  { id: "AdminTutoria", label: "Administrar tutoria", position: 3 },
];

export default function AbmRamoSeleccionado({ branch }) {
  const [propiedadAmodificar, setPropiedadAmodificar] = useState(TABARRAY[0].position); //modificar a 0 antes de pasar a DEV
  const handleChangePropiedadAmodificar = (newIndex) => {
    setPropiedadAmodificar(newIndex);
  };

  return (
    <Stack spacing={2}>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography variant="h4">Administrando el ramo {branch.titulo}</Typography>
        <FeedIcon fontSize="large" />
      </Stack>
      <Divider />
      <UpdateBranchTabs
        handleChangePropiedadAmodificar={handleChangePropiedadAmodificar}
        defaultValue={TABARRAY[0].position} //modificar a 0 antes de pasar a DEV
        tabArray={TABARRAY}
      />

      {propiedadAmodificar === TABARRAY[0].position && <UpdateGeneralInfo branch={branch} />}
      {propiedadAmodificar === TABARRAY[1].position && (
        <>
          <UpdateVerificaciones
            idBranch={branch.id}
            tipoVerificacion="criticas"
            title="Administrar Verificaciones Criticas"
          />
          <UpdateVerificaciones
            idBranch={branch.id}
            tipoVerificacion="extras"
            title="Administrar Verificaciones Extras"
          />
        </>
      )}
      {propiedadAmodificar === TABARRAY[2].position && <UpdateEventos idBranch={branch.id} />}
      {propiedadAmodificar === TABARRAY[3].position && <UpdateTutorias idBranch={branch.id} />}

      {/* 
      {propiedadAmodificar === TABARRAY[0].position ? (
        <>
          <UpdateVerificaciones
            idBranch={branch.id}
            tipoVerificacion="criticas"
            title="Administrar Verificaciones Criticas"
          />
          <UpdateVerificaciones
            idBranch={branch.id}
            tipoVerificacion="extras"
            title="Administrar Verificaciones Extras"
          />
        </>
      ) : propiedadAmodificar === TABARRAY[1].position ? (
        <UpdateEventos idBranch={branch.id} />
      ) : (
        <UpdateTutorias idBranch={branch.id} />
      )} */}
    </Stack>
  );
}
