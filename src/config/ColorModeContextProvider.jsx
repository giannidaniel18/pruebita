import React from "react";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ColorsPalette } from "./ColorsPalette";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#FA6400",
            dark: "#C85000",
            light: "#FFE2CE",
            eminent: { main: "#003973", dark: "#002041", light: "#D8E8F8" },
            prefer: { main: "#7F6D48", dark: "#504730", light: "#E2DDCF" },
          },
          secondary: {
            main: "#737373",
            dark: {
              100: "#666666",
              200: "#595959",
              300: "#4d4d4d",
              400: "#404040",
            },
            light: {
              100: "#808080",
              200: "#8c8c8c",
              300: "#999999",
              400: "#a6a6a6",
            },
          },
          ...(mode === "dark"
            ? {
                background: {
                  default: ColorsPalette.bg_dark.main,
                  paper: ColorsPalette.bg_dark.main,
                },
              }
            : {
                background: {
                  default: ColorsPalette.bg_light.main,
                  paper: ColorsPalette.bg_light.main,
                },
              }),
        },
        components: {
          MuiTab: {
            defaultProps: {
              style: {
                textTransform: "none",
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                "&.Mui-selected, &:hover":
                  mode === "dark"
                    ? {
                        backgroundColor: "#FA6400",
                      }
                    : {
                        backgroundColor: "#FA6400",
                        color: "white",
                      },
              },
            },
          },
          MuiTableContainer: {
            defaultProps: {
              style: { borderRadius: 10 },
            },
          },
          MuiTableBody: {
            defaultProps: {
              style:
                mode === "dark"
                  ? { backgroundColor: ColorsPalette.bg_dark.light }
                  : { backgroundColor: ColorsPalette.bg_light.dark },
            },
          },
          MuiTableHead: {
            defaultProps: {
              style:
                mode === "dark"
                  ? { backgroundColor: ColorsPalette.bg_dark.dark }
                  : { backgroundColor: ColorsPalette.bg_light.DeepDark },
            },
          },
        },
      }),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
