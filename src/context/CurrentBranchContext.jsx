import { createContext, useContext, useState } from "react";

const CurrentBranchContext = createContext();
export const useCurrentBranchContext = () => useContext(CurrentBranchContext);

const CurrentBranchProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState({});

  const setUpCurrentBranch = (branch) => {
    console.log(branch);
    setCurrentBranch(branch);
  };

  const addVerificacionToBranch = (tipoVerificacion, newVerificacion) => {
    console.log(tipoVerificacion, newVerificacion);
    const newBranch = currentBranch;
    if (tipoVerificacion === "criticas") {
      newBranch.verificaciones.verificacionesCriticas = [
        ...currentBranch.verificaciones.verificacionesCriticas,
        newVerificacion,
      ];
    } else {
      newBranch.verificaciones.verificacionesExtras = [
        ...currentBranch.verificaciones.verificacionesExtras,
        newVerificacion,
      ];
    }
    setUpCurrentBranch(newBranch);
  };

  const deleteVerificacionFromBranch = (tipoVerificacion, idVerificacion) => {
    const newBranch = currentBranch;
    if (tipoVerificacion === "criticas") {
      newBranch.verificaciones.verificacionesCriticas = currentBranch.verificaciones.verificacionesCriticas.filter(
        (verif) => verif.id !== idVerificacion
      );
    } else {
      newBranch.verificaciones.verificacionesExtras = currentBranch.verificaciones.verificacionesExtras.filter(
        (verif) => verif.id !== idVerificacion
      );
    }
    setUpCurrentBranch(newBranch);
  };

  return (
    <CurrentBranchContext.Provider
      value={{
        currentBranch,
        setUpCurrentBranch,
        addVerificacionToBranch,
        deleteVerificacionFromBranch,
      }}
    >
      {children}
    </CurrentBranchContext.Provider>
  );
};

export default CurrentBranchProvider;
