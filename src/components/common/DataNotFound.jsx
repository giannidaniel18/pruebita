import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorsPalette } from "../../config/ColorsPalette";

import AddReactionIcon from "@mui/icons-material/AddReaction";

import React from "react";

export default function DataNotFound({ children }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      my={4}
      p={2}
      width={"100%"}
      severity={"warning"}
      sx={{
        color: theme.palette.mode === "dark" ? ColorsPalette.bg_light.main : ColorsPalette.bg_dark.light,
        borderRadius: 2,
        boxShadow: 5,
        backgroundColor: theme.palette.mode === "dark" ? ColorsPalette.bg_dark.dark : ColorsPalette.bg_light.dark,
      }}
    >
      <AddReactionIcon color="primary" fontSize="large" /> {children}
    </Stack>
  );
}
