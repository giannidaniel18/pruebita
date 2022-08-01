import { createContext, useContext, useState } from "react";

const BranchContext = createContext(null);
export const useBranchContext = () => useContext(BranchContext);

const BranchContextProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(null);

  const setUpCurrentBranch = (branch) => {
    setCurrentBranch(branch);
  };

  return (
    <BranchContext.Provider value={{ currentBranch, setUpCurrentBranch }}>
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
