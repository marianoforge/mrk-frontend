"use client";

import styles from "./DrugsTable.module.css"; // Importa el CSS Module
import { DrugsTableProps } from "@/app/(modules)/drugs/types";
import PaginationControls from "./PaginationControls";

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
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <input
          type="text"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value || "")}
          placeholder="Search by name"
          className={styles.input}
        />
        <select
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value || "")}
          className={styles.select}
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="In Development">In Development</option>
        </select>
        <button
          onClick={resetFilters}
          disabled={!filter && !sortField && !sortOrder}
          className={`${styles.resetButton} ${
            !filter && !sortField && !sortOrder
              ? styles.resetButtonDisabled
              : styles.resetButtonEnabled
          }`}
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
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
                  <span
                    className={
                      drug.status === "Approved"
                        ? styles.statusApproved
                        : styles.statusInDevelopment
                    }
                  >
                    {drug.status}
                  </span>
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

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
