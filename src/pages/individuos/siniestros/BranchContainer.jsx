import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BranchCard from "../../../components/siniestros/BranchCard";
import { useBranchContext } from "../../../context/BranchContext";

export default function BranchContainer() {
  const { currentBranch, setUpCurrentBranch } = useBranchContext();
  const [loading, setLoading] = useState(true);
  const { selectedbranch } = useParams();
  console.log(currentBranch);
  useEffect(() => {
    setUpCurrentBranch(selectedbranch);
    setLoading(false);
  }, [selectedbranch, setUpCurrentBranch, currentBranch]);

  return !loading ? <BranchCard branch={currentBranch} /> : <div>cargando...</div>;
}
