import React from "react";
import { Route, Routes } from "react-router-dom";
import SinesterLayout from "layouts/SinesterLayout";
import Home from "pages/Home";
import SeleccionDeModulo from "pages/SeleccionDeModulo";
import BranchContainer from "pages/siniestros/BranchContainer";
import AbmRamosGeneralContainer from "pages/Admin/ramos/AbmRamosGeneralContainer";
import AbmRamoSeleccionadoContainer from "pages/Admin/ramos/AbmRamoSeleccionadoContainer";
import WelcomePage from "pages/WelcomePage";
import LoginPage from "pages/LoginPage";
import { useUserContext } from "context/UserContext";
import DataNotFound from "components/common/DataNotFound";
import { Typography } from "@mui/material";
import { PERMISO_ADMINISTRADOR } from "constants/variablesGlobales";

export default function HomeRoutes() {
  const { currentUser } = useUserContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/individuos" element={<SeleccionDeModulo negocio={"individuos"} />} />
      <Route path="/individuos/siniestros" element={<SinesterLayout negocio="individuos" />}>
        {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
        <Route path="" element={<WelcomePage idWelcome="siniestros" />} />
        <Route path=":selectedbranch" element={<BranchContainer />} />
      </Route>
      <Route path="/empresas" element={<SeleccionDeModulo negocio={"empresas"} />} />
      <Route path="/empresas/siniestros" element={<SinesterLayout negocio="empresas" />}>
        {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
        <Route path="" element={<WelcomePage idWelcome="siniestros" />} />
        <Route path=":selectedbranch" element={<BranchContainer />} />
      </Route>
      <Route path="/pymes" element={<SeleccionDeModulo negocio={"pymes"} />} />
      <Route path="/pymes/siniestros" element={<SinesterLayout negocio="pymes" />}>
        {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
        <Route path="" element={<WelcomePage idWelcome="siniestros" />} />
        <Route path=":selectedbranch" element={<BranchContainer />} />
      </Route>
      <Route path="/especialistas" element={<SeleccionDeModulo negocio={"especialistas"} />} />
      <Route path="/especialistas/siniestros" element={<SinesterLayout negocio="especialistas" />}>
        {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
        <Route path="" element={<WelcomePage idWelcome="siniestros" />} />
        <Route path=":selectedbranch" element={<BranchContainer />} />
      </Route>

      {/* <Route path="/admin" element={<AdminLayout />}> */}
      {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
      {/* <Route path="" element={<WelcomePage idWelcome="admin" />} /> */}
      {/* <Route path="individuos" element={<AdminIndividuos />} /> */}
      {/* <Route path="usuarios" element={<AdminUsuarios />} /> */}
      <Route
        path="/abmramos"
        element={
          currentUser.group === PERMISO_ADMINISTRADOR ? (
            <AbmRamosGeneralContainer />
          ) : (
            <DataNotFound>
              <Typography variant="h5">No tienes permisos suficientes para acceder a esta sección</Typography>{" "}
            </DataNotFound>
          )
        }
      />
      <Route
        path="/abmramos/:selectedbranch"
        element={
          currentUser.group === PERMISO_ADMINISTRADOR ? (
            <AbmRamoSeleccionadoContainer />
          ) : (
            <DataNotFound>
              <Typography variant="h5">No tienes permisos suficientes para acceder a esta sección</Typography>{" "}
            </DataNotFound>
          )
        }
      />
      <Route
        path="/abmCotizadores"
        element={
          currentUser.group === PERMISO_ADMINISTRADOR ? (
            <WelcomePage idWelcome="admin" />
          ) : (
            <DataNotFound>
              <Typography variant="h5">No tienes permisos suficientes para acceder a esta sección</Typography>{" "}
            </DataNotFound>
          )
        }
      />
      <Route
        path="/abmconsultas"
        element={
          currentUser.group === PERMISO_ADMINISTRADOR ? (
            <WelcomePage idWelcome="admin" />
          ) : (
            <DataNotFound>
              <Typography variant="h5">No tienes permisos suficientes para acceder a esta sección</Typography>{" "}
            </DataNotFound>
          )
        }
      />
      {/* </Route> */}
    </Routes>
  );
}
