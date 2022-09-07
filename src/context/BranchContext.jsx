import { createContext, useContext, useState } from "react";
import { branch } from "../data";
import { defaultBranch } from "../variables/variablesGlobales";

const BranchContext = createContext(null);
export const useBranchContext = () => useContext(BranchContext);

const BranchContextProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(null);
  const [branches, setBranches] = useState(branch);

  const setUpCurrentBranch = (branch) => {
    setCurrentBranch(branch);
  };

  const updateStatusBranch = (branch_id, status) => {
    const newBranches = [...branches]; // creo una copia del estado actual de branches
    const newBranch = branches.find((ramo) => ramo._id === branch_id); //en newBranch guardo el ramo encontrado con el id clickeado
    newBranch.estado = status; //le cambio la propiedad estado
    const index = branches.findIndex((ramo) => ramo.id === branch_id); // encuentro la posicion en la que esta ese objeto
    newBranches[index] = newBranch; //lo reemplazo por el nuevo ramo con el estado modificado
    setBranches(newBranches); //cambio el estado de las branches
  };

  const addBranchToBranches = (titulo_branch) => {
    const newBranch = { ...defaultBranch };
    newBranch.titulo_Ramo = titulo_branch;

    setBranches([...branches, newBranch]);
  };

  return (
    <BranchContext.Provider
      value={{
        currentBranch,
        setUpCurrentBranch,
        updateStatusBranch,
        branches,
        addBranchToBranches,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
