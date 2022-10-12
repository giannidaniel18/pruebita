import React from "react";
import { Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function CustomAlert({ children, type }) {
  const theme = useTheme();
  let iconToShow = null;

  switch (type) {
    case "error":
      iconToShow = <ErrorOutlineIcon color="primary" />;
      break;
    case "hint":
      iconToShow = <TipsAndUpdatesIcon color="primary" />;
      break;

    default:
      iconToShow = <InfoOutlinedIcon color="primary" />;
      break;
  }

  return (
    <Stack
      p={1}
      spacing={1}
      direction="row"
      border={"1px solid"}
      borderRadius={2}
      sx={
        theme.palette.mode === "dark"
          ? { borderColor: "primary.light", color: grey[100] }
          : { color: grey[800], borderColor: grey[500] }
      }
    >
      {iconToShow}
      <Stack>{children}</Stack>
    </Stack>
  );
}
