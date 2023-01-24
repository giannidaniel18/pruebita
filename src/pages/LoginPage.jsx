import { Stack, Typography } from "@mui/material";
import SnackBar from "components/common/SnackBar";
import LogIn from "components/LogIn";
import { useUserContext } from "context/UserContext";
import React from "react";

export default function LoginPage() {
  const { currentUser, requestStatus } = useUserContext();
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      {currentUser.userName ? (
        <>
          <Typography variant="h1" color="primary">
            Scripting CAC
          </Typography>
          <Typography variant="h2" color="white">
            Demo
          </Typography>
        </>
      ) : (
        <LogIn />
      )}
      {requestStatus.status && (
        <SnackBar title={requestStatus.text} severity={requestStatus.responseStatus} status={requestStatus.status} />
      )}
    </Stack>
  );
}
