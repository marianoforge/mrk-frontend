"use client";

import { useDrugDetails } from "@/app/(modules)/drugs/hooks/useDrugDetails";
import DrugDetails from "../components/DrugDetails";
import { useParams } from "next/dist/client/components/navigation";
import styles from "./DrugDetailsPage.module.css";
import { useMemo } from "react";

export default function DrugDetailsPage() {
  const { id } = useParams();
  const { data: drug, isLoading, error } = useDrugDetails(id as string);

  console.log(id);

  const errorMessage = useMemo(() => error?.message, [error]);

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText} data-testid="error">
          Error: {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <DrugDetails drug={drug ?? null} isLoading={isLoading} />
    </div>
  );
}
