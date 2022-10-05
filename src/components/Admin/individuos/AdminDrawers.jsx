import { Button, Drawer, Grid, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import TextImputControlSmall from "../../common/TextImputControlSmall";

export function AdminDrawerUpdate({
  drawerVisibleMode,
  onToggleDrawerVisibleMode,
  drawerDataToHandle,
  resetDrawerDataToHandle,
  onPersistData,
}) {
  const { control, handleSubmit, reset } = useForm({});
  const CloseDrawer = () => {
    onToggleDrawerVisibleMode();
    resetDrawerDataToHandle();
    reset();
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
