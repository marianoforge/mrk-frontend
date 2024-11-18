// tests/PaginationControls.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationControls from "../components/PaginationControls";

describe("PaginationControls Component", () => {
  let currentPage: number;
  let totalPages: number;
  let setCurrentPage: jest.Mock;

  beforeEach(() => {
    currentPage = 1;
    totalPages = 5;
    setCurrentPage = jest.fn();
  });

  test("renders correctly with initial props", () => {
    const { getByText } = render(
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    expect(getByText("Page 1 of 5")).toBeInTheDocument();
    expect(getByText("Previous")).toBeDisabled();
    expect(getByText("Next")).not.toBeDisabled();
  });

  test("calls setCurrentPage with correct value when Next is clicked", () => {
    const { getByText } = render(
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    fireEvent.click(getByText("Next"));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  test("calls setCurrentPage with correct value when Previous is clicked", () => {
    currentPage = 2;
    const { getByText } = render(
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    fireEvent.click(getByText("Previous"));
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  test("disables Next button on last page", () => {
    currentPage = totalPages;
    const { getByText } = render(
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    expect(getByText("Next")).toBeDisabled();
  });
});
