import React from "react";
import styles from "./PaginationControls.module.css";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`${styles.button} ${
          currentPage === 1 ? styles.buttonDisabled : styles.buttonEnabled
        }`}
      >
        Previous
      </button>
      <p className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${
          currentPage === totalPages
            ? styles.buttonDisabled
            : styles.buttonEnabled
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
