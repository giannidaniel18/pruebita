import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

export const getRamos = () => {
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

export const addRamo = ({ titulo }) => {
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

export const deleteRamo = (idRamo) => {
  return axios
    .delete(`${URL}/api/ramos/${idRamo}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  //   const response = await fetch(`${URL}/api/ramos/${idRamo}`, {
  //     mode: "cors",
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
  //   });
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     console.log(data);

  //     return data;
  //   }

  //   return response;
};

export const updateRamo = (idRamo, dataToUpdate) => {
  return axios
    .put(`${URL}/api/ramos/${idRamo}`, dataToUpdate)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
