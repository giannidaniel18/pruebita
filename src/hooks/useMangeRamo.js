import { useEffect, useState } from "react";
import useFetch from "./useFetch";

//------------------------------------VERIFICACIONES------------------------------------
export function useVerificaciones(idRamo) {
  const [verificaciones, setVerificaciones] = useState({});
  const [loading, setLoading] = useState(true);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/verificacion/ramo/${idRamo}`, {}, false);
      setVerificaciones(apiResponse.data[0]);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  const createVerificacion = async (tipoVerificacion, verif, idVerificacion) => {
    if (tipoVerificacion === "criticas") {
      const nuevaVerificacion = {
        titulo: verif.titulo_Verificacion_criticas,
        descripcion: verif.descripcion_Verificacion_criticas,
        verificacion: idVerificacion,
      };
      const apiResponse = await startRequest("post", `/api/verificaciones${tipoVerificacion}`, nuevaVerificacion, true);
      if (apiResponse.ok) {
        const { verificacion, ...newVerificacion } = apiResponse.data.obj;
        const newVerificaciones = verificaciones;
        newVerificaciones.verificacionesCriticas = [...verificaciones.verificacionesCriticas, newVerificacion];
        setVerificaciones(newVerificaciones);
      }
    } else {
      const nuevaVerificacion = {
        titulo: verif.titulo_Verificacion_extras,
        descripcion: verif.descripcion_Verificacion_extras,
        verificacion: idVerificacion,
      };
      const apiResponse = await startRequest("post", `/api/verificaciones${tipoVerificacion}`, nuevaVerificacion, true);
      if (apiResponse.ok) {
        const { verificacion, ...newVerificacion } = apiResponse.data.obj;
        const newVerificaciones = verificaciones;
        newVerificaciones.verificacionesExtras = [...verificaciones.verificacionesExtras, newVerificacion];
        setVerificaciones(newVerificaciones);
      }
    }
  };

  const removeVerificacion = async (tipoVerificacion, idVerificacion) => {
    const apiResponse = await startRequest(
      "delete",
      `/api/verificaciones${tipoVerificacion}/${idVerificacion}`,
      {},
      true
    );
    if (apiResponse.ok) {
      if (tipoVerificacion === "criticas") {
        const newVerificaciones = verificaciones;
        newVerificaciones.verificacionesCriticas = verificaciones.verificacionesCriticas.filter(
          (verif) => verif.id !== idVerificacion
        );
        setVerificaciones(newVerificaciones);
      } else {
        const newVerificaciones = verificaciones;
        newVerificaciones.verificacionesExtras = verificaciones.verificacionesExtras.filter(
          (verif) => verif.id !== idVerificacion
        );
        setVerificaciones(newVerificaciones);
      }
    }
  };

  const modifyVerificacion = async (tipoVerificacion, updatedVerif, idVerificacion, masterVerifId) => {
    const newVerificacion = {
      titulo: updatedVerif.title_verif,
      descripcion: updatedVerif.descrip_verif,
      verificacion: masterVerifId,
    };
    // `${URL}/api/verificaciones${tipoVerificacion}/${idVerificacion}`
    const apiResponse = await startRequest(
      "put",
      `/api/verificaciones${tipoVerificacion}/${idVerificacion}`,
      newVerificacion,
      true
    );
    if (apiResponse.ok) {
      const newVerificaciones = verificaciones;
      if (tipoVerificacion === "criticas") {
        const index = verificaciones.verificacionesCriticas.findIndex((verif) => verif.id === idVerificacion);
        newVerificaciones.verificacionesCriticas[index] = apiResponse.data.obj;
        setVerificaciones(newVerificaciones);
      } else {
        const index = verificaciones.verificacionesExtras.findIndex((verif) => verif.id === idVerificacion);
        newVerificaciones.verificacionesExtras[index] = apiResponse.data.obj;
        setVerificaciones(newVerificaciones);
      }
    }
  };

  return { verificaciones, loading, createVerificacion, requestStatus, removeVerificacion, modifyVerificacion };
}
//-------------------------------------EVENTOS----------------------------------------
export function useEventos(idRamo) {
  // const [requestStatus, setRequestStatus] = useState({});
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/eventos/ramo/${idRamo}`, {}, false);
      await setEventos(apiResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  const createEvento = async (newEvento) => {
    const EventoToCreate = { titulo: newEvento.tituloEvento, ramo: idRamo };
    const apiResponse = await startRequest("post", `/api/eventos`, EventoToCreate, true);
    if (apiResponse.ok) {
      setEventos([...eventos, apiResponse.data.obj]);
    }
  };

  const removeEvento = async (idEvento) => {
    const apiResponse = await startRequest("delete", `/api/eventos/${idEvento}`, {}, true);
    if (apiResponse.ok) {
      setEventos(eventos.filter((evento) => evento.id !== idEvento));
    }
  };

  const modifyEvento = async (idEvento, updatedEvento) => {
    const eventoToUpdate = {
      titulo: updatedEvento,
      ramo: idRamo,
    };
    const apiResponse = await startRequest("put", `/api/eventos/${idEvento}`, eventoToUpdate, true);
    if (apiResponse.ok) {
      const newEventos = eventos;
      const indexEvento = eventos.findIndex((evento) => evento.id === idEvento);
      newEventos[indexEvento] = apiResponse.data.obj;
      setEventos(newEventos);
    }
  };

  return { eventos, loading, createEvento, removeEvento, modifyEvento, requestStatus };
}
//------------------------------------SUBTIPOS------------------------------------------
export function useSubtipos(idEvento) {
  const [subtipos, setSubtipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/subtiposiniestro/evento/${idEvento}`, "", false);
      await setSubtipos(apiResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [idEvento]);

  const createSubtipo = async (newSubtipo, idEvento) => {
    const subtipoToCreate = { titulo: newSubtipo.tituloSubtipo, plantilla: "", evento: idEvento };
    const apiResponse = await startRequest("post", `/api/subtiposiniestro`, subtipoToCreate, true);
    console.log(apiResponse);
    if (apiResponse.ok) {
      setSubtipos([...subtipos, apiResponse.data.obj]);
    }
  };
  const removeSubtipo = async (idSubtipo) => {
    const apiResponse = await startRequest("delete", `/api/subtiposiniestro/${idSubtipo}`, {}, true);
    if (apiResponse.ok) {
      setSubtipos(subtipos.filter((subtipo) => subtipo.id !== idSubtipo));
    }
  };
  const modifySubtipo = async (updatedSubtipo, idSubtipo, idEvento) => {
    const subtipoToUpdate = { titulo: updatedSubtipo, evento: idEvento };
    const apiResponse = await startRequest("put", `/api/subtiposiniestro/${idSubtipo}`, subtipoToUpdate, true);
    if (apiResponse.ok) {
      const newSubtipos = subtipos;
      const indexSubtipo = subtipos.findIndex((subtipo) => subtipo.id === idSubtipo);
      newSubtipos[indexSubtipo] = apiResponse.data.obj;
      setSubtipos(newSubtipos);
    }
  };
  const modifyPlantillaSubtipo = async (updatedSubtipo, idSubtipo, idEvento) => {
    const subtipoToUpdate = { plantilla: updatedSubtipo, evento: idEvento };
    const apiResponse = await startRequest("put", `/api/subtiposiniestro/${idSubtipo}`, subtipoToUpdate, true);
    if (apiResponse.ok) {
      const newSubtipos = subtipos;
      const indexSubtipo = subtipos.findIndex((subtipo) => subtipo.id === idSubtipo);
      newSubtipos[indexSubtipo] = apiResponse.data.obj;
      setSubtipos(newSubtipos);
    }
  };

  return { createSubtipo, requestStatus, removeSubtipo, modifyPlantillaSubtipo, modifySubtipo, subtipos, loading };
}
//------------------------------------DOCUMENTOS------------------------------------------
export function useDocumentacion(idSubtipo) {
  const [loading, setLoading] = useState(true);
  const [documentacion, setDocumentacion] = useState([]);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/documentacion/subtipo/${idSubtipo}`, "", false);
      await setDocumentacion(apiResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [idSubtipo]);

  const createDocumentacion = async (newDocumento, idSubtipo) => {
    const documentoToCreate = { titulo: newDocumento, subtipoSiniestro: idSubtipo };
    const apiResponse = await startRequest("post", `/api/documentacion`, documentoToCreate, true);
    if (apiResponse.ok) {
      setDocumentacion([...documentacion, apiResponse.data.obj]);
    }
  };
  const removeDocumentacion = async (idDocumento) => {
    const apiResponse = await startRequest("delete", `/api/documentacion/${idDocumento}`, {}, true);
    if (apiResponse.ok) {
      setDocumentacion(documentacion.filter((documento) => documento.id !== idDocumento));
    }
  };
  const modifyDocumentacion = async (updatedDocumento, idDocumento, idSubtipo) => {
    const documentToUpdate = { titulo: updatedDocumento, subtipoSiniestro: idSubtipo };
    const apiResponse = await startRequest("put", `/api/documentacion/${idDocumento}`, documentToUpdate, true);
    if (apiResponse.ok) {
      const newDocumentacion = documentacion;
      const indexDocumento = documentacion.findIndex((documento) => documento.id === idDocumento);
      newDocumentacion[indexDocumento] = apiResponse.data.obj;
      setDocumentacion(newDocumentacion);
    }
  };

  return { requestStatus, loading, documentacion, createDocumentacion, removeDocumentacion, modifyDocumentacion };
}
//------------------------------------TIPIFICAIONES------------------------------------------
export function useTipificaciones(idSubtipo) {
  // const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [tipificaciones, setTipificaciones] = useState([]);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/tipificacion/subtipo/${idSubtipo}`, "", false);
      await setTipificaciones(apiResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [idSubtipo]);

  const createTipificacion = async (newTipificacion, currentSubtipoId) => {
    const tipificacionToCreate = {
      titulo: newTipificacion.titulo,
      core: newTipificacion.core,
      accion: newTipificacion.accion,
      tipo_De_Resultado: newTipificacion.tipgesdesc,
      resultado_De_La_Gestion: newTipificacion.resgesdesc,
      subtipoSiniestro: currentSubtipoId,
    };
    const apiResponse = await startRequest("post", `/api/tipificacion`, tipificacionToCreate, true);
    if (apiResponse.ok) {
      setTipificaciones([...tipificaciones, apiResponse.data.obj]);
    }
  };
  const removeTipificacion = async (idTipificacion) => {
    const apiResponse = await startRequest("delete", `/api/tipificacion/${idTipificacion}`, {}, true);
    if (apiResponse.ok) {
      setTipificaciones(tipificaciones.filter((tipificacion) => tipificacion.id !== idTipificacion));
    }
  };
  const modifyTipificacion = async (idTipificacion, updatedTipificacion, currentSubtipoId) => {
    const tipificacionToUpdate = {
      titulo: updatedTipificacion.titulo,
      core: updatedTipificacion.core,
      accion: updatedTipificacion.accion,
      tipo_De_Resultado: updatedTipificacion.tipgesdesc,
      resultado_De_La_Gestion: updatedTipificacion.resgesdesc,
      subtipoSiniestro: currentSubtipoId,
    };

    const apiResponse = await startRequest("put", `/api/tipificacion/${idTipificacion}`, tipificacionToUpdate, true);
    if (apiResponse.ok) {
      const newTipificaciones = tipificaciones;
      const indexTipificacion = tipificaciones.findIndex((tipificaion) => tipificaion.id === idTipificacion);
      newTipificaciones[indexTipificacion] = apiResponse.data.obj;
      setTipificaciones(newTipificaciones);
    }
  };

  return { requestStatus, loading, tipificaciones, createTipificacion, removeTipificacion, modifyTipificacion };
}
//------------------------------------TUTORIAS------------------------------------------
export function useTutorias(idRamo) {
  // const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [tutorias, setTutorias] = useState([]);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/tutoria/ramo/${idRamo}`, "", false);
      await setTutorias(apiResponse.data);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  const createTutoria = async (newTutoria) => {
    const tutoriaToCreate = { ...newTutoria, formularios: [], ramo: idRamo };
    const apiResponse = await startRequest("post", `/api/tutoria`, tutoriaToCreate, true);
    if (apiResponse.ok) {
      setTutorias([...tutorias, apiResponse.data.obj]);
    }
  };
  const removeTutoria = async (idTutoria) => {
    const apiResponse = await startRequest("delete", `/api/tutoria/${idTutoria}`, {}, true);

    if (apiResponse.ok) {
      setTutorias(tutorias.filter((tutoria) => tutoria.id !== idTutoria));
    }
  };
  const modifyTutoria = async (idTutoria, updatedTuotria) => {
    const tutoriaToUpdate = { titulo: updatedTuotria, ramo: idRamo };
    const apiResponse = await startRequest("put", `/api/tutoria/${idTutoria}`, tutoriaToUpdate, true);
    if (apiResponse.ok) {
      const newTutorias = tutorias;
      const indexTutoria = tutorias.findIndex((tutoria) => tutoria.id === idTutoria);
      newTutorias[indexTutoria].titulo = updatedTuotria;
      setTutorias(newTutorias);
    }
  };
  const updateFormularios = async (idTutoria, idForm) => {
    const indexTutoria = tutorias.findIndex((tutoria) => tutoria.id === idTutoria);
    if (tutorias[indexTutoria].formularios.includes(idForm)) {
      tutorias[indexTutoria].formularios = tutorias[indexTutoria].formularios.filter((form) => form !== idForm);
    } else {
      tutorias[indexTutoria].formularios = [...tutorias[indexTutoria].formularios, idForm];
    }
    const formsToUpdate = tutorias[indexTutoria].formularios;
    const tutoriaToUpdate = { formularios: formsToUpdate, ramo: idRamo };
    const apiResponse = await startRequest("put", `/api/tutoria/${idTutoria}`, tutoriaToUpdate, true);
    if (apiResponse.ok) {
      const newTutorias = tutorias;
      newTutorias[indexTutoria].formularios = formsToUpdate;
      setTutorias(newTutorias);
    }

    return apiResponse.data;
  };

  return { requestStatus, loading, tutorias, createTutoria, removeTutoria, modifyTutoria, updateFormularios };
}
//------------------------------------GENERAL INFO------------------------------------------
export function useGeneralInfo(branch) {
  // const [requestStatus, setRequestStatus] = useState({});
  const [currentBranch, setCurrentBranch] = useState(branch);
  const { startRequest, requestStatus } = useFetch();

  const updateRamo = async (propToUpdate, dataToUpdate) => {
    const objectToUpdate = propToUpdate === "negocio" ? { negocio: dataToUpdate } : { titulo: dataToUpdate };
    const apiResponse = await startRequest("put", `/api/ramos/${currentBranch.id}`, objectToUpdate, true);
    console.log(apiResponse);
    if (apiResponse.ok) {
      setCurrentBranch(apiResponse.data.obj);
    }
  };

  const deleteRamo = async () => {
    const apiResponse = await startRequest("delete", `/api/ramos/${currentBranch.id}`, {}, true);
    if (apiResponse.ok) {
      return apiResponse;
    }
  };

  return { currentBranch, requestStatus, updateRamo, deleteRamo };
}
