import React from "react";
import AbmRamosGeneral from "components/Admin/individuos/abmRamosGeneral/AbmRamosGeneral";
import ErrorBoundary from "components/common/ErrorBoundary";

export default function AbmRamosGeneralContainer() {
  return (
    <ErrorBoundary>
      <AbmRamosGeneral />
    </ErrorBoundary>
  );
}
