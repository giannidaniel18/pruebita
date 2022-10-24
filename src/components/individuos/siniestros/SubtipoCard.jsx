import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItemText,
  Stack,
  Typography,
  Box,
  Button,
  CardActions,
  Divider,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import DownloadIcon from "@mui/icons-material/Download";
import TipificationTable from "./TipíficationTable";
import { styled, useTheme } from "@mui/material/styles";
import { ColorsPalette } from "../../../config/ColorsPalette";
import ReactMarkdown from "react-markdown";
import DataNotFound from "../../common/DataNotFound";
import remarkGfm from "remark-gfm";
import { ViewerDrawerMarkDown } from "../../Admin/individuos/AdminDrawers";

export default function SubtipoCard({ subtipos }) {
  const [selectedSubtipo, setSelectedSubtipo] = useState(null);

  const handleSelectedSubtipo = (e) => {
    selectedSubtipo === e.currentTarget.id ? setSelectedSubtipo(null) : setSelectedSubtipo(e.currentTarget.id);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={0.5}>
          {subtipos.map((subtipo) => (
            <Stack key={subtipo.id} sx={{ boxShadow: 2, borderRadius: 2 }}>
              <Stack direction={"row"} justifyContent="space-between" alignItems={"center"} py={0.5} px={1}>
                <Typography variant="overline" fontSize={14}>
                  Evento {subtipo.titulo}
                </Typography>
                <IconButton size="small" id={subtipo.id} onClick={handleSelectedSubtipo}>
                  {subtipo.id === selectedSubtipo ? <VisibilityIcon color="primary" /> : <VisibilityOffIcon />}
                </IconButton>
              </Stack>
              {subtipo.id === selectedSubtipo && <DocAndTipCard subtipo={subtipo} />}
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function DocAndTipCard({ subtipo }) {
  const theme = useTheme();
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);

  const CustomCardHeader = styled(CardHeader)({
    backgroundColor: theme.palette.mode === "dark" ? ColorsPalette.bg_dark.dark : theme.palette.secondary.dark[100],
    color: theme.palette.mode === "dark" ? undefined : "white",
  });

  const CustomCard = styled(Card)(
    theme.palette.mode === "dark" ? { border: "1px solid", borderColor: theme.palette.secondary.dark[400] } : {},
    {
      borderRadius: 10,
    }
  );

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };

  return (
    <Stack p={1} spacing={2}>
      <Divider />

      {!subtipo.documentacion.length ? (
        <DataNotFound>
          <Stack>
            <Typography px={2} variant="h5">
              No existe documentación para el subtipo actual
            </Typography>
          </Stack>
        </DataNotFound>
      ) : (
        <CustomCard>
          <CustomCardHeader title="Documentacion a presentar" titleTypographyProps={{ variant: "h6" }} />
          <CardContent>
            <List>
              {subtipo.documentacion.map((doc) => (
                <ListItemText key={doc.id}>
                  <Box display="flex" spacing={2}>
                    <NoiseControlOffIcon color="primary" fontSize="small" />
                    <Typography variant="body2">{doc.titulo}</Typography>
                  </Box>
                </ListItemText>
              ))}
            </List>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button size="small" onClick={onToggleDrawerVisibleMode}>
              Plantilla eMail
              <DownloadIcon fontSize="small" />
            </Button>
          </CardActions>
        </CustomCard>
      )}
      {!subtipo.tipificacion.length ? (
        <DataNotFound>
          <Stack>
            <Typography px={2} variant="h5">
              No existen tipificaciones para el subtipo actual
            </Typography>
          </Stack>
        </DataNotFound>
      ) : (
        <CustomCard>
          <CustomCardHeader title="Tipificaciones" titleTypographyProps={{ variant: "h6" }} />
          <CardContent>
            <TipificationTable tipificaciones={subtipo.tipificacion} />
          </CardContent>
        </CustomCard>
      )}

      {drawerVisibleMode && (
        <ViewerDrawerMarkDown
          markdownText={subtipo.plantilla}
          drawerVisibleMode={drawerVisibleMode}
          onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        />
        // <TextViewerDrawer
        //   rawContent={subtipo.plantilla.contenido}
        //   drawerVisibleMode={drawerVisibleMode}
        //   onToggleDrawerVisibleMode={onToggleDrawerVisibleMode}
        // />
      )}
    </Stack>
  );
}
