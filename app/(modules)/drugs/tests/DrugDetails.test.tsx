// tests/DrugDetailsComponent.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import DrugDetailsComponent from "../components/DrugDetails";
import { DrugDetails } from "../types";
import "@testing-library/jest-dom";

describe("DrugDetailsComponent", () => {
  const mockDrug: DrugDetails = {
    id: "1",
    name: "Aspirin",
    status: "Approved",
    description: "Used to reduce pain, fever, or inflammation.",
    mechanismOfAction: "Inhibits cyclooxygenase enzyme.",
    sideEffects: ["Nausea", "Rash", "Bleeding"],
    isLoading: false,
  };

  it("renders drug name", () => {
    render(<DrugDetailsComponent drug={mockDrug} isLoading={false} />);
    expect(screen.getByText("Aspirin")).toBeInTheDocument();
  });

  it("renders drug status", () => {
    render(<DrugDetailsComponent drug={mockDrug} isLoading={false} />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders drug description", () => {
    render(<DrugDetailsComponent drug={mockDrug} isLoading={false} />);
    expect(
      screen.getByText("Used to reduce pain, fever, or inflammation.")
    ).toBeInTheDocument();
  });

  it("renders mechanism of action", () => {
    render(<DrugDetailsComponent drug={mockDrug} isLoading={false} />);
    expect(
      screen.getByText("Inhibits cyclooxygenase enzyme.")
    ).toBeInTheDocument();
  });

  it("renders side effects", () => {
    render(<DrugDetailsComponent drug={mockDrug} isLoading={false} />);
    expect(screen.getByText("Nausea")).toBeInTheDocument();
    expect(screen.getByText("Rash")).toBeInTheDocument();
    expect(screen.getByText("Bleeding")).toBeInTheDocument();
  });

  it("renders back to list link", () => {
    render(<DrugDetailsComponent drug={mockDrug} isLoading={false} />);
    expect(screen.getByText("Back to List")).toBeInTheDocument();
  });

  it("handles null drug gracefully", () => {
    render(<DrugDetailsComponent drug={null} isLoading={false} />);
    expect(screen.queryByText("Aspirin")).not.toBeInTheDocument();
    expect(screen.queryByText("Approved")).not.toBeInTheDocument();
  });
});
