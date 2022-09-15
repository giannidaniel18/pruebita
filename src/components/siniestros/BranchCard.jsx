import React from "react";
import {
  Alert,
  Button,
  Typography,
  CardActions,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AlertTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import DocumentationTab from "./DocumentationTab";
import { useTheme } from "@emotion/react";
import { ColorsPalette } from "../../config/ColorsPalette";
import Tutoria from "./Tutorias/Tutoria";
import { useRef } from "react";
import { format, parseISO } from "date-fns";
import AlertUpdate from "../AlertUpdate";

export default function BranchCard({ branch }) {
  const theme = useTheme();
  const siniestrosRef = useRef(null);

  function MainInfo() {
    return (
      <Card
        sx={{
          minWidth: "310px",
        }}
      >
        <CardContent>
          <Stack display={"flex"} direction={"row"} alignItems="center" justifyContent={"space-between"}>
            <Typography variant="h3" component="div">
              {branch.titulo_Ramo}
            </Typography>
          </Stack>
          <Divider />
          <Alert sx={{ marginTop: 2 }} variant="outlined" severity="warning">
            <AlertTitle>Verificaciones Criticas!</AlertTitle>
            <List dense>
              {branch.verificaciones.verificaciones_Criticas.length > 0 ? (
                branch.verificaciones.verificaciones_Criticas.map((data) => (
                  <ListItem key={data._id} disablePadding>
                    <ListItemText
                      sx={{ marginY: 0 }}
                      primary={
                        <Typography sx={{ display: "inline" }} variant="h6">
                          {data.titulo} : {""}
                        </Typography>
                      }
                      secondary={
                        <Typography component="span" variant="body2" color="text.primary">
                          {data.descripcion}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Box>Falta de Información</Box>
              )}
            </List>
          </Alert>
          <Accordion
            sx={
              theme.palette.mode === "dark"
                ? { backgroundColor: ColorsPalette.bg_dark.light }
                : { backgroundColor: ColorsPalette.bg_light.dark }
            }
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h4">Información extra</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {branch.verificaciones.verificaciones_Extras.length > 0 ? (
                  branch.verificaciones.verificaciones_Extras.map((data) => (
                    <ListItem key={data._id} disablePadding>
                      <ListItemText
                        sx={{ marginY: 0 }}
                        primary={
                          <Typography sx={{ display: "inline" }} variant="h6">
                            {data.titulo} : {""}
                          </Typography>
                        }
                        secondary={
                          <Typography component="span" variant="body2" color="text.primary">
                            {data.descripcion}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Box>Falta de Información</Box>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() =>
              siniestrosRef.current.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Registrar Siniestro
          </Button>
          <Button size="small">No contempla cobertura</Button>
        </CardActions>
      </Card>
    );
  }

  function Documentation() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Documentación a presentar según siniestro
          </Typography>
        </CardContent>
        <CardActions>
          {/* si el array de documentacion esta vacio renderizo un texto con "falta de informacion" */}
          {branch.eventos.length > 0 ? (
            <DocumentationTab eventos={branch.eventos} />
          ) : (
            <Card
              id="Eventocard"
              sx={
                theme.palette.mode === "dark"
                  ? { border: 0.5, borderColor: "#1B2430" }
                  : { border: 0.5, borderColor: "#d3d5df" }
              }
            >
              <Typography>información Faltante</Typography>
            </Card>
          )}
        </CardActions>
      </Card>
    );
  }
  const updateText = `Ultima actualizacion :  ${format(parseISO(branch.updatedAt), "MM/dd/yyyy")} por ${
    branch.modificado_por
  }`;

  return (
    <Stack spacing={4} mt={{ xs: 2, sm: 0 }} alignItems={{ xs: "center", sm: "flex-start" }}>
      <AlertUpdate text={updateText} severity="info" color="warning" />
      <Stack spacing={4} sx={{ width: { xs: 315, sm: "100%" } }}>
        <Box>
          <MainInfo />
        </Box>

        <Box>
          <Documentation />
        </Box>
        <Box ref={siniestrosRef}>
          <Tutoria formularios={branch.formularios} tituloTutoria={branch.titulo_Ramo} />
        </Box>
      </Stack>
    </Stack>
  );
}
