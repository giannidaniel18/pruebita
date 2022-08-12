import React from "react";
import { Route, Routes } from "react-router-dom";
import SinesterLayout2 from "../layouts/SinesterLayout2";
// import Empresas from "../pages/Empresas";
import Home from "../pages/Home";
import Individuos from "../pages/Individuos";
import Pymes from "../pages/Pymes";
import Especialistas from "../pages/Especialistas";
import BranchContainer from "../pages/siniestros/BranchContainer";

import TutoriaHogar from "../components/Tutorias/TutoriaHogar";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/individuos" element={<Individuos />} />
      <Route path="/empresas" element={<TutoriaHogar />} />
      <Route path="/pymes" element={<Pymes />} />
      <Route path="/especialistas" element={<Especialistas />} />
      <Route path="/siniestros" element={<SinesterLayout2 />}>
        <Route
          path="/siniestros/:selectedbranch"
          element={<BranchContainer />}
        />
      </Route>
    </Routes>
  );
}
