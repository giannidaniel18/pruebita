import React from "react";
import { Route, Routes } from "react-router-dom";
import SinesterLayout2 from "../layouts/SinesterLayout2";
// import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Individuos from "../pages/Individuos";
import Pymes from "../pages/Pymes";
import Especialistas from "../pages/Especialistas";
import BranchContainer from "../pages/siniestros/BranchContainer";
import Tutoria from "../components/Tutorias/Tutoria";

import AdminLayout from "../layouts/AdminLayout";
import AdminIndividuos from "../pages/Admin/AdminIndividuos";
import AdminEmpresas from "../pages/Admin/AdminEmpresas";
import AdminPymes from "../pages/Admin/AdminPymes";
import AdminEspecialistas from "../pages/Admin/AdminEspecialistas";
import AdminUsuarios from "../pages/Admin/AdminUsuarios";
import AbmRamosIndividuos from "../pages/Admin/AbmRamosIndividuos";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/individuos" element={<Individuos />} />
      <Route path="/empresas" element={<Tutoria />} />
      <Route path="/pymes" element={<Pymes />} />
      <Route path="/especialistas" element={<Especialistas />} />
      <Route path="/siniestros" element={<SinesterLayout2 />}>
        <Route
          path="/siniestros/:selectedbranch"
          element={<BranchContainer />}
        />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/individuos" element={<AdminIndividuos />} />
        <Route path="/admin/empresas" element={<AdminEmpresas />} />
        <Route path="/admin/pymes" element={<AdminPymes />} />
        <Route path="/admin/especialistas" element={<AdminEspecialistas />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route
          path="/admin/individuos/abmramos"
          element={<AbmRamosIndividuos />}
        />
      </Route>
    </Routes>
  );
}
