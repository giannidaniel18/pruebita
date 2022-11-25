import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import LoaderBasic from "./LoaderBasic";

export default function StatusSwitch({ idToUpdate, status, onChangeFunc }) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  const handleChange = async (event) => {
    setLoading(true);
    const apiResponse = await onChangeFunc(event.target.id, event.target.checked);
    console.log(apiResponse);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoaderBasic size={20} />
      ) : (
        <Switch id={idToUpdate} checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
      )}
    </>
  );
}
