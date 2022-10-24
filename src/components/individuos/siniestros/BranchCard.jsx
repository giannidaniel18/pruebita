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
  Chip,
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
import NewInfoBadge from "../../common/NewInfoChip";
import NewInfoChip from "../../common/NewInfoChip";

export default function BranchCard({ branch }) {
  const [selectedTutoria, setSelectedTutoria] = useState(null);
  const updateText = `Ultima actualizacion :  ${format(parseISO(branch.updatedAt), "dd/MM/yyyy")} por ${
    branch.updatedBy
  }`;

  const handleSelectedTutoria = (e) => {
    e.target.getAttribute("id-tutoria") === selectedTutoria?.id
      ? setSelectedTutoria(null)
      : setSelectedTutoria(branch.tutorias.find((tutoria) => tutoria.id === e.target.getAttribute("id-tutoria")));
  };

  return (
    <Stack spacing={6} mt={{ xs: 2, sm: 0 }} alignItems={{ xs: "center", sm: "flex-start" }}>
      <CustomAlert type={"info"}>{updateText}</CustomAlert>
      <Stack spacing={2} width="100%">
        <Typography variant="h2">{branch.titulo}</Typography>

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
                  key={tutoria.id}
                  variant={selectedTutoria?.id === tutoria.id ? "contained" : "text"}
                  id-tutoria={tutoria.id}
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
      {verificaciones.verificacionesCriticas.length ? (
        <CustomAlert type={"hint"}>
          <Typography variant="h4">
            Verificaciones criticas <NewInfoChip array={verificaciones.verificacionesCriticas} />
          </Typography>

          <Typography variant="subtitle1">Corroborar con el cliente en linea la siguiente información.</Typography>
          <Divider />
          <List dense>
            {verificaciones.verificacionesCriticas.map((data) => (
              <Stack key={data.id}>
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
      {verificaciones.verificacionesExtras.length ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h4">Verificaciones extras</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {verificaciones.verificacionesExtras.length > 0 ? (
                verificaciones.verificacionesExtras.map((data) => (
                  <ListItem key={data.id} disablePadding>
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
    setSelectedEventTab(eventos.find((evento) => evento.id === idEvento));
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
        {!selectedEventTab.subtiposSiniestro.length ? (
          <DataNotFound>
            <Typography px={2} variant="body">
              No existen subtipos creados para el Evento actual, ponete en contacto con mejora continua para nutrir de
              información esta sección
            </Typography>
          </DataNotFound>
        ) : (
          <SubtipoCard subtipos={selectedEventTab.subtiposSiniestro} />
        )}
      </Stack>
    </Stack>
  );
}
