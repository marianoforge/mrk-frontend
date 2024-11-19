import React, { useCallback } from "react";
import styles from "./PaginationControls.module.css";
import Button from "@/app/common/components/Button";

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
  const handlePrevious = useCallback(() => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  }, [currentPage, setCurrentPage]);

  const handleNext = useCallback(() => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className={styles.container}>
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${styles.button} ${
          currentPage === 1 ? styles.buttonDisabled : styles.buttonEnabled
        }`}
      >
        Previous
      </Button>
      <p className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </p>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${
          currentPage === totalPages
            ? styles.buttonDisabled
            : styles.buttonEnabled
        }`}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
