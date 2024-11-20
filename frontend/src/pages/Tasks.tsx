// src/pages/Tasks.tsx

import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useAppDispatch } from "../hooks";
import { fetchTasks } from "../slices";
import { TaskModal, TaskList, FilterBar } from "../components";
import { TaskStatus, TaskCategory } from "../constants";
import { styled } from "@mui/material/styles";


// Styled Components
const AddTaskButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1, 3),
  textTransform: "none",
  boxShadow: theme.shadows[3],
  transition: "all 0.3s ease",
  marginTop: theme.spacing(2), // For small screens
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    right: theme.spacing(2.5),
    top: theme.spacing(1),
    marginTop: 0, // Remove top margin on larger screens
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[6],
  },
}));

const ContainerBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    position: "relative", // For absolute positioning of the button
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value);
  };

  const initialValues = {
    title: "",
    status: "pending" as TaskStatus,
    category: "Work" as TaskCategory,
    deadline: null, // Empty deadline
  };

  return (
    <>
      <ContainerBox>
        {/* Filter Bar */}
        <Box
          sx={(theme) => ({
            width: "100%",
            [theme.breakpoints.up("md")]: {
              margin: "0 auto",
            },
          })}
        >
          <FilterBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
          />
        </Box>

        {/* Add Task Button */}
        <AddTaskButton
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          startIcon={<AddCircleOutlineIcon sx={{ fontSize: "1.2rem" }} />}
          data-testid="add-new-task-button"
        >
          Add Task
        </AddTaskButton>
      </ContainerBox>

      <TaskModal
        open={openAddModal}
        onClose={handleCloseModal}
        initialValues={initialValues}
        isEditMode={false}
      />

      <TaskList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
      />
    </>
  );
};

export default TasksPage;
