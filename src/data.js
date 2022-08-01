export const branch = [
  {
    id_branch: "combinadofamiliar",
    text_branch: "Combinado familiar",
    documentacion: [
      {
        siniestro: "incendio",
        subtipo: [
          {
            description: "incendio edificio",
            documentacion: [
              "Si el cliente se comunica informando que se Incendio por Completo su casa: No hagámoslas consultas de la tutoría y No indiquemos documentación a presentar.",
              "Al cliente debemos indicarle que lo va a estar llamando un Estudio liquidador para ayudarlo.",
            ],
            plantilla: "",
            tipificacion: [
              {
                evento:
                  "Eventos que dejen el bien inhabitable por ejemplo: Incendio,terremoto, vendabal, etc",
                core: "VT1",
                accion: "Siniestros",
                tipo_de_resultado: "Toma de denuncia",
                resultado_de_gestion: "Incendio total",
              },
              {
                evento:
                  "Eventos que dejen el bien inhabitable por ejemplo: Incendio,terremoto, vendabal, etc",
                core: "VT7",
                accion: "SiniestrosVT7",
                tipo_de_resultado: "Toma de denuncia",
                resultado_de_gestion: "Incendio total",
              },
            ],
          },
          {
            description: "incendio contenido",
            documentacion: [
              "Fotos de daño",
              " Presupuestos de reparación con informe técnico (si se solicitaron para daños por terremoto, vendaval, granizo , incendio o rayo)",
              "Informe de los bomberos (si hubo intervención)",
            ],
            plantilla: "",
            tipificacion: [
              {
                evento:
                  "Cuando se produzca un incendio parcial de la vivienda.",
                core: "VT1",
                accion: "Siniestros",
                tipo_de_resultado: "Toma de denuncia",
                resultado_de_gestion: "Incendio Parcial",
              },
              {
                evento:
                  "Cuando se produzca un incendio parcial de la vivienda.",
                core: "VT7",
                accion: "SiniestrosVT7",
                tipo_de_resultado: "Toma de denuncia",
                resultado_de_gestion: "Incendio Parcial",
              },
            ],
          },
        ],
      },
      {
        siniestro: "Daños por agua",
        subtipo: [
          {
            description: "Daños por agua al contenido",
            documentacion: [
              "Denuncia de siniestro (Formulario administrativo)",
              "Fotos del daño",
              " Presupuesto membretado con informe técnico con motivo del daño",
              "Estimación del daño",
            ],
            plantilla: "",
            tipificacion: [
              {
                evento:
                  "Cuando un caño empotrado en la pared se rompa y dañe los bienes materiales (no así el caño)",
                core: "VT1",
                accion: "Siniestros",
                tipo_de_resultado: "Toma de denuncia",
                resultado_de_gestion: "Daños por agua al contenido",
              },
              {
                evento:
                  "Cuando un caño empotrado en la pared se rompa y dañe los bienes materiales (no así el caño)",
                core: "VT7",
                accion: "SiniestrosVT7",
                tipo_de_resultado: "Toma de denuncia",
                resultado_de_gestion: "Daños por agua al contenido",
              },
            ],
          },
        ],
      },
      {
        siniestro: "robo/hurto",
        subtipo: [
          {
            description: "Robo",
            documentacion: [
              " Copia de Denuncia policial",
              "Documentación que demuestre preexistencia (manual de uso, factura, garantía, foto JPG/JPEGs, etc.)",
              "Fotos originales de daño",
              "Presupuesto del daño",
              "Estimación del daño",
            ],
          },
          {
            description: "Robo Objeto Especifico",
            documentacion: [
              "Documentación que demuestre preexistencia (manual de uso, factura, garantía, foto JPG/JPEGs, etc.)",
              "Fotos originales de daño",
            ],
          },
          {
            description: "Hurto",
            documentacion: [
              " Copia de Denuncia policial",
              "Documentación que demuestre preexistencia (manual de uso, factura, garantía, foto JPG/JPEGs, etc.)",
              "Fotos originales de daño",
              "Presupuesto del daño",
              "Estimación del daño",
            ],
          },
          {
            description: "Daños por robo o su tentativa",
            documentacion: [
              " Copia de Denuncia policial",
              "Documentación que demuestre preexistencia (manual de uso, factura, garantía, foto JPG/JPEGs, etc.)",
              "Fotos originales de daño",
              "Presupuesto del daño",
              "Estimación del daño",
            ],
          },
        ],
      },
    ],
    tipificaciones: [],
    data: {
      verificaciones_criticas: [
        {
          title: "Domicilio",
          description:
            "Verificar que el domicilio denunciado sea el mismo que el asegurado",
        },
        {
          title: "Vigencia",
          description:
            "Verifica que la póliza por la cual se comunica el cliente este o haya estado vigente al momento del hecho",
        },
        {
          title: "Rechazos de póliza",
          description:
            "Si la poliza presenta Rechazos en los cobros, vamos a proceder a Tomar la denuncia de siniestro, pero debemos indicar al cliente que “Hubo irregularidades en los pagos” o “aún no se verifican los débitos” motivo por el cual,el análisis “Quedara a consideración de la Cia”. Esta información deberá quedar detallada en las observaciones.",
        },
        {
          title: "Coberturas",
          description: "Verifica las coberturas que tenga la póliza contratada",
        },
        {
          title: "Verificación de correo electrónico",
          description:
            "Una vez que confirmamos el mail del asegurado debemos hacer la pregunta de ¿Aceptas recibir las notificaciones del siniestro en este correo?",
        },
      ],
      verificaciones_extras: [],
    },
  },
  {
    id_branch: "roboyriesgossimilares",
    text_branch: "Robo y riesgos similares",
    documentacion: [],
    tipificaciones: [],
    data: {
      verificaciones_criticas: [
        {
          title: "Domicilio",
          description:
            "Verificar que el domicilio denunciado sea el mismo que el asegurado",
        },
        {
          title: "Vigencia",
          description:
            "Verifica que la póliza por la cual se comunica el cliente este o haya estado vigente al momento del hecho",
        },
        {
          title: "Rechazos de póliza",
          description:
            "Si la poliza presenta Rechazos en los cobros, vamos a proceder a Tomar la denuncia de siniestro, pero debemos indicar al cliente que “Hubo irregularidades en los pagos” o “aún no se verifican los débitos” motivo por el cual,el análisis “Quedara a consideración de la Cia”. Esta información deberá quedar detallada en las observaciones.",
        },
        {
          title: "Coberturas",
          description: "Verifica las coberturas que tenga la póliza contratada",
        },
        {
          title: "Verificación de correo electrónico",
          description:
            "Una vez que confirmamos el mail del asegurado debemos hacer la pregunta de ¿Aceptas recibir las notificaciones del siniestro en este correo?",
        },
      ],
      verificaciones_extras: [],
    },
  },
  {
    id_branch: "naranjacuenta",
    text_branch: "Naranja Cuenta",
    documentacion: [],
    tipificaciones: [],
    data: {
      verificaciones_criticas: [],
      verificaciones_extras: [],
    },
  },
  {
    id_branch: "desempleo",
    text_branch: "Desempleo",
    documentacion: [],
    tipificaciones: [],
    data: {
      verificaciones_criticas: [],
      verificaciones_extras: [],
    },
  },
  {
    id_branch: "vida",
    text_branch: "Vida",
    documentacion: [],
    tipificaciones: [],
    data: {
      verificaciones_criticas: [],
      verificaciones_extras: [],
    },
  },
  {
    id_branch: "mascotas",
    text_branch: "Mascotas",
    documentacion: [],
    tipificaciones: [],
    data: {
      verificaciones_criticas: [],
      verificaciones_extras: [],
    },
  },
];
