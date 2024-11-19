import React from "react";
import styles from "./StatusChip.module.css";

interface StatusChipProps {
  status: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const chipStyle =
    status === "Approved" ? styles.statusApproved : styles.statusInDevelopment;

  return <span className={chipStyle}>{status}</span>;
};

export default StatusChip;
