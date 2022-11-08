import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import LoaderBasic from "./LoaderBasic";

export default function StatusSwitch({ ramoId, status, onChange }) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  const handleChange = (event) => {
    setLoading(true);
    onChange(event.target.id, event.target.checked).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <LoaderBasic size={20} />
      ) : (
        <Switch id={ramoId} checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
      )}
    </>
  );
}
