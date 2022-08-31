import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import BranchCard from "../../components/BranchCard";
import { branch } from "../../data";
import { useParams } from "react-router-dom";
import { useBranchContext } from "../../context/BranchContext";

export default function BranchContainer() {
  const ramos = branch;
  const { currentBranch, setUpCurrentBranch } = useBranchContext();
  const [loading, setLoading] = useState(true);
  const { selectedbranch } = useParams();

  useEffect(() => {
    const newbranch = ramos.find((ramo) => ramo._id === selectedbranch);
    setUpCurrentBranch(newbranch);
    setLoading(false);
  }, [selectedbranch, ramos, setUpCurrentBranch]);

  return !loading ? (
    <BranchCard branch={currentBranch} />
  ) : (
    <div>cargando...</div>
  );
}
