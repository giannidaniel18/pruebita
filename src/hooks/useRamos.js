import { useCallback, useEffect, useState } from "react";
import { addBranch, deleteBranch, getBranches, updateBranch } from "../services/ramos";
import { useBranchContext } from "../context/BranchContext";
import { branchesArray } from "../data";

export function useRamos() {
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const { branches, setBranches } = useBranchContext();

  const getRamos = () => {
    getBranches().then((branches) => {
      setBranches(branches);
      setLoading(false);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await getBranches();
      setBranches(apiResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  const createRamo = (newRamo) => {
    setRequestStatus({});
    addBranch(newRamo).then((nuevoRamo) => {
      if (nuevoRamo.status === 201) {
        setRequestStatus({
          responseStatus: "success",
          text: `Agregado exitosamente el Ramo : ${nuevoRamo.data.titulo}`,
          status: true,
        });
        getRamos();
      } else {
        setRequestStatus({ responseStatus: "error", text: nuevoRamo.data.message, status: true });
      }
    });
  };

  const updateRamo = (idRamo, updatedRamo) => {
    setRequestStatus({});
    updateBranch(idRamo, updatedRamo).then((resp) => {
      if (resp.data.statusCode === 200) {
        setRequestStatus({ responseStatus: "success", text: resp.data.message, status: true });
        getRamos();
      } else {
        setRequestStatus({ responseStatus: "error", text: "Error al actualizar el nombre del ramo", status: true });
      }
    });
  };

  const deleteRamo = (idBranch) => {
    setRequestStatus({});
    deleteBranch(idBranch).then((resp) => {
      setRequestStatus({ responseStatus: "success", text: resp.data.message, status: true });
      getRamos();
    });
  };

  const updateStatusRamo = (branchId, newState) => {
    setRequestStatus({});
    const newStatusRamo = updateBranch(branchId, newState).then((resp) => {
      if (resp.data.statusCode === 200) {
        setRequestStatus({ responseStatus: "success", text: resp.data.message, status: true });
        getRamos();
      } else {
        setRequestStatus({ responseStatus: "error", text: "Error al actualizar el estado del ramo", status: true });
      }
    });
    return newStatusRamo;
  };

  return { loading, branches, getRamos, createRamo, requestStatus, updateRamo, deleteRamo, updateStatusRamo };
}
