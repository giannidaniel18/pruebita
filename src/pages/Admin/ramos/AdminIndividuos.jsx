import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import ModuleCard from "components/common/ModuleCard";
import BuildIcon from "@mui/icons-material/Build";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const modules = [
  {
    title: "Administracion de ramos",
    href: "abmramos",
    text: "En este modulo se podra administrar toda la informacion relacionada a los ramos tales como : Crear, modificar, o deshabilitar un ramo ",
    icon: <DesignServicesIcon fontSize="large" />,
    disabled: false,
  },
  {
    title: "Consultas",
    href: "#",
    text: "En este modulo encontraras informacion relacionada a la post-venta",
    icon: <AutoStoriesOutlinedIcon fontSize="large" />,
    disabled: true,
  },
  {
    title: "Cotizadores",
    href: "#",
    text: "Este modulo cuenta con diversas calculadoras que te permiten realizar cotizaciones online sobre diversos productos.",
    icon: <CalculateOutlinedIcon fontSize="large" />,
    disabled: true,
  },
];

export default function AdminIndividuos() {
  return (
    <Stack textAlign={"center"} alignItems={"center"} spacing={2}>
      <Typography variant="h3">
        Administración de Individuos <BuildIcon fontSize="large" />
      </Typography>
      <Typography veriant="subtitle1">Bienvenido al modulo de administración de la sección Individuos</Typography>
      <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
        {modules.map((mod) => (
          <Grid key={mod.title} m={1} disabled>
            <ModuleCard icon={mod.icon} title={mod.title} text={mod.text} to={mod.href} disabled={mod.disabled} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
