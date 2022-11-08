import { createContext, useContext, useEffect, useState } from "react";
import { branchesArray } from "../data";
import {
  defaultBranch,
  defaultVerificacion_Critica,
  defaultVerificacion_Extra,
  defaultEvento,
  defaultSubtipos_Siniestro,
  defaultTipificacion,
  defaultDocumento,
  defaultTutoria,
} from "../constants/variablesGlobales";
import { getRamos } from "../services/ramos";

const BranchContext = createContext(null);
export const useBranchContext = () => useContext(BranchContext);

const BranchContextProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(null);
  const [branches, setBranches] = useState([]);

  const setUpCurrentBranch = (id) => {
    const newbranch = branches.find((ramo) => ramo.id === id);

    setCurrentBranch(newbranch);
  };
  // cada vez que tengo que updatear currentBranch tengo que updatear branches porque sino el setCurrentBranch va a buscar en branches desactualizado
  //Este metodo solamente se utiliza para updatear branches a nivel general, cuando este la BBDD solo se actualizara el ramo en cuestion
  const updateBranchesData = (newBranch) => {
    const newBranches = [...branches];
    const index = branches.findIndex((ramo) => ramo.id === newBranch.branch_id);
    newBranches[index] = newBranch;
    setBranches(newBranches);
  };
  // Este metodo setea el estado de el branch seleccionado // fixed
  const updateStatusBranch = (branch_id, status) => {
    const newBranch = branches.find((ramo) => ramo.id === branch_id); //en newBranch guardo el ramo encontrado con el id clickeado
    newBranch.estado = status; //le cambio la propiedad estado
    updateBranchesData(newBranch);
  };

  const deleteBranch = (idBranch) => {
    const newBranches = branches.filter((branch) => branch.id !== idBranch);
    setBranches(newBranches);
  };

  const updateBranch = (idBranch, updatedBranch) => {
    console.log(idBranch, updatedBranch);
    const newBranches = branches;
    const index = branches.findIndex((branch) => branch.id === idBranch);
    newBranches[index].titulo = updatedBranch;
    setBranches(newBranches);
  };
  //con este metodo agrego un branch a branches // fixed
  const addBranchToBranches = (titulo_branch) => {
    const newBranch = { ...defaultBranch };
    newBranch.titulo = titulo_branch;
    newBranch.id = new Date().valueOf().toString();
    setBranches([...branches, newBranch]);
  };
  //Este metodo agrega una verificacion Critica o Extra al branch seleccionado segun el tipoverificacion que le llega desde UpdateVerificaciones.jsx
  //fixed
  const addVerificacionToBranch = (verificacion, tipoVerificacion) => {
    const newBranch = currentBranch;
    if (tipoVerificacion === "Critica") {
      const newVerificacionesCriticas = { ...defaultVerificacion_Critica };
      newVerificacionesCriticas.id = new Date().valueOf().toString();
      newVerificacionesCriticas.titulo = verificacion.titulo_Verificacion_Critica;
      newVerificacionesCriticas.descripcion = verificacion.descripcion_Verificacion_Critica;
      newVerificacionesCriticas.createdAt = new Date().toISOString();
      newBranch.verificaciones.verificacionesCriticas = [
        ...currentBranch.verificaciones.verificacionesCriticas,
        newVerificacionesCriticas,
      ];
    } else {
      const newVerificacionesExtras = { ...defaultVerificacion_Extra };
      newVerificacionesExtras.id = new Date().valueOf().toString();
      newVerificacionesExtras.titulo = verificacion.titulo_Verificacion_Extra;
      newVerificacionesExtras.descripcion = verificacion.descripcion_Verificacion_Extra;
      newVerificacionesExtras.createdAt = new Date().toISOString();
      newBranch.verificaciones.verificacionesExtras = [
        ...currentBranch.verificaciones.verificacionesExtras,
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
      const newVerificacionesCriticas = currentBranch.verificaciones.verificacionesCriticas.filter(
        (verif) => verif.id !== idVerificacion
      );
      newBranch.verificaciones.verificacionesCriticas = newVerificacionesCriticas;
    } else {
      const newVerificacionesExtras = currentBranch.verificaciones.verificacionesExtras.filter(
        (verif) => verif.id !== idVerificacion
      );
      newBranch.verificaciones.verificacionesExtras = newVerificacionesExtras;
    }

    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  // Este metodo actualiza la verificacion segun el id y el tipo de verificacion
  const updateVerificacionFromBranch = (idVerificacion, verificacion, tipoVerificacion) => {
    console.log(verificacion, tipoVerificacion);
    const newBranch = currentBranch;
    if (tipoVerificacion === "Critica") {
      const index = currentBranch.verificaciones.verificacionesCriticas.findIndex(
        (verif) => verif.id === idVerificacion
      );
      newBranch.verificaciones.verificacionesCriticas[index].titulo = verificacion.title_verif;
      newBranch.verificaciones.verificacionesCriticas[index].descripcion = verificacion.descrip_verif;
      newBranch.verificaciones.verificacionesCriticas[index].updatedAt = new Date().toISOString();
    } else {
      const index = currentBranch.verificaciones.verificaciones_Extras.findIndex(
        (verif) => verif.id === idVerificacion
      );
      newBranch.verificaciones.verificacionesExtras[index].titulo = verificacion.title_verif;
      newBranch.verificaciones.verificacionesExtras[index].descripcion = verificacion.descrip_verif;
      newBranch.verificaciones.verificacionesExtras[index].updatedAt = new Date().toISOString();
    }

    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  //ABM DE EVENTOS
  const addEventoToBranch = (evento) => {
    const newBranch = currentBranch;
    const newEvento = { ...defaultEvento };
    newEvento.titulo = evento.tituloEvento;
    newEvento.id = new Date().valueOf().toString();
    newEvento.createdAt = new Date().toISOString();
    newBranch.eventos = [...currentBranch.eventos, newEvento];
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
    return { responseStatus: "success", text: `Has agregado exitosamente el evento : ${evento.tituloEvento} ` };
  };
  const deleteEventoFromBranch = (idEvento, nameEvento) => {
    const newBranch = currentBranch;
    newBranch.eventos = currentBranch.eventos.filter((evento) => evento.id !== idEvento);
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
    return { responseStatus: "success", text: `Has eliminado exitosamente el evento : ${nameEvento} ` };
  };
  const updateEventoFromBranch = (idEvento, updatedEvento) => {
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const oldEventName = newBranch.eventos[indexEvento].titulo;
    newBranch.eventos[indexEvento].titulo = updatedEvento;
    newBranch.updatedAt = new Date().toISOString();
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
    return {
      responseStatus: "success",
      text: `Has Actualizado exitosamente el Evento "${oldEventName}" a "${updatedEvento}" `,
    };
  };
  //ABM DE SUBTIPOS
  const addSubtipoToEvento = (subtipo, idEvento) => {
    const newBranch = currentBranch;
    const newSubtipo = { ...defaultSubtipos_Siniestro };
    newSubtipo.id = new Date().valueOf().toString();
    newSubtipo.titulo = subtipo.tituloSubtipo;
    newSubtipo.createdAt = new Date().toISOString();
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento); // tengo que encontrar la posicion del evento a la que le estoy agregando el subtipo
    newBranch.eventos[indexEvento].subtiposSiniestro = [
      ...currentBranch.eventos[indexEvento].subtiposSiniestro,
      newSubtipo,
    ];
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
    return { responseStatus: "success", text: `Has agregado exitosamente el subtipo : ${subtipo.tituloSubtipo} ` };
  };
  const deleteSubtipoFromEvento = (idSubtipo, idEvento, nameSubtipo) => {
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento); // tengo que encontrar la posicion del evento a la que le estoy agregando el subtipo
    newBranch.eventos[indexEvento].subtiposSiniestro = currentBranch.eventos[indexEvento].subtiposSiniestro.filter(
      (subtipo) => subtipo.id !== idSubtipo
    );
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
    return { responseStatus: "success", text: `Has eliminado exitosamente el subtipo : ${nameSubtipo} ` };
  };
  const updateSubtipoFromEvento = (idSubtipo, updatedSubtipo, idEvento) => {
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    const oldSubtipoName = newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].titulo;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].titulo = updatedSubtipo;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].updatedAt = new Date().toISOString();
    console.log(newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo]);
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
    return {
      responseStatus: "success",
      text: `Has Actualizado exitosamente el subtipo "${oldSubtipoName}" a "${updatedSubtipo}" `,
    };
  };
  //ABM DE TIPIFICACIONES
  const addTipificacionToSubtipo = (tipificacion, idSubtipo, idEvento) => {
    const newBranch = currentBranch;
    const newTipificacion = { ...defaultTipificacion };
    newTipificacion.id = new Date().valueOf().toString();
    newTipificacion.titulo = tipificacion.titulo;
    newTipificacion.core = tipificacion.core;
    newTipificacion.accion = tipificacion.accion;
    newTipificacion.tipo_De_Resultado = tipificacion.tipgesdesc;
    newTipificacion.resultado_De_La_Gestion = tipificacion.resgesdesc;
    newTipificacion.createdAt = new Date().toISOString();
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );

    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion = [
      ...newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion,
      newTipificacion,
    ];
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  const deleteTipificacionFromSubtipo = (tipificacionId, idSubtipo, idEvento) => {
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion = newBranch.eventos[
      indexEvento
    ].subtiposSiniestro[indexSubtipo].tipificacion.filter((tipif) => tipif.id !== tipificacionId);
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  const updateTipificacionFromSubtipo = (tipificacionId, updatedTipificacion, idSubtipo, idEvento) => {
    console.log(updatedTipificacion);
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    const indexTipif = currentBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion.findIndex(
      (tipif) => tipif.id === tipificacionId
    );
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion[indexTipif].titulo =
      updatedTipificacion.titulo;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion[indexTipif].core =
      updatedTipificacion.core;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion[indexTipif].accion =
      updatedTipificacion.accion;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion[indexTipif].tipo_De_Resultado =
      updatedTipificacion.tipgesdesc;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion[indexTipif].resultado_De_La_Gestion =
      updatedTipificacion.resgesdesc;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].tipificacion[indexTipif].updatedAt =
      new Date().toISOString();
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  //ABM DE DOCUMENTOS
  const addDocumentoToSubtipo = (newDocumento, idSubtipo, idEvento) => {
    const newBranch = currentBranch;
    const newDoc = { ...defaultDocumento };
    newDoc.id = new Date().valueOf().toString();
    newDoc.titulo = newDocumento;
    newDoc.createdAt = new Date().toISOString();
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento); // tengo que encontrar la posicion del evento a la que le estoy agregando el subtipo
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].documentacion = [
      ...newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].documentacion,
      newDoc,
    ];

    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  const deleteDocumentoFromSubtipo = (idDoc, idSubtipo, idEvento) => {
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].documentacion = newBranch.eventos[
      indexEvento
    ].subtiposSiniestro[indexSubtipo].documentacion.filter((doc) => doc.id !== idDoc);
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  const updateDocumentoFromSubtipo = (idDoc, updatedDoc, idSubtipo, idEvento) => {
    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    const indexDoc = currentBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].documentacion.findIndex(
      (doc) => doc.id === idDoc
    );
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].documentacion[indexDoc].titulo = updatedDoc;
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

  const addTutoriaToBranch = (tutoria) => {
    const newBranch = currentBranch;
    const newTutoria = { ...defaultTutoria };
    newTutoria.titulo = tutoria.titulo;
    newTutoria.id = new Date().valueOf().toString();
    newBranch.tutorias = [...currentBranch.tutorias, newTutoria];
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };
  const deleteTutoriaFromBranch = (idTutoria) => {
    const newBranch = currentBranch;
    newBranch.tutorias = currentBranch.tutorias.filter((tutoria) => tutoria.id !== idTutoria);
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

  const updateTutoriaFromBranch = (idTutoria, updatedTutoria) => {
    const newBranch = currentBranch;
    const indexTutoria = currentBranch.tutorias.findIndex((tutoria) => tutoria.id === idTutoria);
    newBranch.tutorias[indexTutoria].titulo = updatedTutoria;
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

  const updateFormulariosFromTutoria = (idTutoria, idform, status) => {
    const newBranch = currentBranch;
    const indexTutoria = currentBranch.tutorias.findIndex((tutoria) => tutoria.id === idTutoria);

    if (status === false) {
      const newFormularios = currentBranch.tutorias[indexTutoria].formularios.filter((form) => form !== idform);
      newBranch.tutorias[indexTutoria].formularios = newFormularios;
    } else {
      newBranch.tutorias[indexTutoria].formularios.push(idform);
    }
    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

  const updatePlantillaFromSubtipo = (updatedPlantilla, idEvento, idSubtipo) => {
    console.log(updatedPlantilla, idEvento, idSubtipo);

    const newBranch = currentBranch;
    const indexEvento = currentBranch.eventos.findIndex((evento) => evento.id === idEvento);
    const indexSubtipo = currentBranch.eventos[indexEvento].subtiposSiniestro.findIndex(
      (subtipo) => subtipo.id === idSubtipo
    );
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].plantilla = updatedPlantilla;
    newBranch.eventos[indexEvento].subtiposSiniestro[indexSubtipo].updatedAt = new Date().toISOString();

    setCurrentBranch(newBranch);
    updateBranchesData(newBranch);
  };

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
        addSubtipoToEvento,
        deleteSubtipoFromEvento,
        updateSubtipoFromEvento,
        addDocumentoToSubtipo,
        deleteDocumentoFromSubtipo,
        updateDocumentoFromSubtipo,
        addTipificacionToSubtipo,
        updateTipificacionFromSubtipo,
        deleteTipificacionFromSubtipo,
        addTutoriaToBranch,
        deleteTutoriaFromBranch,
        updateTutoriaFromBranch,
        updateFormulariosFromTutoria,
        updatePlantillaFromSubtipo,
        deleteBranch,
        updateBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
