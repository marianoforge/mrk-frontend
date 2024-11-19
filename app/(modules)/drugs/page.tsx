"use client";

import { useEffect, useState } from "react";
import { useDrugs } from "@/app/(modules)/drugs/hooks/useDrugs";
import DrugsTable from "@/app/(modules)/drugs/components/DrugsTable";
import { calculatePagination } from "@/app/(modules)/drugs/utils/paginationUtils";
import styles from "./DrugsPage.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Drug } from "./types";

export default function DrugsPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null); // Actual filter for the query
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Drug[]>([]);
  const [isFiltered, setIsFiltered] = useState(false); // Flag for filter application

  const limit = 5;
  const offset = (page - 1) * limit;

  const { data, isLoading, error } = useDrugs({
    limit,
    offset,
    sortField,
    sortOrder,
    filter,
    search,
    enabled: isFiltered || !filteredData.length,
  });

  useEffect(() => {
    if (data) {
      if (!isFiltered) {
        setFilteredData(data.data);
      } else {
        const filtered = data.data.filter((drug: Drug) =>
          drug.name.toLowerCase().includes(search?.toLowerCase() || "")
        );
        setFilteredData(filtered);
      }
    }
  }, [data, search, isFiltered]);

  const resetFilters = () => {
    setFilter(null);
    setSortField(null);
    setSortOrder(null);
    setPage(1);
    setSearch(null);
    setIsFiltered(false); // Reset filter flag
  };

  const totalPages = filteredData
    ? calculatePagination(filteredData.length, limit)
    : 1;

  if (error) return <p className={styles.errorText}>Failed to load data.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Drug Candidates</h1>
      {isLoading ? (
        <Skeleton height={50} count={12} />
      ) : (
        <DrugsTable
          drugs={filteredData.slice(offset, offset + limit)}
          totalPages={totalPages}
          setCurrentPage={setPage}
          currentPage={page}
          sortField={sortField || ""}
          sortOrder={sortOrder}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          filter={filter || ""}
          resetFilters={resetFilters}
          search={search || ""}
          setSearch={setSearch}
          setFilter={setFilter}
        />
      )}
    </div>
  );
}
