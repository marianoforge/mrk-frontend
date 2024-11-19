// tests/DrugsPage.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DrugsPage from "../page";
import { useDrugs } from "../hooks/useDrugs";
import { UseDrugsResponse } from "../types";

jest.mock("../hooks/useDrugs");

const mockUseDrugs = (
  data: UseDrugsResponse | null,
  isLoading: boolean,
  error: Error | null
) => {
  (useDrugs as jest.Mock).mockReturnValue({
    data,
    isLoading,
    error,
  });
};

describe("DrugsPage Component", () => {
  it("renders error state", () => {
    mockUseDrugs(null, false, new Error("Failed to load data"));

    render(<DrugsPage />);
    expect(screen.getByText(/Failed to load data./i)).toBeInTheDocument();
  });

  it("renders data correctly", () => {
    mockUseDrugs(
      {
        data: [
          {
            id: "1",
            name: "Aspirin",
            sideEffects: ["Nausea", "Dizziness"],
            status: "Approved",
            description: "Used to reduce pain, fever, or inflammation.",
            mechanismOfAction: "Inhibits cyclooxygenase enzyme.",
          },
        ],
        total: 1,
        limit: 10,
        offset: 0,
      },
      false,
      null
    );

    render(<DrugsPage />);
    expect(screen.getByText(/Drug Candidates/i)).toBeInTheDocument();
    expect(screen.getByText(/Aspirin/i)).toBeInTheDocument();
    expect(screen.getByText(/Nausea/i)).toBeInTheDocument();
    expect(screen.getByText(/Dizziness/i)).toBeInTheDocument();
  });

  it("handles search input", async () => {
    mockUseDrugs(
      {
        data: [
          {
            id: "1",
            name: "Aspirin",
            sideEffects: ["Nausea", "Dizziness"],
            status: "Approved",
            description: "Used to reduce pain, fever, or inflammation.",
            mechanismOfAction: "Inhibits cyclooxygenase enzyme.",
          },
        ],
        total: 1,
        limit: 10,
        offset: 0,
      },
      false,
      null
    );

    render(<DrugsPage />);
    const searchInput = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(searchInput, { target: { value: "Ibuprofen" } });

    await waitFor(() => {
      expect(searchInput).toHaveValue("Ibuprofen");
    });
  });
});
