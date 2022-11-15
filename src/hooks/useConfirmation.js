import React, { useState } from "react";

export default function useConfirmation() {
  const [dataToConfirm, setDataToConfirm] = useState({});

  const handleConfirmation = (dataToConfirm) => {
    setDataToConfirm(dataToConfirm);
  };

  const resetDataToConfirm = () => {
    setDataToConfirm({});
  };

  return { dataToConfirm, handleConfirmation, resetDataToConfirm };
}
