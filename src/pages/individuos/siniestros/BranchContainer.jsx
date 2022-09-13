import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BranchCard from "../../../components/siniestros/BranchCard";
import { useBranchContext } from "../../../context/BranchContext";

export default function BranchContainer() {
  const { currentBranch, setUpCurrentBranch, branches } = useBranchContext();
  const [loading, setLoading] = useState(true);
  const { selectedbranch } = useParams();

  useEffect(() => {
    const newbranch = branches.find((ramo) => ramo._id === selectedbranch);
    setUpCurrentBranch(newbranch);
    setLoading(false);
  }, [selectedbranch, branches, setUpCurrentBranch]);

  return !loading ? <BranchCard branch={currentBranch} /> : <div>cargando...</div>;
}
