import { useEffect, useState } from "react";
import { getBranch } from "../services/ramosService";

export function useGetCurrentBranch(idRamo) {
  const [loading, setLoading] = useState(true);
  const [currentBranch, setCurrentBranch] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranch(idRamo);
      setCurrentBranch(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  return { loading, currentBranch };
}

export function useGetBranches() {
  return {};
}
