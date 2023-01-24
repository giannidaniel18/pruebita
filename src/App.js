import { Box } from "@mui/material";
import NavBar from "./components/common/NavBar";

import ColorModeContextProvider from "./config/ColorModeContextProvider";
import HomeRoutes from "./router/HomeRoutes";
import UserContextProvider from "context/UserContext";

function App() {
  return (
    <>
      <ColorModeContextProvider>
        <UserContextProvider>
          <NavBar />
          <Box py={4} px={1} mt={6} display={{ xs: "flex", sm: "inherit" }} justifyContent="center">
            <HomeRoutes />
          </Box>
        </UserContextProvider>
      </ColorModeContextProvider>
    </>
  );
}

export default App;
