import React from "react";
import { Route, Routes } from "react-router-dom";
import SinesterLayout from "../layouts/SinesterLayout";
// import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Individuos from "../pages/individuos/Individuos";
import Pymes from "../pages/Pymes";
import Especialistas from "../pages/Especialistas";
import Empresas from "../pages/Empresas";
import BranchContainer from "../pages/individuos/siniestros/BranchContainer";
import AdminLayout from "../layouts/AdminLayout";

// Individuos
import AdminIndividuos from "../pages/Admin/individuos/AdminIndividuos";
import AbmRamosGeneralContainer from "../pages/Admin/individuos/AbmRamosGeneralContainer";
import AbmRamoSeleccionadoContainer from "../pages/Admin/individuos/AbmRamoSeleccionadoContainer";

import WelcomePage from "../pages/WelcomePage";
import BuildingPage from "../pages/BuildingPage";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/individuos" element={<Individuos />} />
      <Route path="/empresas" element={<BuildingPage />} />
      <Route path="/pymes" element={<BuildingPage />} />
      <Route path="/especialistas" element={<BuildingPage />} />
      <Route path="/siniestros" element={<SinesterLayout />}>
        {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
        <Route path="" element={<WelcomePage idWelcome="individuosSiniestros" />} />
        <Route path=":selectedbranch" element={<BranchContainer />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        {/* para cada nested route genero una ruta vacia para renderizar un componente de bienvenida en el Layout */}
        <Route path="" element={<WelcomePage idWelcome="admin" />} />
        <Route path="individuos" element={<AdminIndividuos />} />
        {/* <Route path="usuarios" element={<AdminUsuarios />} /> */}
        <Route path="individuos/abmramos" element={<AbmRamosGeneralContainer />} />
        <Route path="individuos/abmramos/:selectedbranch" element={<AbmRamoSeleccionadoContainer />} />
      </Route>
    </Routes>
  );
}
