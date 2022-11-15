import { useEffect, useState } from "react";
import {
  addVerificacion,
  deleteVerificacion,
  getBranch,
  updateVerificacion,
  addEvento,
  deleteEvento,
  updateEvento,
  addSubtipo,
  deleteSubtipo,
  getEventosByRamo,
  getSubtiposByEvento,
  updateSubtipo,
} from "../services/ramosService";
import { useCurrentBranchContext } from "../context/CurrentBranchContext";
//------------------------------------VERIFICACIONES------------------------------------
export function useVerificaciones() {
  const [requestStatus, setRequestStatus] = useState({});
  const { currentBranch, setUpCurrentBranch } = useCurrentBranchContext();

  const loadramo = async () => {
    const apiResponse = await getBranch(currentBranch.id);
    setUpCurrentBranch(apiResponse);
  };

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
          text: `verificacion ${apiResponse.data.titulo} agregada a verificaciones ${tipoVerificacion} `,
          status: true,
        });
      } else {
        setRequestStatus({
          responseStatus: "error",
          text: `Error al intentar agregar ${apiResponse.data.titulo} a verificaciones ${tipoVerificacion} `,
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
      if (apiResponse.status === 201) {
        setRequestStatus({
          responseStatus: "success",
          text: `verificacion ${apiResponse.data.titulo} agregada a verificaciones ${tipoVerificacion} `,
          status: true,
        });
      } else {
        setRequestStatus({
          responseStatus: "error",
          text: `Error al intentar agregar ${apiResponse.data.titulo} a verificaciones ${tipoVerificacion} `,
          status: true,
        });
      }
    }

    loadramo();
  };

  const removeVerificacion = async (tipoVerificacion, idVerificacion) => {
    setRequestStatus({});
    const apiResponse = await deleteVerificacion(tipoVerificacion, idVerificacion);

    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data,
        status: true,
      });
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data,
        status: true,
      });
    }
    loadramo();

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

    if (apiResponse.status === 200) {
      setRequestStatus({
        responseStatus: "success",
        text: apiResponse.data.message,
        status: true,
      });
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
    loadramo();
  };

  return { createVerificacion, requestStatus, removeVerificacion, modifyVerificacion };
}
//-------------------------------------EVENTOS----------------------------------------
export function useEventos(idRamo) {
  const [requestStatus, setRequestStatus] = useState({});
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        text: `Evento ${apiResponse.data.titulo} creado Satisfactoriamente`,
        status: true,
      });
      setEventos([...eventos, apiResponse.data]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: `Error al intentar crear el evento : ${apiResponse.data.titulo}  `,
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
        text: apiResponse.data,
        status: true,
      });
      setEventos(eventos.filter((evento) => evento.id !== idEvento));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data,
        status: true,
      });
    }
    // loadramo();
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
      newEventos[indexEvento].titulo = updatedEvento;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const apiResponse = await getSubtiposByEvento(idEvento);
      await setSubtipos(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [idEvento]);

  const createSubtipo = async (newSubtipo, idEvento) => {
    setRequestStatus({});
    const apiResponse = await addSubtipo(newSubtipo, idEvento);

    if (apiResponse.status === 201) {
      setRequestStatus({
        responseStatus: "success",
        text: `subtipo ${apiResponse.data.titulo} creado Satisfactoriamente`,
        status: true,
      });
      setSubtipos([...subtipos, apiResponse.data]);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: `Error al intentar crear el subtipo : ${apiResponse.data.titulo}  `,
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
        text: apiResponse.data,
        status: true,
      });
      setSubtipos(subtipos.filter((subtipo) => subtipo.id !== idSubtipo));
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data,
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
      newSubtipos[indexSubtipo].titulo = updatedSubtipo;
      setSubtipos(newSubtipos);
    } else {
      setRequestStatus({
        responseStatus: "error",
        text: apiResponse.data.message,
        status: true,
      });
    }
  };

  return { createSubtipo, modifySubtipo, removeSubtipo, requestStatus, subtipos, loading };
}

export function useDocumentacion() {
  const [requestStatus, setRequestStatus] = useState({});
  const { currentBranch, setUpCurrentBranch } = useCurrentBranchContext();
  //   const createDocumentacion = () => {};
  //   const updateDocumentacion = () => {};
  //   const deleteDocumentacion = () => {};
  return {};
}
export function useTipificaciones() {
  const [requestStatus, setRequestStatus] = useState({});
  const { currentBranch, setUpCurrentBranch } = useCurrentBranchContext();
  //   const createTipificacion = () => {};
  //   const updateTipificacion = () => {};
  //   const deleteTipificacion = () => {};
  return {};
}
