// DrugsTable.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DrugsTable from "../components/DrugsTable";
import { Drug } from "../types";

const mockDrugs = [
  {
    id: 1,
    name: "Aspirin",
    status: "Approved",
    description: "Pain reliever",
    sideEffects: ["Nausea"],
  },
  {
    id: 2,
    name: "Ibuprofen",
    status: "In Development",
    description: "Anti-inflammatory",
    sideEffects: ["Dizziness"],
  },
];

const mockSetCurrentPage = jest.fn();
const mockSetSortField = jest.fn();
const mockSetSortOrder = jest.fn();
const mockSetFilter = jest.fn();
const mockResetFilters = jest.fn();
const mockSetSearch = jest.fn();

const renderDrugsTable = (overrides = {}) => {
  const defaultProps = {
    drugs: mockDrugs as unknown as Drug[],
    totalPages: 1,
    currentPage: 1,
    setCurrentPage: mockSetCurrentPage,
    sortField: "",
    sortOrder: null,
    setSortField: mockSetSortField,
    setSortOrder: mockSetSortOrder,
    setFilter: mockSetFilter,
    filter: "",
    resetFilters: mockResetFilters,
    search: "",
    setSearch: mockSetSearch,
  };

  return render(<DrugsTable {...defaultProps} {...overrides} />);
};

describe("DrugsTable Component", () => {
  it("renders the table with drugs", () => {
    renderDrugsTable();

    expect(screen.getByText("Aspirin")).toBeInTheDocument();
    expect(screen.getByText("Ibuprofen")).toBeInTheDocument();
  });

  it("handles sorting by name", () => {
    renderDrugsTable();

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    expect(mockSetSortField).toHaveBeenCalledWith("name");
    expect(mockSetSortOrder).toHaveBeenCalledWith("asc");
  });

  it("handles filter change", () => {
    renderDrugsTable();

    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "Approved" } });

    expect(mockSetFilter).toHaveBeenCalledWith("Approved");
  });

  it("resets filters", () => {
    renderDrugsTable({
      sortField: "name",
      sortOrder: "asc",
      filter: "Approved",
    });

    const resetButton = screen.getByText("Reset Filters");
    fireEvent.click(resetButton);

    expect(mockResetFilters).toHaveBeenCalled();
  });
});
