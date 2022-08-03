import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import { useTheme } from "@emotion/react";
import {
  Card,
  CardContent,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import TipificationTable from "./TipíficationTable";

export default function DocumentationTab({ doc }) {
  const [value, setValue] = React.useState(doc[0].siniestro);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const DocumentationCard = ({ subtipo }) => {
    const theme = useTheme();
    return (
      <Stack spacing={2}>
        {subtipo.map((data, index) => (
          <Card
            key={index}
            sx={
              theme.palette.mode === "dark"
                ? { border: 0.5, borderColor: "#1B2430" }
                : { border: 0.5, borderColor: "#d3d5df" }
            }
          >
            <CardContent>
              <Box
                sx={
                  theme.palette.mode === "dark"
                    ? {
                        backgroundColor: "#1B2430",
                        padding: "10px",
                        borderRadius: "10px",
                      }
                    : {
                        backgroundColor: "#d3d5df ",
                        padding: "10px",
                        borderRadius: "10px",
                      }
                }
              >
                <Typography>{data.description}</Typography>
              </Box>
              <List>
                {data &&
                  data.documentacion.map((doc, index) => (
                    <ListItemText key={index}>
                      <Box display="flex" spacing={2}>
                        <NoiseControlOffIcon color="primary" fontSize="xs" />
                        <Typography>{doc}</Typography>
                      </Box>
                    </ListItemText>
                  ))}
              </List>
              <TipificationTable tipificaciones={data.tipificacion} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {doc &&
              doc.map((data, index) => (
                <Tab
                  key={index}
                  label={data.siniestro}
                  value={data.siniestro}
                />
              ))}
          </TabList>
        </Box>
        {doc &&
          doc.map((data, index) => (
            <TabPanel key={index} value={data.siniestro}>
              <DocumentationCard subtipo={data.subtipo} />
            </TabPanel>
          ))}
      </TabContext>
    </Box>
  );
}
