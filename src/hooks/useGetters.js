import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export function useGetCurrentBranch(idRamo) {
  const [loading, setLoading] = useState(true);
  const [currentBranch, setCurrentBranch] = useState({});
  const { startRequest } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", `/api/ramos/${idRamo}`, "", false);
      if (apiResponse.ok) {
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
