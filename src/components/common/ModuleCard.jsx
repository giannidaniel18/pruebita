import React from "react";
import { Card, CardActionArea, CardContent, Divider, Icon, Stack, Typography } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { ColorsPalette } from "../../config/ColorsPalette";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function ModuleCard({ title, text, icon, to, disabled }) {
  const theme = useTheme();

  const CustomCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    borderRadius: 5,
    boxShadow: 5,
    backgroundColor: theme.palette.mode === "dark" ? ColorsPalette.bg_dark.light : ColorsPalette.bg_light.dark,
  });

  return (
    <CustomCard
      sx={{
        height: { xs: "115px", sm: "200px" },
        width: { xs: "250px", sm: "400px" },
      }}
    >
      <CardActionArea
        component={ReactLink}
        to={to}
        sx={{
          height: "100%",
          "&.Mui-disabled": {
            backgroundColor:
              theme.palette.mode === "dark" ? ColorsPalette.bg_dark.dark : ColorsPalette.bg_light.DeepDark,
          },
          "&:hover ": { backgroundColor: "primary.main", color: "white" },
        }}
        disabled={disabled}
      >
        <CardContent>
          {icon}
          <Typography variant="h5">{title}</Typography>

          <Typography variant="caption" display={{ xs: "none", sm: "inherit" }}>
            <Divider sx={{ marginY: 2 }} />
            {text}
          </Typography>
          {disabled && (
            <Stack direction={"row"} justifyContent={"right"}>
              <Typography variant="overline">En desarrollo</Typography>
              <Icon sx={{ color: "primary.dark" }}>
                <ConstructionIcon />
              </Icon>
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
    </CustomCard>
  );
}
