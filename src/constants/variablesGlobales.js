export const defaultBranch = {
  _id: "",
  titulo_Ramo: "",
  estado: false,
  tutorias: [],
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
  _id: "",
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
export const defaultTutoria = {
  _id: "",
  titulo: "",
  formularios: [],
};
export const defaultEvento = {
  _id: new Date().valueOf(),
  siniestro: "",
  subtipos_Siniestro: [],
};
export const defaultSubtipos_Siniestro = {
  _id: "",
  descripcion: "",
  documentacion: [],
  plantilla: "",
  tipificacion: [],
};
export const defaultDocumento = { _id: "", titulo: "" };
export const defaultTipificacion = {
  _id: "",
  evento: "",
  core: "",
  accion: "",
  tipo_de_resultado: "",
  resultado_de_gestion: "",
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

export const formsAndInfo = [
  { id: "PolizaBasic", nombre: "Solicitar Póliza", info: "Formulario utilizado para incluir el numero de póliza " },
  {
    id: "DatosPersonalesBasic",
    nombre: "Datos Personales Basico",
    info: "Nombre y apellido / parentesco / mail / teléfono",
  },
  {
    id: "DatosPersonalesExtended",
    nombre: "Datos Personales Extendido",
    info: "Nombre y apellido / parentesco / mail / teléfono / domicilio /ciudad /codigo postal",
  },
  { id: "LineaSiniestradaBasic", nombre: "Linea Siniestrada", info: "Linea del teléfono sustraido" },
  {
    id: "DatosLaboralesBasic",
    nombre: "Datos laborales",
    info: "Nombre de la empresa / fecha y motivo de desvinculacion / antigueadad / ¿finalizacion de obra?",
  },
  {
    id: "DescripcionDelHechoBasic",
    nombre: "Descripcion del hecho Basico",
    info: " relato de lo sucedido / bienes siniestrados",
  },
  {
    id: "DescripcionDelHechoExtended",
    nombre: "Descripcion del hecho Extendido",
    info: "Tipo de siniestro / relato de lo sucedido / bienes siniestrados / monto estimado en $ARS",
  },
  {
    id: "FechaHoraLugarSiniestroBasic",
    nombre: "Fecha, hora y lugar del siniestro",
    info: " Fecha / Hora / Lugar de ocurrencia (barrio, calles, ciudad)",
  },
  {
    id: "FechaHoraSiniestroBasic",
    nombre: "Fecha y hora del siniestro",
    info: "Fecha y Hora",
  },
  {
    id: "ObservacionesFinalesBasic",
    nombre: "Observaciones finales Basico",
    info: " Observaciones / ¿siniestro dudoso?",
  },
  {
    id: "ObservacionesFinalesExtended",
    nombre: "Observaciones finales Extendido",
    info: "Observaciones / ¿siniestro dudoso? / ¿siniestro multiple?",
  },
];

export const defaultDrawerDataToHandle = {
  id: "",
  type: "",
  method: "",
  data: [],
};
