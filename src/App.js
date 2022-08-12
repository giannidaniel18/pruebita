import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import BranchContextProvider from "./context/BranchContext";

import HomeRoutes from "./router/HomeRoutes";

function App() {
  return (
    <BranchContextProvider>
      <NavBar />
      <Box
        p={4}
        mt={6}
        display={{ xs: "flex", sm: "inherit" }}
        justifyContent="center"
      >
        <HomeRoutes />
      </Box>
    </BranchContextProvider>
  );
}

export default App;
