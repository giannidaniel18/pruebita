import { Container, Stack, Typography, Paper, Button } from "@mui/material";

import { styled } from "@mui/material/styles";
import React from "react";
import { ColorsPalette } from "../config/ColorsPalette";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? ColorsPalette.bg_dark.light
      : ColorsPalette.bg_light.dark,
  borderRadius: "10px",
  padding: theme.spacing(2),
  textTransform: "none",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ListItems = [
  {
    itemname: "Siniestros",
    status: true,
    icon: <NotificationImportantOutlinedIcon fontSize="large" />,
  },
  {
    itemname: "Consultas",
    status: true,
    icon: <AutoStoriesOutlinedIcon fontSize="large" />,
  },
  {
    itemname: "Cotizadores",
    status: true,
    icon: <CalculateOutlinedIcon fontSize="large" />,
  },
];

export default function Individuos() {
  return (
    <Container maxWidth={"lg"}>
      <Stack alignItems={"center"} id="principal" spacing={2}>
        <Typography textAlign={"center"} variant="h3">
          Bienvenido a la sección Individuos
        </Typography>

        {ListItems.map((item, index) => (
          <Item
            key={item.itemname}
            component={Button}
            sx={{
              width: { xs: "300px", sm: "400px", md: "500px" },
              boxShadow: 3,
            }}
          >
            {item.icon}
            <Typography variant="h4" marginLeft={2}>
              {item.itemname}
            </Typography>
          </Item>
        ))}
      </Stack>
    </Container>
  );
}
