import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRamos, addRamo } from "../../../services/ramos";
import TextImputControlSmall from "../../../components/common/TextImputControlSmall";
import TableAbmRamos from "../../../components/Admin/individuos/TableAbmRamos";
import LoaderBasic from "../../../components/common/LoaderBasic";
import SnackBar from "../../../components/common/SnackBar";

export default function AbmRamosGeneralContainer() {
  const [ramos, setRamos] = useState([]);
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, resetField } = useForm();

  const onSubmit = (data) => {
    const newBranch = { titulo: data.titulo_ramo };
    addRamo(newBranch).then((nuevoRamo) => {
      if (nuevoRamo.status === 404) {
        setRequestStatus({ responseStatus: "error", text: nuevoRamo.data.message, status: true });
      } else {
        setRequestStatus({
          responseStatus: "success",
          text: `Agregado exitosamente el Ramo : ${nuevoRamo.data.titulo}`,
          status: true,
        });

        updateRamos();
      }
    });
    resetField("titulo_ramo");
  };

  const updateRamos = () => {
    getRamos().then((ramos) => {
      setRamos(ramos);
      setLoading(false);
    });
  };

  useEffect(() => {
    updateRamos();
  }, []);

  return (
    <Stack spacing={4}>
      {loading ? (
        <LoaderBasic />
      ) : (
        <>
          <TableAbmRamos branches={ramos} updateRamos={updateRamos} />
          <Stack spacing={1}>
            <Typography variant="h6"> Agrega un nuevo ramo</Typography>
            <Paper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems="center" textAlign="end" p={2}>
                  <Grid item xs={12} sm={7}>
                    <TextImputControlSmall control={control} name="titulo_ramo" label="Nombre del ramo a crear" />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Button variant="outlined" type="submit">
                      Agregar +
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Stack>
        </>
      )}
      {requestStatus.status && (
        <SnackBar
          title={requestStatus.text}
          severity={requestStatus.responseStatus}
          status={requestStatus.status}
          time={new Date()}
        />
      )}
    </Stack>
  );
}
