import React, { useMemo } from "react";
import { DrugDetails } from "../types";
import styles from "./DrugDetails.module.css";
import Button from "@/app/common/components/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure this is imported

const DrugDetailsComponent: React.FC<{
  drug: DrugDetails | null;
  isLoading: boolean;
}> = ({ drug, isLoading }) => {
  const statusClass = useMemo(() => {
    return drug?.status === "Approved"
      ? styles.statusApproved
      : styles.statusInDevelopment;
  }, [drug?.status]);

  const sideEffectsList = useMemo(() => {
    return drug?.sideEffects.map((effect, index) => (
      <li key={index}>{effect}</li>
    ));
  }, [drug?.sideEffects]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton height={100} width={500} count={5} />
      ) : (
        <div className={styles.card}>
          <h1 className={styles.title}>{drug?.name}</h1>

          <div className="mb-4">
            <span className={`${styles.status} ${statusClass}`}>
              {drug?.status}
            </span>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.sectionContent}>{drug?.description}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Mechanism of Action</h2>
            <p className={styles.sectionContent}>{drug?.mechanismOfAction}</p>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Side Effects</h2>
            <ul className={styles.list}>{sideEffectsList}</ul>
          </div>

          <div className={styles.footer}>
            <Button
              className={styles.backButton}
              onClick={() => (window.location.href = "/drugs")}
            >
              Back to List
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugDetailsComponent;
