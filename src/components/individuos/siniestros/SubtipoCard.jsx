//REACT and Func
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { ColorsPalette } from "config/ColorsPalette";
//UI LIBRARY COMPONENTS
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemText,
  Stack,
  Typography,
  Box,
  Button,
  CardActions,
  Divider,
} from "@mui/material";
//CUSTOM COMPONENTS
import TipificationTable from "./TipíficationTable";
import { ViewerDrawerMarkDown } from "components/Admin/individuos/AdminDrawers";
import DataNotFound from "components/common/DataNotFound";
import NewInfoBadge from "components/common/NewInfoBadge";
//ICONS
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import DownloadIcon from "@mui/icons-material/Download";

export default function SubtipoCard({ subtipos }) {
  const [selectedSubtipo, setSelectedSubtipo] = useState(null);

  const handleSelectedSubtipo = (e) => {
    selectedSubtipo === e.currentTarget.id ? setSelectedSubtipo(null) : setSelectedSubtipo(e.currentTarget.id);
  };

  return (
    <Stack spacing={1}>
      {subtipos.map((subtipo) => (
        <Card key={subtipo.id} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Button
            color={subtipo.id === selectedSubtipo ? "primary" : "inherit"}
            size="small"
            id={subtipo.id}
            onClick={handleSelectedSubtipo}
            fullWidth
            sx={{ justifyContent: "space-between", alignItems: "end", borderRadius: 2, padding: 1.5 }}
          >
            <Typography variant="overline" fontSize={14}>
              <NewInfoBadge array={subtipo.documentacion && [...subtipo.documentacion, ...subtipo.tipificacion]}>
                Evento {subtipo.titulo}
              </NewInfoBadge>
            </Typography>
            <Box>{subtipo.id === selectedSubtipo ? <VisibilityIcon /> : <VisibilityOffIcon />}</Box>
          </Button>
          {subtipo.id === selectedSubtipo && <DocAndTipCard subtipo={subtipo} />}
        </Card>
      ))}
    </Stack>
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
      {!subtipo.documentacion ? (
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
      {!subtipo.tipificacion ? (
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
      )}
    </Stack>
  );
}
