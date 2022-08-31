import { createContext, useContext, useEffect, useState } from "react";
import { branch } from "../data";

const BranchContext = createContext(null);
export const useBranchContext = () => useContext(BranchContext);

const BranchContextProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    setBranches(branch);
  }, []);

  const setUpCurrentBranch = (branch) => {
    setCurrentBranch(branch);
  };

  const updateStatusBranch = (branch_id, status) => {
    console.log(branch_id, status);
    const newBranch = { ...currentBranch, estado: "pija" };
    console.log("newbranch: ", newBranch);
    setUpCurrentBranch(newBranch);
  };

  const updateBranches = () => {};

  console.log("current", currentBranch);
  return (
    <BranchContext.Provider
      value={{
        currentBranch,
        setUpCurrentBranch,
        updateStatusBranch,
        branches,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
