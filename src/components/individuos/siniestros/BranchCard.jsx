import React, { useState } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import DocumentationTab from "./DocumentationTab";
import Tutoria from "./Tutoria";
import CustomAlert from "../../common/CustomAlert.";
import SubtipoCard from "./SubtipoCard";
import DataNotFound from "../../common/DataNotFound";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function BranchCard({ branch }) {
  const [selectedTutoria, setSelectedTutoria] = useState(null);
  const updateText = `Ultima actualizacion :  ${format(parseISO(branch.updatedAt), "dd/MM/yyyy")} por ${
    branch.modificado_por
  }`;

  const handleSelectedTutoria = (e) => {
    e.target.getAttribute("id-tutoria") === selectedTutoria?._id
      ? setSelectedTutoria(null)
      : setSelectedTutoria(branch.tutorias.find((tutoria) => tutoria._id === e.target.getAttribute("id-tutoria")));
  };

  return (
    <Stack spacing={6} mt={{ xs: 2, sm: 0 }} alignItems={{ xs: "center", sm: "flex-start" }}>
      <CustomAlert type={"info"}>{updateText}</CustomAlert>
      <Stack spacing={2} width="100%">
        <Typography variant="h2">{branch.titulo_Ramo}</Typography>

        <Box>
          <VerificacionesInfo verificaciones={branch.verificaciones} />
        </Box>
        <Divider />
        <Box>
          {branch?.eventos.length ? (
            <DocumentacionTipificacion eventos={branch.eventos} />
          ) : (
            <DataNotFound>
              <Typography px={2} variant="h5">
                No existen eventos para este ramo.
              </Typography>
            </DataNotFound>
          )}
        </Box>

        <Divider />

        {branch.tutorias.length ? (
          <Stack direction={"column"} alignItems={"flex-start"} spacing={2}>
            <Stack direction="row" spacing={2}>
              {branch.tutorias.map((tutoria) => (
                <Button
                  key={tutoria._id}
                  variant={selectedTutoria?._id === tutoria._id ? "contained" : "text"}
                  id-tutoria={tutoria._id}
                  onClick={handleSelectedTutoria}
                >
                  Siniestro {tutoria.titulo}
                  <HistoryEduIcon />
                </Button>
              ))}
            </Stack>
            {selectedTutoria && (
              <Tutoria formularios={selectedTutoria.formularios} tituloTutoria={selectedTutoria.titulo} />
            )}
          </Stack>
        ) : (
          <DataNotFound>
            <Typography px={2} variant="h5">
              No hay formularios configurados para la tutoría actual
            </Typography>
          </DataNotFound>
        )}
      </Stack>
    </Stack>
  );
}

function VerificacionesInfo({ verificaciones }) {
  return (
    <Stack>
      {verificaciones.verificaciones_Criticas.length ? (
        <CustomAlert type={"hint"}>
          <Typography variant="h4">Verificaciones criticas</Typography>
          <Typography variant="subtitle1">Corroborar con el cliente en linea la siguiente información.</Typography>
          <Divider />
          <List dense>
            {verificaciones.verificaciones_Criticas.map((data) => (
              <Stack key={data._id}>
                <ListItem disablePadding>
                  <ListItemText
                    sx={{ marginY: 0 }}
                    primary={<Typography variant="h6">{data.titulo}</Typography>}
                    secondary={
                      <Typography variant="body2" color="text.primary">
                        {data.descripcion}
                      </Typography>
                    }
                  />
                </ListItem>
              </Stack>
            ))}
          </List>
        </CustomAlert>
      ) : (
        <DataNotFound>
          <Typography px={2} variant="h5">
            No existen verificaciones criticas
          </Typography>
        </DataNotFound>
      )}
      {verificaciones.verificaciones_Extras.length ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h4">Verificaciones extras</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {verificaciones.verificaciones_Extras.length > 0 ? (
                verificaciones.verificaciones_Extras.map((data) => (
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
      ) : (
        <DataNotFound>
          <Typography px={2} variant="h5">
            No existen verificaciones Extras
          </Typography>
        </DataNotFound>
      )}
    </Stack>
  );
}

function DocumentacionTipificacion({ eventos }) {
  const [selectedEventTab, setSelectedEventTab] = useState(eventos[0]);
  const handleChangeEvento = (idEvento) => {
    setSelectedEventTab(eventos.find((evento) => evento._id === idEvento));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="div">
        Documentación a presentar y tipificación
      </Typography>
      <Typography variant="subtitle1">
        Para ver la documentación y tipificación de cada evento, presiona el botón{" "}
        <VisibilityIcon sx={{ verticalAlign: "top" }} />
      </Typography>

      <Stack spacing={1}>
        <DocumentationTab eventos={eventos} handleChangeEvento={handleChangeEvento} />
        <SubtipoCard subtipos={selectedEventTab.subtipos_Siniestro} />
      </Stack>
    </Stack>
  );
}
