import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentBranch } from "hooks/useGetters";
import LoaderBasic from "components/common/LoaderBasic";
import ErrorBoundary from "components/common/ErrorBoundary";
import AbmRamoSeleccionado from "components/Admin/individuos/abmRamoSeleccionado/AbmRamoSeleccionado";
import DataNotFound from "components/common/DataNotFound";
import { Button, Stack, Typography } from "@mui/material";

export default function AbmRamoSeleccionadoContainer() {
  const { selectedbranch } = useParams();
  const { loading, currentBranch } = useGetCurrentBranch(selectedbranch);

  const navigate = useNavigate();

  return loading ? (
    <LoaderBasic />
  ) : (
    <ErrorBoundary>
      {Object.keys(currentBranch).length ? (
        <AbmRamoSeleccionado branch={currentBranch} />
      ) : (
        <DataNotFound>
          <Stack spacing={5}>
            <Typography px={2} variant="h5">
              Ups! aparentemente ya no existe el ramo que acabas de seleccionar
            </Typography>
            <Button onClick={() => navigate(-1)} variant="contained" sx={{ width: "150px" }}>
              Volver atras
            </Button>
          </Stack>
        </DataNotFound>
      )}
    </ErrorBoundary>
  );
}
