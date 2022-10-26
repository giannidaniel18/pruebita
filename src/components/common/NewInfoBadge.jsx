import React from "react";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getTime, differenceInDays } from "date-fns";
import { isValid } from "date-fns/esm";

export default function NewInfoBadge({ children, array }) {
  const maxDate = new Date(Math.max(...array.map((e) => new Date(e.updatedAt))));
  const newDate = isValid(getTime(maxDate)) ? differenceInDays(maxDate, new Date()) : undefined;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -10,
      top: 8,
    },
  }));

  return newDate >= -2 ? (
    <StyledBadge color="primary" variant="dot">
      {children}
    </StyledBadge>
  ) : (
    <>{children}</>
  );
}
