import { useEffect, useState } from "react";
import { addBranch, deleteBranch, getBranches, updateBranch, startUpVerificacion } from "../services/ramosService";

export function useRamos() {
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranches();
      setBranches(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const createRamo = async (newRamo) => {
    setRequestStatus({});
    const apiResponse = await addBranch(newRamo);

    if (apiResponse.status === 201) {
      const setUpVerif = await startUpVerificacion(apiResponse.data.obj.id);
      if (setUpVerif.status === 201) {
        setRequestStatus({
          responseStatus: "success",
          text: apiResponse.data.message,
          status: true,
        });
        setBranches([...branches, apiResponse.data.obj]);
      }
    } else {
      setRequestStatus({ responseStatus: "error", text: apiResponse.data.message, status: true });
    }
  };

  const updateRamo = async (idRamo, updatedRamo) => {
    setRequestStatus({});
    const apiResponse = await updateBranch(idRamo, updatedRamo);
    if (apiResponse.status === 200) {
      setRequestStatus({ responseStatus: "success", text: apiResponse.data.message, status: true });
      const newBranches = branches;
      const indexBranch = branches.findIndex((branch) => branch.id === idRamo);
      newBranches[indexBranch] = apiResponse.data.obj;
      setBranches(newBranches);
    } else {
      setRequestStatus({ responseStatus: "error", text: apiResponse.data.message, status: true });
    }
  };

  const deleteRamo = async (idBranch) => {
    setRequestStatus({});
    const apiResponse = await deleteBranch(idBranch);
    if (apiResponse.status === 200) {
      setRequestStatus({ responseStatus: "success", text: apiResponse.data.message, status: true });
      setBranches(branches.filter((branch) => branch.id !== idBranch));
    } else {
      setRequestStatus({ responseStatus: "error", text: apiResponse.data.message, status: true });
    }
  };

  const updateStatusRamo = async (idRamo, newState) => {
    setRequestStatus({});
    const apiResponse = await updateBranch(idRamo, newState);

    if (apiResponse.status === 200) {
      setRequestStatus({ responseStatus: "success", text: apiResponse.data.message, status: true });
      const newBranches = branches;
      const indexBranch = branches.findIndex((branch) => branch.id === idRamo);
      newBranches[indexBranch] = apiResponse.data.obj;
      setBranches(newBranches);
    } else {
      setRequestStatus({ responseStatus: "error", text: "Error al actualizar el estado del ramo", status: true });
    }

    return apiResponse;
  };

  return { loading, branches, createRamo, requestStatus, updateRamo, deleteRamo, updateStatusRamo };
}
