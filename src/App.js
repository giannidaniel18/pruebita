import { Box } from "@mui/material";
import NavBar from "./components/common/NavBar";
import BranchContextProvider from "./context/BranchContext";
import CurrentBranchProvider from "./context/CurrentBranchContext";

import HomeRoutes from "./router/HomeRoutes";

function App() {
  return (
    <>
      <NavBar />
      <BranchContextProvider>
        <CurrentBranchProvider>
          <Box py={4} px={1} mt={6} display={{ xs: "flex", sm: "inherit" }} justifyContent="center">
            <HomeRoutes />
          </Box>
        </CurrentBranchProvider>
      </BranchContextProvider>
    </>
  );
}

export default App;
