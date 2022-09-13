import React from "react";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import SideNav from "../components/SideNav";
import { useBranchContext } from "../context/BranchContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function SinesterLayout() {
  const { currentBranch } = useBranchContext();

  const EmptyBranch = () => {
    return (
      <Card>
        <CardContent>
          <Box display="flex" direction="row" alignItems={"center"}>
            <ArrowBackIosIcon />
            <Typography variant="h6">
              Bienvenid@ al modulo de siniestros, para comenzar selecciona un
              ramo del menu lateral.
            </Typography>
          </Box>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    );
  };

  return (
    <>
      <Box display="flex">
        <SideNav />
        {!currentBranch && <EmptyBranch />}
        <Outlet />
      </Box>
    </>
  );
}
