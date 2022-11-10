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
      return error;
    });
};

export const getBranch = (id) => {
  const getCurrentBranchURL = `${URL}/api/ramos/${id}`;
  return axios
    .get(getCurrentBranchURL, {
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const addBranch = ({ titulo }) => {
  return axios
    .post(`${URL}/api/ramos`, {
      titulo,
    })
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
      return error;
    });
};

export const updateBranch = (idRamo, dataToUpdate) => {
  return axios
    .put(`${URL}/api/ramos/${idRamo}`, dataToUpdate)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
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
      const { data } = response;
      console.log(data);
      return data;
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
      const { data } = response;
      return data;
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
      const { data } = response;
      console.log(data);
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response;
    });
};
