import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Card, Stack, Typography } from "@mui/material";
import TipificationTable from "../../../siniestros/TipíficationTable";

export default function UpdateEventos({ eventos }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Eventos creados actualmente </Typography>
      <Stack>
        {eventos.map((evento) => (
          <Accordion key={evento._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${evento.id}-content`}
              id={`${evento.id}-header`}
            >
              <Typography>{evento.siniestro}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {evento.subtipos_Siniestro.map((subtipo) => (
                  <Card key={subtipo._id}>
                    <Typography>{subtipo.descripcion}</Typography>

                    <TipificationTable tipificaciones={subtipo.tipificacion} />
                  </Card>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
}
