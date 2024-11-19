"use client";

import styles from "./DrugsTable.module.css"; // Importa el CSS Module
import { DrugsTableProps } from "@/app/(modules)/drugs/types";
import PaginationControls from "./PaginationControls";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Input from "@/app/common/components/Input";
import Select from "@/app/common/components/Select";
import Button from "@/app/common/components/Button";
import StatusChip from "@/app/common/components/StatusChip";

export default function DrugsTable({
  drugs,
  totalPages,
  currentPage,
  setCurrentPage,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  setFilter,
  filter,
  resetFilters,
  search,
  setSearch,
}: DrugsTableProps): React.ReactNode {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearch, setSearch]);

  const handleSort = useCallback(
    (field: string) => {
      if (sortField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField, sortOrder, setSortField, setSortOrder]
  );

  const statusOptions = useMemo(() => ["Approved", "In Development"], []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Input
          ref={searchInputRef}
          type="text"
          value={debouncedSearch || ""}
          onChange={(e) => setDebouncedSearch(e.target.value || "")}
          placeholder="Search by name"
        />
        <Select
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value || "")}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Button
          onClick={resetFilters}
          disabled={!filter && !sortField && !sortOrder}
          className={
            !filter && !sortField && !sortOrder
              ? styles.resetButtonDisabled
              : styles.resetButtonEnabled
          }
        >
          Reset Filters
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHead}>
              <th className={styles.cell} onClick={() => handleSort("name")}>
                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className={styles.cell} onClick={() => handleSort("status")}>
                Status{" "}
                {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className={styles.cell}>Description</th>
              <th className={styles.cell}>Side Effects</th>
              <th className={styles.cell}>More Info</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug) => (
              <tr key={drug.id} className={styles.tableRow}>
                <td className={styles.cell}>{drug.name}</td>
                <td className={styles.cell}>
                  <StatusChip status={drug.status} />
                </td>
                <td className={styles.cell}>{drug.description}</td>
                <td className={styles.cell}>
                  <ul className="list-disc list-inside">
                    {drug.sideEffects.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </td>
                <td className={`${styles.cell} text-center`}>
                  <a href={`/drugs/${drug.id}`} className={styles.moreInfo}>
                    More Info
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
