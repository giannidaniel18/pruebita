import React from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import LoaderBasic from "../../components/common/LoaderBasic";
import BranchCard from "../../components/individuos/siniestros/BranchCard";
import { useGetCurrentBranch } from "../../hooks/useGetters";

export default function BranchContainer() {
  const { selectedbranch } = useParams();
  const { loading, currentBranch } = useGetCurrentBranch(selectedbranch);

  return loading ? (
    <LoaderBasic />
  ) : (
    <ErrorBoundary>
      <BranchCard branch={currentBranch} />
    </ErrorBoundary>
  );
}
