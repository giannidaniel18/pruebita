import { useParams } from "react-router-dom";
import { useGetCurrentBranch } from "../../../hooks/useGetters";
import LoaderBasic from "../../../components/common/LoaderBasic";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import AbmRamoSeleccionado from "../../../components/Admin/individuos/abmRamoSeleccionado/AbmRamoSeleccionado";

export default function AbmRamoSeleccionadoContainer() {
  const { selectedbranch } = useParams();
  const { loading, currentBranch } = useGetCurrentBranch(selectedbranch);

  return loading ? (
    <LoaderBasic />
  ) : (
    <ErrorBoundary>
      <AbmRamoSeleccionado branch={currentBranch} />
    </ErrorBoundary>
  );
}
