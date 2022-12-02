import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ModuleCard from "../../components/common/ModuleCard";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const modules = [
  {
    title: "Siniestros",
    href: "/siniestros",
    text: "En este modulo podrás obtener la informacion necesaria para poder tomar la denuncia de siniestro correspondiente al evento que le haya sucedido al cliente",
    icon: <NotificationImportantOutlinedIcon fontSize="large" />,
    disabled: false,
  },
  {
    title: "Consultas",
    href: "/consultas",
    text: "En este modulo encontraras informacion relacionada a la post-venta",
    icon: <AutoStoriesOutlinedIcon fontSize="large" />,
    disabled: true,
  },
  {
    title: "Cotizadores",
    href: "/cotizadores",
    text: "Este modulo cuenta con diversas calculadoras que te permiten realizar cotizaciones online sobre diversos productos.",
    icon: <CalculateOutlinedIcon fontSize="large" />,
    disabled: true,
  },
];

export default function Individuos() {
  return (
    <Stack textAlign={"center"} alignItems={"center"} spacing={2}>
      <Typography variant="h3">Individuos</Typography>
      <Typography veriant="subtitle1">
        Bienvenido a la sección individuos, ingresá a la sección que corresponda a la necesidad del cliente
      </Typography>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {modules.map((mod) => (
          <Grid key={mod.title} m={1}>
            <ModuleCard icon={mod.icon} title={mod.title} text={mod.text} to={mod.href} disabled={mod.disabled} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
