import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

export const getBranches = () => {
  return axios
    .get(`${URL}/api/ramos`, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const getBranch = (id) => {
  const getCurrentBranchURL = `${URL}/api/ramos/${id}`;
  return axios
    .get(getCurrentBranchURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addBranch = (newBranch) => {
  return axios
    .post(`${URL}/api/ramos`, newBranch)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });

  //   const response = await fetch(`${URL}/api/ramos`, {
  //     mode: "cors",
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
  //     body: JSON.stringify(tituloRamo),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   console.log(response);
  //   return response;
};
export const deleteBranch = (idRamo) => {
  return axios
    .delete(`${URL}/api/ramos/${idRamo}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateBranch = (idRamo, dataToUpdate) => {
  return axios
    .put(`${URL}/api/ramos/${idRamo}`, dataToUpdate)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const startUpVerificacion = (idRamo) => {
  return axios
    .post(`${URL}/api/verificacion`, {
      ramo: idRamo,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
// ---------------------------------- Verificaciones -----------------------------------

export const getVerificacionesByRamo = (idRamo) => {
  const getVerificacionesURL = `${URL}/api/verificacion/ramo/${idRamo}`;
  return axios
    .get(getVerificacionesURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addVerificacion = (tipoVerificacion, verificacion) => {
  return axios
    .post(`${URL}/api/verificaciones${tipoVerificacion}`, {
      titulo: verificacion.titulo,
      descripcion: verificacion.descripcion,
      verificacion: verificacion.id,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const deleteVerificacion = (tipoVerificacion, idVerificacion) => {
  return axios
    .delete(`${URL}/api/verificaciones${tipoVerificacion}/${idVerificacion}`, {})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateVerificacion = (tipoVerificacion, updatedVerif, idVerificacion, masterVerifId) => {
  return axios
    .put(`${URL}/api/verificaciones${tipoVerificacion}/${idVerificacion}`, {
      titulo: updatedVerif.titulo,
      descripcion: updatedVerif.descripcion,
      verificacion: masterVerifId,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};

// ---------------------------------- Eventos ------------------------------------------

// export const getEventosByRamo = (idRamo) => {
//   const getEventsURL = `${URL}/api/eventos/ramo/${idRamo}`;
//   return axios
//     .get(getEventsURL, {
//       headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// };

export const getEventosByRamo = (idRamo) => {
  const getEventosURL = `${URL}/api/eventos/ramo/${idRamo}`;
  return axios
    .get(getEventosURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addEvento = (newEvento, idBranch) => {
  return axios
    .post(`${URL}/api/eventos`, {
      titulo: newEvento.tituloEvento,
      ramo: idBranch,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const deleteEvento = (idEvento) => {
  return axios
    .delete(`${URL}/api/eventos/${idEvento}`, {})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateEvento = (idEvento, updatedEvento, idBranch) => {
  return axios
    .put(`${URL}/api/eventos/${idEvento}`, {
      titulo: updatedEvento,
      ramo: idBranch,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};

// ---------------------------------- Subtipos ------------------------------------------

export const getSubtiposByEvento = (idEvento) => {
  const getSubtiposURL = `${URL}/api/subtiposiniestro/evento/${idEvento}`;
  return axios
    .get(getSubtiposURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addSubtipo = (newSubtipo, idEvento) => {
  return axios
    .post(`${URL}/api/subtiposiniestro`, {
      titulo: newSubtipo.tituloSubtipo,
      plantilla: "",
      evento: idEvento,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const deleteSubtipo = (idSubtipo) => {
  return axios
    .delete(`${URL}/api/subtiposiniestro/${idSubtipo}`, {})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateSubtipo = (updatedSubtipo, idSubtipo) => {
  return axios
    .put(`${URL}/api/subtiposiniestro/${idSubtipo}`, updatedSubtipo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};

// ---------------------------------- Documentos ------------------------------------------

export const getDocumentacionBySubtipo = (idSubtipo) => {
  const getDocumentacionURL = `${URL}/api/documentacion/subtipo/${idSubtipo}`;
  return axios
    .get(getDocumentacionURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addDocumento = (newDocumento, idSubtipo) => {
  return axios
    .post(`${URL}/api/documentacion`, {
      titulo: newDocumento,
      subtipoSiniestro: idSubtipo,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const deleteDocumento = (idDocumento) => {
  return axios
    .delete(`${URL}/api/documentacion/${idDocumento}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateDocumento = (updatedDocumento, idDocumento) => {
  return axios
    .put(`${URL}/api/documentacion/${idDocumento}`, updatedDocumento)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
// ---------------------------------- Tipificaciones ------------------------------------------

export const getTipificacionesBySubtipo = (idSubtipo) => {
  const getTipificacionesURL = `${URL}/api/tipificacion/subtipo/${idSubtipo}`;
  return axios
    .get(getTipificacionesURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addTipificacion = (newTipificacion) => {
  return axios
    .post(`${URL}/api/tipificacion`, newTipificacion)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const deleteTipificacion = (idTipificacion) => {
  return axios
    .delete(`${URL}/api/tipificacion/${idTipificacion}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateTipificacion = (updatedTipificacion, idTipificacion) => {
  return axios
    .put(`${URL}/api/tipificacion/${idTipificacion}`, updatedTipificacion)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};

// ---------------------------------- Tutorias ------------------------------------------

export const getTutoriasByRamo = (idRamo) => {
  const getTutoriasURL = `${URL}/api/tutoria/ramo/${idRamo}`;
  return axios
    .get(getTutoriasURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const addTutoria = (newTutoria) => {
  return axios
    .post(`${URL}/api/tutoria`, newTutoria)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const deleteTutoria = (idTutoria) => {
  return axios
    .delete(`${URL}/api/tutoria/${idTutoria}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
export const updateTutoria = (updatedTutoria, idTutoria) => {
  return axios
    .put(`${URL}/api/tutoria/${idTutoria}`, updatedTutoria)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
