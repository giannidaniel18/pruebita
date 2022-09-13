import React from "react";
import { Route, Routes } from "react-router-dom";
import SinesterLayout2 from "../layouts/SinesterLayout2";
// import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Individuos from "../pages/Individuos";
import Pymes from "../pages/Pymes";
import Especialistas from "../pages/Especialistas";
import Empresas from "../pages/Empresas";
import BranchContainer from "../pages/siniestros/BranchContainer";

import AdminLayout from "../layouts/AdminLayout";

// Individuos
import AdminIndividuos from "../pages/Admin/negocio/individuos/AdminIndividuos";
import AbmRamosGeneralContainer from "../pages/Admin/negocio/individuos/AbmRamosGeneralContainer";
import AbmRamoSeleccionadoContainer from "../pages/Admin/negocio/individuos/AbmRamoSeleccionadoContainer";

import AdminEmpresas from "../pages/Admin/negocio/empresas/AdminEmpresas";
import AdminPymes from "../pages/Admin/negocio/pymes/AdminPymes";
import AdminEspecialistas from "../pages/Admin/negocio/especialistas/AdminEspecialistas";
import AdminUsuarios from "../pages/Admin/usuarios/AdminUsuarios";

import WelcomePage from "../pages/WelcomePage";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/individuos" element={<Individuos />} />
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/pymes" element={<Pymes />} />
      <Route path="/especialistas" element={<Especialistas />} />
      <Route path="/siniestros" element={<SinesterLayout2 />}>
        <Route path="" element={<WelcomePage idWelcome="individuosSiniestros" />} />
        <Route path=":selectedbranch" element={<BranchContainer />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<WelcomePage idWelcome="admin" />} />
        <Route path="individuos" element={<AdminIndividuos />} />
        <Route path="empresas" element={<AdminEmpresas />} />
        <Route path="pymes" element={<AdminPymes />} />
        <Route path="especialistas" element={<AdminEspecialistas />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="individuos/abmramos" element={<AbmRamosGeneralContainer />} />
        <Route path="individuos/abmramos/:selectedbranch" element={<AbmRamoSeleccionadoContainer />} />
      </Route>
    </Routes>
  );
}
