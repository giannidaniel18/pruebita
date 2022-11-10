import { useState } from "react";
import { addVerificacion, deleteVerificacion, getBranch, updateVerificacion } from "../services/ramos";
import { useCurrentBranchContext } from "../context/CurrentBranchContext";

export function useManageRamo() {
  const [requestStatus, setRequestStatus] = useState({});
  const { currentBranch, setUpCurrentBranch } = useCurrentBranchContext();

  const loadramo = async () => {
    const apiResponse = await getBranch(currentBranch.id);
    console.log(apiResponse);
    setUpCurrentBranch(apiResponse);
  };

  const createVerificacion = async (tipoVerificacion, verificacion, idVerificacion) => {
    if (tipoVerificacion === "criticas") {
      const newVerificacion = {
        titulo: verificacion.titulo_Verificacion_criticas,
        descripcion: verificacion.descripcion_Verificacion_criticas,
        id: idVerificacion,
      };
      await addVerificacion(tipoVerificacion, newVerificacion);
    } else {
      const newVerificacion = {
        titulo: verificacion.titulo_Verificacion_extras,
        descripcion: verificacion.descripcion_Verificacion_extras,
        id: idVerificacion,
      };
      await addVerificacion(tipoVerificacion, newVerificacion);
    }

    loadramo();
  };

  const removeVerificacion = async (tipoVerificacion, idVerificacion) => {
    await deleteVerificacion(tipoVerificacion, idVerificacion);
    loadramo();

    // deleteVerificacionFromBranch(tipoVerificacion, idVerificacion);
    // deleteVerificacion(tipoVerificacion, idVerificacion);
  };

  const modifyVerificacion = async (tipoVerificacion, updatedVerif, idVerificacion, masterVerifId) => {
    const newVerificacion = {
      titulo: updatedVerif.title_verif,
      descripcion: updatedVerif.descrip_verif,
    };

    await updateVerificacion(tipoVerificacion, newVerificacion, idVerificacion, masterVerifId);
    loadramo();
  };

  //   const createEvento = () => {};
  //   const updateEvento = () => {};
  //   const deleteEvento = () => {};

  //   const createSubtipo = () => {};
  //   const updateSubtipo = () => {};
  //   const deleteSubtipo = () => {};

  //   const createDocumentacion = () => {};
  //   const updateDocumentacion = () => {};
  //   const deleteDocumentacion = () => {};

  //   const createTipificacion = () => {};
  //   const updateTipificacion = () => {};
  //   const deleteTipificacion = () => {};

  return { createVerificacion, requestStatus, removeVerificacion, modifyVerificacion };
}
