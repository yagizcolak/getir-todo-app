import React from "react";
import { render, screen } from "@testing-library/react";
import NoData from "../../components/common/NoData";

describe("NoData Component", () => {
  it("renders the default message", () => {
    render(<NoData />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders a custom message", () => {
    const customMessage = "Nothing to see here!";
    render(<NoData message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
