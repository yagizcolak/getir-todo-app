// src/App.test.tsx

import React from "react";
import { screen } from "@testing-library/react";
import { render } from '../test-utils';
import App from "../App";

describe("App Component", () => {
  it("renders the Navbar component", () => {
    render(<App />);
    expect(screen.getByText("To-Do APP")).toBeInTheDocument();
  });

  it("renders the TaskList component", () => {
    render(<App />);
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });
});
