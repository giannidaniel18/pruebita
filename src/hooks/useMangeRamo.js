import { useEffect, useState } from "react";
import {
  addVerificacion,
  deleteVerificacion,
  updateVerificacion,
  addEvento,
  deleteEvento,
  updateEvento,
  addSubtipo,
  deleteSubtipo,
  getEventosByRamo,
  getSubtiposByEvento,
  updateSubtipo,
  getDocumentacionBySubtipo,
  addDocumento,
  deleteDocumento,
  updateDocumento,
  getTipificacionesBySubtipo,
  addTipificacion,
  deleteTipificacion,
  updateTipificacion,
  getTutoriasByRamo,
  addTutoria,
  deleteTutoria,
  updateTutoria,
  getVerificacionesByRamo,
} from "../services/ramosService";

//------------------------------------VERIFICACIONES------------------------------------
export function useVerificaciones(idRamo) {
  const [requestStatus, setRequestStatus] = useState({});
  const [verificaciones, setVerificaciones] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getVerificacionesByRamo(idRamo);
      await setVerificaciones(apiResponse[0]);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  const createVerificacion = async (tipoVerificacion, verificacion, idVerificacion) => {
    setRequestStatus({});
    if (tipoVerificacion === "criticas") {
      const newVerificacion = {
        titulo: verificacion.titulo_Verificacion_criticas,
        descripcion: verificacion.descripcion_Verificacion_criticas,
        id: idVerificacion,
      };
      const apiResponse = await addVerificacion(tipoVerificacion, newVerificacion);
      if (apiResponse.status === 201) {
        setRequestStatus({
          responseStatus: "success",
          text: apiResponse.data.message,
          status: true,
        });
        const { verificacion, ...newVerificacion } = apiResponse.data.obj;
        const newVerificaciones = verificaciones;
        newVerificaciones.verificacionesCriticas = [...verificaciones.verificacionesCriticas, newVerificacion];
        setVerificaciones(newVerificaciones);
      } else {
        setRequestStatus({
          responseStatus: "error",
          text: apiResponse.data.message,
          status: true,
        });
      }
    } else {
      const newVerificacion = {
        titulo: verificacion.titulo_Verificacion_extras,
        descripcion: verificacion.descripcion_Verificacion_extras,
        id: idVerificacion,
      };
      const apiResponse = await addVerificacion(tipoVerificacion, newVerificacion);
      console.log(apiResponse);
      if (apiResponse.status === 201) {
        setRequestStatus({
          responseStatus: "success",
          text: apiResponse.data.message,
          status: true,
        });
        const { verificacion, ...newVerificacion } = apiResponse.data.obj;
        const newVerificaciones = verificaciones;
        newVerificaciones.verificacionesExtras = [...verificaciones.verificacionesExtras, newVerificacion];
        setVerificaciones(newVerificaciones);
      } else {
        setRequestStatus({
          responseStatus: "error",
          text: apiResponse.data.message,
          status: true,
        });
      }
    }
  };

  const removeVerificacion = async (tipoVerificacion, idVerificacion) => {
    setRequestStatus({});
    const apiResponse = await deleteVerificacion(tipoVerificacion, idVerificacion);
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
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
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
    // loadramo();

    // deleteVerificacionFromBranch(tipoVerificacion, idVerificacion);
    // deleteVerificacion(tipoVerificacion, idVerificacion);
  };

  const modifyVerificacion = async (tipoVerificacion, updatedVerif, idVerificacion, masterVerifId) => {
    setRequestStatus({});
    const newVerificacion = {
      titulo: updatedVerif.title_verif,
      descripcion: updatedVerif.descrip_verif,
    };
    const apiResponse = await updateVerificacion(tipoVerificacion, newVerificacion, idVerificacion, masterVerifId);
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
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
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  return { verificaciones, loading, createVerificacion, requestStatus, removeVerificacion, modifyVerificacion };
}
//-------------------------------------EVENTOS----------------------------------------
export function useEventos(idRamo) {
  const [requestStatus, setRequestStatus] = useState({});
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getEventosByRamo(idRamo);
      await setEventos(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  const createEvento = async (newEvento) => {
    setRequestStatus({});
    const apiResponse = await addEvento(newEvento, idRamo);
    if (apiResponse.status === 201) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setEventos([...eventos, apiResponse.data.obj]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  const removeEvento = async (idEvento) => {
    setRequestStatus({});
    const apiResponse = await deleteEvento(idEvento);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setEventos(eventos.filter((evento) => evento.id !== idEvento));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  const modifyEvento = async (idEvento, updatedEvento) => {
    setRequestStatus({});
    const apiResponse = await updateEvento(idEvento, updatedEvento, idRamo);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newEventos = eventos;
      const indexEvento = eventos.findIndex((evento) => evento.id === idEvento);
      newEventos[indexEvento] = apiResponse.data.obj;
      setEventos(newEventos);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  return { eventos, loading, createEvento, modifyEvento, removeEvento, requestStatus };
}
//------------------------------------SUBTIPOS------------------------------------------
export function useSubtipos(idEvento) {
  const [requestStatus, setRequestStatus] = useState({});
  const [subtipos, setSubtipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getSubtiposByEvento(idEvento);
      await setSubtipos(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [idEvento]);

  const createSubtipo = async (newSubtipo, idEvento) => {
    setRequestStatus({});
    const apiResponse = await addSubtipo(newSubtipo, idEvento);
    console.log(apiResponse);
    if (apiResponse.status === 201) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setSubtipos([...subtipos, apiResponse.data.obj]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const removeSubtipo = async (idSubtipo) => {
    setRequestStatus({});
    const apiResponse = await deleteSubtipo(idSubtipo);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setSubtipos(subtipos.filter((subtipo) => subtipo.id !== idSubtipo));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const modifySubtipo = async (updatedSubtipo, idSubtipo, idEvento) => {
    setRequestStatus({});
    const subtipoToUpdate = { titulo: updatedSubtipo, evento: idEvento };
    const apiResponse = await updateSubtipo(subtipoToUpdate, idSubtipo);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newSubtipos = subtipos;
      const indexSubtipo = subtipos.findIndex((subtipo) => subtipo.id === idSubtipo);
      newSubtipos[indexSubtipo] = apiResponse.data.obj;
      setSubtipos(newSubtipos);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const modifyPlantillaSubtipo = async (updatedSubtipo, idSubtipo, idEvento) => {
    setRequestStatus({});
    const subtipoToUpdate = { plantilla: updatedSubtipo, evento: idEvento };
    const apiResponse = await updateSubtipo(subtipoToUpdate, idSubtipo);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newSubtipos = subtipos;
      const indexSubtipo = subtipos.findIndex((subtipo) => subtipo.id === idSubtipo);
      newSubtipos[indexSubtipo] = apiResponse.data.obj;
      setSubtipos(newSubtipos);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  return { createSubtipo, modifySubtipo, removeSubtipo, requestStatus, subtipos, loading, modifyPlantillaSubtipo };
}
//------------------------------------DOCUMENTOS------------------------------------------
export function useDocumentacion(idSubtipo) {
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [documentacion, setDocumentacion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getDocumentacionBySubtipo(idSubtipo);

      await setDocumentacion(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [idSubtipo]);

  const createDocumentacion = async (newDocumento, idSubtipo) => {
    setRequestStatus({});
    const apiResponse = await addDocumento(newDocumento, idSubtipo);
    if (apiResponse.status === 201) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setDocumentacion([...documentacion, apiResponse.data.obj]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const removeDocumentacion = async (idDocumento) => {
    setRequestStatus({});
    const apiResponse = await deleteDocumento(idDocumento);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setDocumentacion(documentacion.filter((documento) => documento.id !== idDocumento));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const modifyDocumentacion = async (updatedDocumento, idDocumento, idSubtipo) => {
    setRequestStatus({});
    const documentToUpdate = { titulo: updatedDocumento, subtipoSiniestro: idSubtipo };
    const apiResponse = await updateDocumento(documentToUpdate, idDocumento);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newDocumentacion = documentacion;
      const indexDocumento = documentacion.findIndex((documento) => documento.id === idDocumento);
      newDocumentacion[indexDocumento] = apiResponse.data.obj;
      setDocumentacion(newDocumentacion);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  return { requestStatus, loading, documentacion, createDocumentacion, removeDocumentacion, modifyDocumentacion };
}
//------------------------------------TIPIFICAIONES------------------------------------------
export function useTipificaciones(idSubtipo) {
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [tipificaciones, setTipificaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getTipificacionesBySubtipo(idSubtipo);
      await setTipificaciones(apiResponse);

      setLoading(false);
    };
    fetchData();
  }, [idSubtipo]);

  const createTipificacion = async (newTipificacion, currentSubtipoId) => {
    setRequestStatus({});
    const tipificacionToAdd = {
      titulo: newTipificacion.titulo,
      core: newTipificacion.core,
      accion: newTipificacion.accion,
      tipo_De_Resultado: newTipificacion.tipgesdesc,
      resultado_De_La_Gestion: newTipificacion.resgesdesc,
      subtipoSiniestro: currentSubtipoId,
    };
    const apiResponse = await addTipificacion(tipificacionToAdd);
    if (apiResponse.status === 201) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setTipificaciones([...tipificaciones, apiResponse.data.obj]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const removeTipificacion = async (tipificacionId) => {
    setRequestStatus({});
    const apiResponse = await deleteTipificacion(tipificacionId);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      setTipificaciones(tipificaciones.filter((tipificacion) => tipificacion.id !== tipificacionId));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const modifyTipificacion = async (tipificacionID, updatedTipificacion, currentSubtipoId) => {
    setRequestStatus({});
    const tipificacionToUpdate = {
      titulo: updatedTipificacion.titulo,
      core: updatedTipificacion.core,
      accion: updatedTipificacion.accion,
      tipo_De_Resultado: updatedTipificacion.tipgesdesc,
      resultado_De_La_Gestion: updatedTipificacion.resgesdesc,
      subtipoSiniestro: currentSubtipoId,
    };

    const apiResponse = await updateTipificacion(tipificacionToUpdate, tipificacionID);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newTipificaciones = tipificaciones;
      const indexTipificacion = tipificaciones.findIndex((tipificaion) => tipificaion.id === tipificacionID);
      newTipificaciones[indexTipificacion] = apiResponse.data.obj;
      setTipificaciones(newTipificaciones);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  return { requestStatus, loading, tipificaciones, createTipificacion, removeTipificacion, modifyTipificacion };
}
//------------------------------------TUTORIAS------------------------------------------
export function useTutorias(idRamo) {
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [tutorias, setTutorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getTutoriasByRamo(idRamo);
      await setTutorias(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  const createTutoria = async (newTutoria) => {
    setRequestStatus({});
    const tutoriaToAdd = { ...newTutoria, formularios: [], ramo: idRamo };
    const apiResponse = await addTutoria(tutoriaToAdd);
    if (apiResponse.status === 201) {
      setRequestStatus({
        responseStatus: "success",
        text: `Tututoria ${apiResponse.data.titulo} creada Satisfactoriamente`,
        status: true,
      });
      setTutorias([...tutorias, apiResponse.data]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: `Error al intentar crear la Tututoria : ${apiResponse.data.titulo}  `,
        status: true,
      });
    }
  };
  const removeTutoria = async (idTutoria) => {
    setRequestStatus({});
    const apiResponse = await deleteTutoria(idTutoria);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data,
        status: true,
      });
      setTutorias(tutorias.filter((tutoria) => tutoria.id !== idTutoria));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data,
        status: true,
      });
    }
  };
  const modifyTutoria = async (idTutoria, updatedTuotria) => {
    setRequestStatus({});
    const tutoriaToUpdate = { titulo: updatedTuotria, ramo: idRamo };
    const apiResponse = await updateTutoria(tutoriaToUpdate, idTutoria);

    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newTutorias = tutorias;
      const indexTutoria = tutorias.findIndex((tutoria) => tutoria.id === idTutoria);
      newTutorias[indexTutoria].titulo = updatedTuotria;
      setTutorias(newTutorias);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };
  const updateFormularios = async (idTutoria, idForm) => {
    setRequestStatus({});
    const indexTutoria = tutorias.findIndex((tutoria) => tutoria.id === idTutoria);
    if (tutorias[indexTutoria].formularios.includes(idForm)) {
      tutorias[indexTutoria].formularios = tutorias[indexTutoria].formularios.filter((form) => form !== idForm);
    } else {
      tutorias[indexTutoria].formularios = [...tutorias[indexTutoria].formularios, idForm];
    }
    const formsToUpdate = tutorias[indexTutoria].formularios;
    const tutoriaToUpdate = { formularios: formsToUpdate, ramo: idRamo };
    const apiResponse = await updateTutoria(tutoriaToUpdate, idTutoria);
    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
      const newTutorias = tutorias;
      newTutorias[indexTutoria].formularios = formsToUpdate;
      setTutorias(newTutorias);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }

    return apiResponse;
  };

  return { requestStatus, loading, tutorias, createTutoria, removeTutoria, modifyTutoria, updateFormularios };
}

export function useGeneralInfo(branch) {
  // const [currentBranch, setcurrentBranch] = useState(branch);
  //Desde el container me traigo el currentBranch, establesco un estado local en este hook para poder actualizar la informacion que se va a renderizar en pantalla y al mismo tiempo pegarle a los endpoints que actualicen la base
}
