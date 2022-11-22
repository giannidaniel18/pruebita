import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BranchCard from "../../../components/individuos/siniestros/BranchCard";
import { useCurrentBranchContext } from "../../../context/CurrentBranchContext";
import { getBranch } from "../../../services/ramosService";

export default function BranchContainer() {
  const [loading, setLoading] = useState(true);
  const { selectedbranch } = useParams();
  const { currentBranch, setUpCurrentBranch } = useCurrentBranchContext();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranch(selectedbranch);
      setUpCurrentBranch(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [selectedbranch]);

  return !loading ? <BranchCard branch={currentBranch} /> : <div>cargando...</div>;
}
