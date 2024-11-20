// src/pages/Tasks.tsx

import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useAppDispatch } from '../hooks';
import { fetchTasks } from '../slices';
import { TaskModal, TaskList, FilterBar } from '../components';
import { TaskStatus, TaskCategory } from '../constants';
import { styled } from '@mui/material/styles';

// Styled Components
const AddTaskButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  position: 'absolute',
  right: theme.spacing(2.5),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[6],
  },
}));

const ContainerGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  position: 'relative',
}));

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

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
    title: '',
    status: 'pending' as TaskStatus,
    category: 'Work' as TaskCategory,
    deadline: null, // Empty deadline
  };

  return (
    <>
      <ContainerGrid container alignItems="center">
        {/* Add Task Button */}
        <AddTaskButton
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          startIcon={<AddCircleOutlineIcon sx={{ fontSize: '1.2rem' }} />}
          data-testid="add-new-task-button"
        >
          Add Task
        </AddTaskButton>

        {/* Filter Bar */}
        <Grid item xs={6} sm={8} md={9} sx={{ margin: { xs: 0, md: "0 auto" } }}>
          <FilterBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
          />
        </Grid>
      </ContainerGrid>

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