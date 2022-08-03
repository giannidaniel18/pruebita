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
import { ColorsPalette } from "../config/ColorsPalette";

export default function BranchCard({ branch }) {
  const theme = useTheme();
  function MainInfo() {
    return (
      <Card
        sx={{
          minWidth: 275,
          width: "100%",
        }}
      >
        <CardContent>
          <Stack
            display={"flex"}
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="h3" component="div">
              {branch.text_branch}
            </Typography>
          </Stack>
          <Divider />
          <Alert sx={{ marginTop: 2 }} variant="outlined" severity="error">
            <AlertTitle>Verificaciones Criticas!</AlertTitle>
            <List dense>
              {branch.data.verificaciones_criticas.length > 0 ? (
                branch.data.verificaciones_criticas.map((data) => (
                  <ListItem key={data.title} disablePadding>
                    <ListItemText
                      sx={{ marginY: 0 }}
                      primary={
                        <Typography sx={{ display: "inline" }} variant="h6">
                          {data.title} : {""}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {data.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Box>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum sequi rerum similique neque ipsa commodi nulla sit a
                  necessitatibus unde alias voluptas accusantium sunt ab, harum
                  cupiditate quaerat odio quibusdam Vitae minus excepturi fugit
                  earum veniam. Modi ex vel nesciunt Inventore possimus
                  voluptatem, voluptatibus beatae officia quas accusamus hic,
                  iste ipsa voluptates dicta architecto necessitatibus Ab, qui.
                  Quos, asperiores placeat. Voluptate commodi consequuntur et
                  maiores adipisci, nostrum quibusdam ipsa hic ad maxime, ipsam
                  cumque. Amet consectetur asperiores ea corrupti nihil sapiente
                  eius beatae rerum, ullam sunt vel qui assumenda poro
                </Box>
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
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Información extra</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <Button size="small">Registrar Siniestro</Button>
          <Button size="small">No contempla cobertura</Button>
        </CardActions>
      </Card>
    );
  }

  function Documentation() {
    return (
      <Card
        sx={{
          minWidth: 275,
          width: "100%",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Documentación a presentar según siniestro
          </Typography>
        </CardContent>
        <CardActions>
          {/* si el array de documentacion esta vacio renderizo un texto con "falta de informacion" */}
          {branch.documentacion.length > 0 ? (
            <DocumentationTab doc={branch.documentacion} />
          ) : (
            <Card
              sx={
                (theme.palette.mode === "dark"
                  ? { border: 0.5, borderColor: "#1B2430" }
                  : { border: 0.5, borderColor: "#d3d5df" },
                { width: "100%", padding: "10px" })
              }
            >
              <Typography>información Faltante</Typography>
            </Card>
          )}
        </CardActions>
      </Card>
    );
  }

  return (
    <Stack spacing={4}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Actualizado por ultima vez hace X : XX dias
      </Typography>
      <Stack spacing={4} sx={{ width: { xs: 300, sm: "auto" } }}>
        <MainInfo />
        <Documentation />
      </Stack>
    </Stack>
  );
}
