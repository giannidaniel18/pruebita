import { useEffect, useState } from "react";
import UpdateBranchCard from "../../../components/Admin/individuos/UpdateBranchCard";
import { useParams } from "react-router-dom";
import { useBranchContext } from "../../../context/BranchContext";

export default function AbmRamoSeleccionadoContainer() {
  const { currentBranch, setUpCurrentBranch } = useBranchContext();
  const [loading, setLoading] = useState(true);
  const { selectedbranch } = useParams();

  useEffect(() => {
    setUpCurrentBranch(selectedbranch);
    setLoading(false);
  }, [currentBranch, selectedbranch, setUpCurrentBranch]);

  return loading ? <div>cargando...</div> : <UpdateBranchCard branch={currentBranch} />;
}
