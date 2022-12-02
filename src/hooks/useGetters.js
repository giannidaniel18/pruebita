import { useEffect, useState } from "react";
import { getBranch } from "../services/ramosService";

export function useGetCurrentBranch(idRamo) {
  const [loading, setLoading] = useState(true);
  const [currentBranch, setCurrentBranch] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranch(idRamo);
      if (apiResponse.status === 200) {
        setCurrentBranch(apiResponse.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [idRamo]);

  return { loading, currentBranch };
}

export function useGetBranches() {
  return {};
}
