import React from "react";
import { Chip } from "@mui/material";

export default function NewInfoChip({ children, array }) {
  const today = new Date();

  const maxDate = new Date(Math.max(...array.map((e) => new Date(e.updatedAt))));
  console.log(maxDate, today);

  const newDate = maxDate - today;

  return newDate >= 5 ? <Chip label={"new"} color="primary" size="small" variant="outlined" /> : "";
}
