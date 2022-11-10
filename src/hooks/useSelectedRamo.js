import { useEffect, useState } from "react";
import { getBranch } from "../services/ramos";
import { useCurrentBranchContext } from "../context/CurrentBranchContext";

export function useSelectedRamo(id) {
  const [loading, setLoading] = useState(true);
  const { currentBranch, setCurrentBranch } = useCurrentBranchContext();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranch(id);
      setCurrentBranch(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [id, setCurrentBranch]);

  return { loading, currentBranch };
}
