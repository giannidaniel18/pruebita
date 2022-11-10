import UpdateBranchCard from "../../../components/Admin/individuos/UpdateBranchCard";
import { useParams } from "react-router-dom";

import { useSelectedRamo } from "../../../hooks/useSelectedRamo";
import { useEffect, useState } from "react";
import { getBranch } from "../../../services/ramos";
import { useCurrentBranchContext } from "../../../context/CurrentBranchContext";
import LoaderBasic from "../../../components/common/LoaderBasic";

export default function AbmRamoSeleccionadoContainer() {
  const { selectedbranch } = useParams();
  const [loading, setLoading] = useState(true);

  const { currentBranch, setUpCurrentBranch } = useCurrentBranchContext();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranch(selectedbranch);
      setUpCurrentBranch(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [selectedbranch]);

  return loading ? <LoaderBasic /> : <UpdateBranchCard branch={currentBranch} />;
}
