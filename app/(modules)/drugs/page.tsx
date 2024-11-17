"use client";

import { useEffect, useState } from "react";
import { useDrugs } from "@/app/(modules)/drugs/hooks/useDrugs";
import DrugsTable from "@/app/(modules)/drugs/components/DrugsTable";
import { calculatePagination } from "@/app/(modules)/drugs/utils/paginationUtils";
import styles from "./DrugsPage.module.css";

export default function DrugsPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [search, setSearch] = useState<string | null>(null); // State for search term

  const limit = 5;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading, error } = useDrugs({
    limit,
    offset,
    sortField,
    sortOrder,
    filter,
    search,
  });

  const resetFilters = () => {
    setFilter(null);
    setSortField(null);
    setSortOrder(null);
    setPage(1);
  };

  const totalPages = data ? calculatePagination(data.total, limit) : 1;

  if (isLoading) return <p className={styles.loadingText}>Loading...</p>;

  if (error) return <p className={styles.errorText}>Failed to load data.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Drug Candidates</h1>
      <DrugsTable
        drugs={data?.data || []}
        totalPages={totalPages}
        setCurrentPage={setPage}
        currentPage={page}
        sortField={sortField || ""}
        sortOrder={sortOrder}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
        setFilter={setFilter}
        filter={filter || ""}
        resetFilters={resetFilters}
        search={search || ""}
        setSearch={setSearch}
      />
    </div>
  );
}
