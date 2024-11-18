"use client";

import { useDrugDetails } from "@/app/(modules)/drugs/hooks/useDrugDetails";
import DrugDetails from "../components/DrugDetails";
import { useParams } from "next/dist/client/components/navigation";
import styles from "./DrugDetailsPage.module.css";

export default function DrugDetailsPage() {
  const { id } = useParams();
  const { data: drug, isLoading, error } = useDrugDetails(id as string);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText} data-testid="loading">
          Loading drug details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText} data-testid="error">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (!drug) {
    return (
      <div className={styles.container}>
        <p className={styles.notFoundText} data-testid="not-found">
          Drug not found
        </p>
      </div>
    );
  }

  return <DrugDetails drug={drug} />;
}
