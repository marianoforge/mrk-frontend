export interface Drug {
  id: string;
  name: string;
  status: string;
  description: string;
  mechanismOfAction: string;
  sideEffects: string[];
}

export interface UseDrugsOptions {
  limit?: number;
  offset?: number;
  sortField?: string | null;
  sortOrder?: "asc" | "desc" | null;
  filter?: string | null;
  search?: string | null;
}

export interface UseDrugsResponse {
  data: Drug[];
  total: number;
  limit: number;
  offset: number;
}

export interface DrugsTableProps {
  drugs: Drug[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortField: string;
  sortOrder: "asc" | "desc" | null;
  setSortField: (field: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
  filter: string;
  resetFilters: () => void;
  search: string;
  setSearch: (search: string) => void;
}

export interface DrugDetails {
  id: string;
  name: string;
  status: string;
  description: string;
  mechanismOfAction: string;
  sideEffects: string[];
}
