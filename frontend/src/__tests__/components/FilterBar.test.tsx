// src/components/FilterBar.test.tsx

import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from '../../test-utils';
import { FilterBar } from "../../components";

describe("FilterBar Component", () => {
  const mockHandleSearchChange = jest.fn();
  const mockHandleCategoryChange = jest.fn();
  const mockHandleStatusChange = jest.fn();

  const renderFilterBar = () => {
    render(
      <FilterBar
        searchTerm=""
        handleSearchChange={mockHandleSearchChange}
        selectedCategory=""
        handleCategoryChange={mockHandleCategoryChange}
        selectedStatus=""
        handleStatusChange={mockHandleStatusChange}
      />
    );
  };

  it("renders the search input", () => {
    renderFilterBar();
    expect(
      screen.getByPlaceholderText("Search by keyword")
    ).toBeInTheDocument();
  });

  it("calls handleSearchChange on search input change", () => {
    renderFilterBar();
    const searchInput = screen.getByPlaceholderText("Search by keyword");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(mockHandleSearchChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleCategoryChange on category selection", () => {
    renderFilterBar();
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.mouseDown(categorySelect);
    const categoryOption = screen.getByText("Work");
    fireEvent.click(categoryOption);
    expect(mockHandleCategoryChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleStatusChange on status selection", () => {
    renderFilterBar();
    const statusSelect = screen.getByLabelText("Status");
    fireEvent.mouseDown(statusSelect);
    const statusOption = screen.getByText("Pending");
    fireEvent.click(statusOption);
    expect(mockHandleStatusChange).toHaveBeenCalledTimes(1);
  });
});