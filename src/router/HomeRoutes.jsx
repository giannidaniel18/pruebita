import React from "react";
import { Route, Routes } from "react-router-dom";
import SinesterLayout from "../layouts/SinesterLayout";
// import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import SeleccionDeModulo from "../pages/individuos/SeleccionDeModulo";
// import Pymes from "../pages/Pymes";
// import Especialistas from "../pages/Especialistas";
// import Empresas from "../pages/Empresas";
import BranchContainer from "../pages/individuos/siniestros/BranchContainer";
// import AdminLayout from "../layouts/AdminLayout";

// Individuos
// import AdminIndividuos from "../pages/Admin/individuos/AdminIndividuos";
import AbmRamosGeneralContainer from "../pages/Admin/individuos/AbmRamosGeneralContainer";
import AbmRamoSeleccionadoContainer from "../pages/Admin/individuos/AbmRamoSeleccionadoContainer";
import WelcomePage from "../pages/WelcomePage";
// import BuildingPage from "../pages/BuildingPage";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="/abmramos" element={<AbmRamosGeneralContainer />} />
      <Route path="/abmramos/:selectedbranch" element={<AbmRamoSeleccionadoContainer />} />
      <Route path="/abmCotizadores" element={<WelcomePage idWelcome="admin" />} />
      <Route path="/abmconsultas" element={<WelcomePage idWelcome="admin" />} />
      {/* </Route> */}
    </Routes>
  );
}
