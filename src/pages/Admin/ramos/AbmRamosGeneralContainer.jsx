import React from "react";
import AbmRamosGeneral from "components/Admin/individuos/abmRamosGeneral/AbmRamosGeneral";
import ErrorBoundary from "components/common/ErrorBoundary";
import AdminLayout from "layouts/AdminLayout";

export default function AbmRamosGeneralContainer() {
  return (
    <ErrorBoundary>
      <AdminLayout>
        <AbmRamosGeneral />
      </AdminLayout>
    </ErrorBoundary>
  );
}
