// src/components/TaskList.tsx

import React, { useState, useMemo } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from MUI

import { useAppSelector } from "../../hooks";
import { selectTasks, selectLoading, selectError } from "../../selectors";
import TaskItem from "./TaskItem";
import { Task } from "../../types/tasks";
import TaskModal from "./TaskModal";
import Loader from "../common/Loader";
import NoData from "../common/NoData";

interface TaskListProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

// Styled Components

const TaskListContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3, 0),
  flexGrow: 1,
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: "center",
  marginTop: theme.spacing(2),
}));

const TaskList: React.FC<TaskListProps> = ({
  searchTerm,
  selectedCategory,
  selectedStatus,
}) => {
  const tasks = useAppSelector(selectTasks);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const displayedTasks = useMemo(() => {
    let filteredTasks = tasks;

    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(lowerTerm)
      );
    }

    if (selectedCategory !== "") {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === selectedCategory
      );
    }

    if (selectedStatus !== "") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === selectedStatus
      );
    }

    return filteredTasks;
  }, [tasks, searchTerm, selectedCategory, selectedStatus]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedTask(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage variant="h6">Error: {error}</ErrorMessage>;
  }

  if (displayedTasks.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <TaskListContainer>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {displayedTasks.map((task) => (
              <Grid item xs={12} sm={6} md={3} key={task._id}>
                <TaskItem task={task} onEdit={handleEdit} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </TaskListContainer>
      {selectedTask && (
        <TaskModal
          open={openEditModal}
          onClose={handleCloseModal}
          initialValues={{
            title: selectedTask.title,
            status: selectedTask.status,
            category: selectedTask.category,
            deadline: selectedTask.deadline
              ? new Date(selectedTask.deadline)
              : null,
          }}
          isEditMode={true}
          taskId={selectedTask._id}
        />
      )}
    </>
  );
};

export default TaskList;
