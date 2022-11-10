import { createContext, useContext, useState } from "react";

const BranchContext = createContext();
export const useBranchContext = () => useContext(BranchContext);

const BranchContextProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  console.log(branches);

  return (
    <BranchContext.Provider
      value={{
        branches,
        setBranches,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
