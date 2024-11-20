// src/components/TaskItem.test.tsx

import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from '../../test-utils';
import TaskItem from "../../components/tasks/TaskItem";
import { Task } from "../../types/tasks";

describe("TaskItem Component", () => {
  const sampleTask: Task = {
    _id: "1",
    title: "Sample Task",
    status: "pending",
    category: "Work",
    deadline: null,
    createdAt: new Date().toISOString(),
  };

  it("renders the task title", () => {
    render(
        <TaskItem task={sampleTask} onEdit={jest.fn()} />
    );
    expect(screen.getByText("Sample Task")).toBeInTheDocument();
  });

  it("calls the onEdit function when the Edit button is clicked", () => {
    const onEditMock = jest.fn();
    render(
        <TaskItem task={sampleTask} onEdit={onEditMock} />
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(onEditMock).toHaveBeenCalledWith(sampleTask);
  });
});
