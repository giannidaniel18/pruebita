import { useEffect, useState } from "react";
import { addBranch, deleteBranch, getBranches, updateBranch, startUpVerificacion } from "../services/ramosService";
import { useBranchContext } from "../context/BranchContext";

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

  const createRamo = async (newRamo) => {
    setRequestStatus({});
    const addRamoRespone = await addBranch(newRamo);

    if (addRamoRespone.status === 201) {
      const setUpVerif = await startUpVerificacion(addRamoRespone.data.id);
      if (setUpVerif.status === 201) {
        setRequestStatus({
          responseStatus: "success",
          text: `Agregado exitosamente el Ramo : ${addRamoRespone.data.titulo}`,
          status: true,
        });
        getRamos();
      }
    } else {
      setRequestStatus({ responseStatus: "error", text: addRamoRespone.data.message, status: true });
    }
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
