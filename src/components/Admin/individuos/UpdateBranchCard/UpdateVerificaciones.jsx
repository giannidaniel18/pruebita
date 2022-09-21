import { useState } from "react";
import {
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextImputControlSmall from "../../../../components/TextImputControlSmall";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useForm } from "react-hook-form";
import { useBranchContext } from "../../../../context/BranchContext";
import DataNotFound from "../../../DataNotFound";

export default function UpdateVerificaciones({ verificaciones, tipoVerificacion, title }) {
  const { control, handleSubmit, resetField } = useForm();
  const { addVerificacionToBranch } = useBranchContext();

  const arrayVerificaciones =
    tipoVerificacion === "Critica" ? verificaciones.verificaciones_Criticas : verificaciones.verificaciones_Extras;

  const onSubmit = (data) => {
    resetField("titulo_Verificacion_" + tipoVerificacion);
    resetField("descripcion_Verificacion_" + tipoVerificacion);
    handleAddVerifCritica(data);
  };

  const handleAddVerifCritica = (data) => {
    addVerificacionToBranch(data, tipoVerificacion);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        {arrayVerificaciones.length ? (
          <>
            <Typography variant="h6">{title}</Typography>
            <TableVerificaciones verificaciones={arrayVerificaciones} tipoVerificacion={tipoVerificacion} />
          </>
        ) : (
          <DataNotFound>
            <Stack>
              <Typography px={2} variant="h5">
                No existen tipificaciones del tipo " {tipoVerificacion} " creadas para el ramo actual.
              </Typography>
              <Typography px={2} py={1} variant="h6">
                Crea la primera aqui!
              </Typography>
            </Stack>
          </DataNotFound>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" mb={2}>
            + Verificación {tipoVerificacion}
          </Typography>
          <Grid container alignItems="center" textAlign="end" spacing={2}>
            <Grid item xs={12} md={5}>
              <TextImputControlSmall
                control={control}
                name={"titulo_Verificacion_" + tipoVerificacion}
                label={"Titulo de la verificación " + tipoVerificacion}
                multiline={true}
                multilineRow={3}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextImputControlSmall
                control={control}
                name={"descripcion_Verificacion_" + tipoVerificacion}
                label={"Detalle de la verificación " + tipoVerificacion}
                multiline={true}
                multilineRow={3}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" type="submit">
                Agregar +
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Stack>
  );
}

function TableVerificaciones({ verificaciones, tipoVerificacion }) {
  const [updateMode, setUpdateMode] = useState(false);
  const [verifToUpdate, setVerifToUpdate] = useState({});
  const { deleteVerificacionFromBranch, updateVerificacionFromBranch } = useBranchContext();

  const deleteVerif = (e) => {
    deleteVerificacionFromBranch(e.currentTarget.id, tipoVerificacion);
  };

  const updateVerif = (updatedVerif) => {
    updateVerificacionFromBranch(updatedVerif, tipoVerificacion);
  };

  const handleUpdateModeOn = (e) => {
    setUpdateMode(true);
    setVerifToUpdate({
      id: e.currentTarget.id,
      title_verif: e.currentTarget.getAttribute("title_verif"),
      descrip_verif: e.currentTarget.getAttribute("descrip_verif"),
    });
  };

  const onClose = () => {
    setUpdateMode(false);
  };

  return (
    <Stack>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Titulo verificación</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="right">Actualizar</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verificaciones.map((row) => (
              <TableRow key={row._id}>
                <TableCell scope="row">{row.titulo}</TableCell>
                <TableCell align="left">{row.descripcion}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={handleUpdateModeOn}
                    id={row._id}
                    title_verif={row.titulo}
                    descrip_verif={row.descripcion}
                  >
                    <ModeEditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={deleteVerif} id={row._id}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminDrawerVerificaciones
        updateMode={updateMode} // Abrir el drawer y setear el objeto a modificar
        onClose={onClose} // cerrar el Drawer
        verifToUpdate={verifToUpdate} //objeto a actualizar
        tipoVerificacion={tipoVerificacion} // Critica o Extra
        updateVerif={updateVerif} // metodo que retorna con el objeto actualizado
      />
    </Stack>
  );
}

function AdminDrawerVerificaciones({ updateMode, onClose, tipoVerificacion, verifToUpdate, updateVerif }) {
  const { control, handleSubmit } = useForm();
  const { title_verif, descrip_verif, id } = verifToUpdate;
  const CloseDrawer = () => {
    onClose(false);
  };

  const onSubmit = (data) => {
    updateVerif({ ...data, id });
  };

  return (
    <Drawer anchor={"right"} open={updateMode}>
      <Stack marginTop={10} width={{ xs: "300px", sm: "500px" }}>
        <Button sx={{ alignSelf: "flex-end" }} onClick={CloseDrawer}>
          X
        </Button>

        <Stack p={{ xs: 1, sm: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center" textAlign="end" spacing={2}>
              <Grid item xs={12}>
                <TextImputControlSmall
                  control={control}
                  name={"titulo_Verificacion_" + tipoVerificacion}
                  label={"Titulo de la verificación " + tipoVerificacion}
                  defaultValue={title_verif}
                  multiline={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextImputControlSmall
                  control={control}
                  name={"descripcion_Verificacion_" + tipoVerificacion}
                  label={"Detalle de la verificación " + tipoVerificacion}
                  defaultValue={descrip_verif}
                  multiline={true}
                  focused={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Button sx={{ alignSelf: "flex-end" }} variant="outlined" type="submit" onClick={CloseDrawer}>
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Stack>
    </Drawer>
  );
}
