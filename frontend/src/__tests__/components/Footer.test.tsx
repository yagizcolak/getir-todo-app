// src/components/Footer.test.tsx

import React from "react";
import { render, screen } from "../../test-utils";
import { Footer } from "../../components";

describe("Footer Component", () => {
  it("renders the footer text with the current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(
      screen.getByText(`© ${currentYear} To-Do APP. All rights reserved.`)
    ).toBeInTheDocument();
  });
});
