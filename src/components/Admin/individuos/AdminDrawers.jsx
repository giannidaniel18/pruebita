import React, { useState } from "react";
import { Button, Drawer, Grid, Stack, TextField, Card, Typography, IconButton, Tooltip, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextImputControlSmall from "../../common/TextImputControlSmall";
import ConfirmationAlert from "../../common/ConfirmationAlert";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useConfirmation from "../../../hooks/useConfirmation";
import "./markdown.css";

export function AdminDrawerUpdate({
  drawerVisibleMode,
  onToggleDrawerVisibleMode,
  drawerDataToHandle,
  resetDrawerDataToHandle,
  onPersistData,
  dataType,
}) {
  const { control, handleSubmit, reset } = useForm({});
  const { dataToConfirm, handleConfirmation, resetDataToConfirm } = useConfirmation();

  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
    resetDrawerDataToHandle();
    reset();
  };

  const onSetConfirmation = (data) => {
    handleConfirmation({
      onOpen: true,
      typeConfirm: "Actualizar",
      title: dataType,
      data: data,
    });
  };

  const getConfirmation = (confirmation) => {
    if (confirmation) onSubmit(dataToConfirm.data);
    resetDataToConfirm({});
  };

  const onSubmit = (data) => {
    onPersistData(data);
    reset();
    onToggleDrawerVisibleMode();
    resetDrawerDataToHandle();
  };

  return (
    <Drawer anchor={"right"} open={drawerVisibleMode}>
      <Stack marginTop={10} width={{ xs: "300px", sm: "500px" }}>
        <Button sx={{ alignSelf: "flex-end" }} onClick={CloseDrawer}>
          X
        </Button>

        <Stack p={{ xs: 1, sm: 4 }}>
          <form onSubmit={handleSubmit(onSetConfirmation)}>
            <Grid container alignItems="center" textAlign="end" spacing={2}>
              {drawerDataToHandle.data?.map((dato) => (
                <Grid key={dato.inputName} item xs={12}>
                  <TextImputControlSmall
                    control={control}
                    name={dato.inputName}
                    label={dato.label}
                    defaultValue={dato.valueToUpdate}
                    multiline={dato.multiline}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button sx={{ alignSelf: "flex-end" }} variant="outlined" type="submit">
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Stack>
      {dataToConfirm.onOpen && <ConfirmationAlert {...dataToConfirm} confirmation={getConfirmation} />}
    </Drawer>
  );
}

export function AdminDrawerCreate({
  drawerVisibleMode,
  onToggleDrawerVisibleMode,
  drawerDataToHandle,
  resetDrawerDataToHandle,
  onPersistData,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { evento: "", core: "", accion: "", tipgesdesc: "", resgesdesc: "" },
  });
  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
    resetDrawerDataToHandle({});
  };

  const onSubmit = (data) => {
    onPersistData(data);
    onToggleDrawerVisibleMode();
    reset();
  };

  return (
    <Drawer anchor={"right"} open={drawerVisibleMode}>
      <Stack marginTop={10} width={{ xs: "300px", sm: "500px" }}>
        <Button sx={{ alignSelf: "flex-end" }} onClick={CloseDrawer}>
          X
        </Button>

        <Stack p={{ xs: 1, sm: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center" textAlign="end" spacing={2}>
              {drawerDataToHandle.data?.map((dato) => (
                <Grid key={dato.inputName} item xs={12}>
                  <TextImputControlSmall
                    control={control}
                    name={dato.inputName}
                    label={dato.label}
                    defaultValue={dato.valueToUpdate}
                    multiline={dato.multiline}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button sx={{ alignSelf: "flex-end" }} variant="outlined" type="submit">
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Stack>
    </Drawer>
  );
}

// export function AdminDrawerPlantilla({ drawerVisibleMode, onToggleDrawerVisibleMode, rawContent, UpdateTemplate }) {
//   const [content, setContent] = useState(rawContent);
//   const CloseDrawer = () => {
//     onToggleDrawerVisibleMode();
//   };

//   return (
//     <Drawer anchor={"bottom"} open={drawerVisibleMode}>
//       <Stack width={"100%"} height="80vh" p={2} spacing={2}>
//         <Stack direction="row" justifyContent={"space-between"}>
//           <Stack direction="row" spacing={2}>
//             <Button
//               variant="outlined"
//               disabled={content === rawContent ? true : false}
//               startIcon={<SaveIcon />}
//               onClick={UpdateTemplate}
//             >
//               Guardar
//             </Button>
//           </Stack>
//           <Button variant="outlined" onClick={CloseDrawer}>
//             X
//           </Button>
//         </Stack>
//         <Stack>
//           <TextEditor setContent={setContent} rawContent={rawContent && rawContent} />
//         </Stack>
//       </Stack>
//     </Drawer>
//   );
// }

// export function TextViewerDrawer({ drawerVisibleMode, onToggleDrawerVisibleMode, rawContent = {} }) {
//   const CloseDrawer = () => {
//     onToggleDrawerVisibleMode();
//   };
//   return (
//     <Drawer anchor={"right"} open={drawerVisibleMode}>
//       <Stack width={"70vw"} p={2} mt={9} spacing={2}>
//         <Stack direction="row" justifyContent={"flex-end"}>
//           <Button variant="outlined" onClick={CloseDrawer}>
//             X
//           </Button>
//         </Stack>
//         <TextViewer rawContent={rawContent} />
//       </Stack>
//     </Drawer>
//   );
// }

export function AdminDrawerMarkDown({ drawerVisibleMode, onToggleDrawerVisibleMode, updateFn, plantilla }) {
  const [markdownText, setMarkdownText] = useState(plantilla);

  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
  };
  const handleChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const handleUpdateTemplate = () => {
    updateFn(markdownText);
  };
  return (
    <Drawer anchor={"bottom"} open={drawerVisibleMode}>
      <Stack
        width={"100%"}
        height="80vh"
        p={2}
        spacing={5}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "start" }}
        justifyContent={{ xs: undefined, md: "center" }}
      >
        <Stack direction={{ xs: "row", md: "column" }} alignSelf={{ xs: "end", md: "start" }} spacing={2}>
          <Tooltip title="Cerrar">
            <IconButton color="primary" onClick={CloseDrawer}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Guardar">
            <IconButton color="primary" onClick={handleUpdateTemplate}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Guia MarckDown">
            <IconButton
              href="https://www.markdownguide.org/cheat-sheet"
              target="_blank"
              rel="noreferrer"
              color="primary"
            >
              <MenuBookIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center">
          <Stack>
            <Typography variant="overline">Editor</Typography>
            <TextField
              id="markdownInput"
              label="Creador de plantilla"
              placeholder="Comienza a escribir."
              value={markdownText}
              rows={15}
              multiline
              sx={{ minWidth: { xs: "300px", sm: "400px", md: "400px", xl: "600px" } }}
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Typography variant="overline">Previsualización</Typography>
            <Box className="markdownContainer">
              <Card
                sx={{
                  paddingX: 2,
                  maxHeight: { xs: "400px", md: "600px" },
                  minHeight: { md: "380px" },
                  display: "inline-block",
                  overflowWrap: "break-word",
                  minWidth: { xs: "300px", sm: "400px", md: "400px", xl: "600px" },
                  maxWidth: { xs: "300px", sm: "400px", md: "400px", xl: "600px" },
                  overflowX: { xs: "scroll", md: "auto" },
                  overflowY: { xs: "scroll", md: "auto" },
                }}
              >
                <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
              </Card>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
}

export function ViewerDrawerMarkDown({ drawerVisibleMode, onToggleDrawerVisibleMode, markdownText }) {
  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
  };

  return (
    <Drawer anchor={"bottom"} open={drawerVisibleMode}>
      <Stack
        width={"100%"}
        height="80vh"
        p={2}
        justifyContent="space-evenly"
        spacing={2}
        direction="row"
        alignItems={"flex-start"}
      >
        <Tooltip title="Cerrar">
          <IconButton color="primary" onClick={CloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Card className="markdownContainer" sx={{ width: "80%", paddingX: 2, minHeight: "380px" }}>
          <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
        </Card>
      </Stack>
    </Drawer>
  );
}
