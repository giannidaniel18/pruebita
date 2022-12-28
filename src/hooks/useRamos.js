import { useEffect, useState } from "react";

import useFetch from "./useFetch";

export function useRamos() {
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const { startRequest, requestStatus } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await startRequest("get", "/api/ramos", "", false);

      setBranches(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const createRamo = async (newRamo) => {
    const apiResponse = await startRequest("post", "/api/ramos", newRamo, true);
    // const createdRamo = { ramo: apiResponse.obj.id };
    // await startRequest("post", "/api/verificacion", createdRamo, false);
    await setBranches([...branches, apiResponse.obj]);
  };

  const updateStatusRamo = async (idRamo, newState) => {
    const apiResponse = await startRequest("put", "/api/ramos/" + idRamo, newState, true);
    const newBranches = branches;
    const indexBranch = branches.findIndex((branch) => branch.id === idRamo);
    newBranches[indexBranch] = apiResponse.obj;
    return apiResponse;
  };

  return { loading, branches, createRamo, requestStatus, updateStatusRamo };
}
