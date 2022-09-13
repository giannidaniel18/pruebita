export const defaultBranch = {
  _id: new Date(),
  titulo_Ramo: "",
  estado: false,
  formularios: [],
  eventos: [],
  verificaciones: {
    verificaciones_Criticas: [],
    verificaciones_Extras: [],
  },
  creado_por: "",
  createdAt: "2022-08-29T19:31:37.954Z",
  updatedAt: "2022-08-29T19:31:37.954Z",
  modificado_por: "",
};
export const defaultVerificacion_Critica = {
  titulo: "",
  descripcion: "",
  _id: new Date(),
  createdAt: "2022-08-29T19:31:37.954Z",
  updatedAt: "2022-08-29T19:31:37.954Z",
};
export const defaultVerificacion_Extra = {
  titulo: "",
  descripcion: "",
  _id: new Date(),
  createdAt: "2022-08-29T19:31:37.954Z",
  updatedAt: "2022-08-29T19:31:37.954Z",
};

export const welcomePagesData = [
  {
    id: "individuosSiniestros",
    titulo: "Siniestros",
    subtitulo: "Selecciona un ramo en el menú lateral para ver la información del mismo",
  },
  {
    id: "admin",
    titulo: "Administración",
    subtitulo:
      "Selecciona la sección de cliente que deseas administrar para luego obtener un listado de funcionalidades de administración",
  },
];
