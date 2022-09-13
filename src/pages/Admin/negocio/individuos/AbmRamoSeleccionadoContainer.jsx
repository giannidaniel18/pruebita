import { useEffect, useState } from "react";
import UpdateBranchCard from "../../../../components/Admin/individuos/UpdateBranchCard";
import { useParams } from "react-router-dom";
import { useBranchContext } from "../../../../context/BranchContext";

export default function AbmRamoSeleccionadoContainer() {
  const { currentBranch, setUpCurrentBranch, branches } = useBranchContext();
  const [loading, setLoading] = useState(true);
  const { selectedbranch } = useParams();

  useEffect(() => {
    const newbranch = branches.find((ramo) => ramo._id === selectedbranch);
    setUpCurrentBranch(newbranch);
    setLoading(false);
  }, [selectedbranch, branches, setUpCurrentBranch]);

  return !loading ? (
    <UpdateBranchCard branch={currentBranch} />
  ) : (
    <div>cargando...</div>
  );
}
