import React from "react";
import { DrugDetails } from "../types";
import styles from "./DrugDetails.module.css";

const DrugDetailsComponent: React.FC<{ drug: DrugDetails | null }> = ({
  drug,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{drug?.name}</h1>

        <div className="mb-4">
          <span
            className={`${styles.status} ${
              drug?.status === "Approved"
                ? styles.statusApproved
                : styles.statusInDevelopment
            }`}
          >
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
          <ul className={styles.list}>
            {drug?.sideEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>

        <div className={styles.footer}>
          <a href="/drugs" className={styles.backButton}>
            Back to List
          </a>
        </div>
      </div>
    </div>
  );
};

export default DrugDetailsComponent;
