import { createContext, useContext, useState } from "react";
import { branch } from "../data";
import {
  defaultBranch,
  defaultVerificacion_Critica,
  defaultVerificacion_Extra,
  defaultEvento,
} from "../constants/variablesGlobales";

const BranchContext = createContext(null);
export const useBranchContext = () => useContext(BranchContext);

const BranchContextProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(null);
  const [branches, setBranches] = useState(branch);

  const setUpCurrentBranch = (id) => {
    const newbranch = branches.find((ramo) => ramo._id === id);
    setCurrentBranch(newbranch);
  };
  // cada vez que tengo que updatear currentBranch tengo que updatear branches porque sino el setCurrentBranch va a buscar en branches desactualizado
  //Este metodo solamente se utiliza para updatear branches a nivel general, cuando este la BBDD solo se actualizara el ramo en cuestion
  const updateBranchesData = (newBranch) => {
    const newBranches = [...branches];
    const index = branches.findIndex((ramo) => ramo._id === newBranch.branch_id);
    newBranches[index] = newBranch;
    setBranches(newBranches);
  };
  // Este metodo setea el estado de el branch seleccionado
  const updateStatusBranch = (branch_id, status) => {
    const newBranch = branches.find((ramo) => ramo._id === branch_id); //en newBranch guardo el ramo encontrado con el id clickeado
    newBranch.estado = status; //le cambio la propiedad estado
    updateBranchesData(newBranch);
  };
  //con este metodo agrego un branch a branches
  const addBranchToBranches = (titulo_branch) => {
    const newBranch = { ...defaultBranch };
    newBranch.titulo_Ramo = titulo_branch;
    newBranch._id = new Date().valueOf().toString();
    setBranches([...branches, newBranch]);
  };
  //Este metodo agrega una verificacion Critica o Extra al branch seleccionado segun el tipoverificacion que le llega desde UpdateVerificaciones.jsx
  const addVerificacionToBranch = (verificacion, tipoVerificacion) => {
    const newBranch = currentBranch;
    if (tipoVerificacion === "Critica") {
      const newVerificacionesCriticas = { ...defaultVerificacion_Critica };
      newVerificacionesCriticas.titulo = verificacion.titulo_Verificacion_Critica;
      newVerificacionesCriticas.descripcion = verificacion.descripcion_Verificacion_Critica;
      newBranch.verificaciones.verificaciones_Criticas = [
        ...currentBranch.verificaciones.verificaciones_Criticas,
        newVerificacionesCriticas,
      ];
    } else {
      const newVerificacionesExtras = { ...defaultVerificacion_Extra };
      newVerificacionesExtras.titulo = verificacion.titulo_Verificacion_Extra;
      newVerificacionesExtras.descripcion = verificacion.descripcion_Verificacion_Extra;

      newBranch.verificaciones.verificaciones_Extras = [
        ...currentBranch.verificaciones.verificaciones_Extras,
        newVerificacionesExtras,
      ];
    }
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  //Este metodo elimina la verificacion Critica o Extra al branch seleccionado segun el id de verificacion y el tipo de verificacion
  const deleteVerificacionFromBranch = (idVerificacion, tipoVerificacion) => {
    const newBranch = currentBranch;
    if (tipoVerificacion === "Critica") {
      const newVerificacionesCriticas = currentBranch.verificaciones.verificaciones_Criticas.filter(
        (verif) => verif._id !== idVerificacion
      );
      newBranch.verificaciones.verificaciones_Criticas = newVerificacionesCriticas;
    } else {
      const newVerificacionesExtras = currentBranch.verificaciones.verificaciones_Extras.filter(
        (verif) => verif._id !== idVerificacion
      );
      newBranch.verificaciones.verificaciones_Extras = newVerificacionesExtras;
    }

    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  // Este metodo actualiza la verificacion segun el id y el tipo de verificacion
  const updateVerificacionFromBranch = (verificacion, tipoVerificacion) => {
    const newBranch = currentBranch;
    if (tipoVerificacion === "Critica") {
      const index = currentBranch.verificaciones.verificaciones_Criticas.findIndex(
        (verif) => verif._id === verificacion.id
      );

      newBranch.verificaciones.verificaciones_Criticas[index].titulo = verificacion.titulo_Verificacion_Critica;
      newBranch.verificaciones.verificaciones_Criticas[index].descripcion =
        verificacion.descripcion_Verificacion_Critica;
    } else {
      const index = currentBranch.verificaciones.verificaciones_Extras.findIndex(
        (verif) => verif._id === verificacion.id
      );
      newBranch.verificaciones.verificaciones_Extras[index].titulo = verificacion.titulo_Verificacion_Extra;
      newBranch.verificaciones.verificaciones_Extras[index].descripcion = verificacion.descripcion_Verificacion_Extra;
    }

    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

  const addEventoToBranch = (siniestro) => {
    const newBranch = currentBranch;
    const newEvento = { ...defaultEvento };
    newEvento.siniestro = siniestro.tituloEvento;
    newEvento._id = new Date().valueOf().toString();
    newBranch.eventos = [...currentBranch.eventos, newEvento];
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  const deleteEventoFromBranch = (idEvento) => {
    const newBranch = currentBranch;
    const newEventos = currentBranch.eventos.filter((evento) => evento._id !== idEvento);
    newBranch.eventos = newEventos;
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

  const updateEventoFromBranch = () => {};

  const addSubtipo_siniestro = () => {};
  const deleteSubtipo_siniestroFromBranch = () => {};
  const updateSubtipo_siniestroFromBranch = () => {};

  const addDocumentoToBranch = () => {};
  const deleteDocumentoFromBranch = () => {};
  const updateDocumentoFromBranch = () => {};

  const addTipificacionToBranch = () => {};
  const deleteTipificacionFromBranch = () => {};
  const updateTipificacionFromBranch = () => {};

  return (
    <BranchContext.Provider
      value={{
        currentBranch,
        setUpCurrentBranch,
        updateStatusBranch,
        branches,
        addBranchToBranches,
        addVerificacionToBranch,
        deleteVerificacionFromBranch,
        updateVerificacionFromBranch,
        addEventoToBranch,
        deleteEventoFromBranch,
        updateEventoFromBranch,
        addSubtipo_siniestro,
        deleteSubtipo_siniestroFromBranch,
        updateSubtipo_siniestroFromBranch,
        addDocumentoToBranch,
        deleteDocumentoFromBranch,
        updateDocumentoFromBranch,
        addTipificacionToBranch,
        deleteTipificacionFromBranch,
        updateTipificacionFromBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
