// src/slices/tasksSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import { Task, TasksState } from '../types/tasks';
import { TaskStatus, TaskCategory } from '../constants';

// Initial state
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunk to fetch tasks from the backend
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/tasks');
    return response.data as Task[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks.');
  }
});

// Async thunk to add a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (
    taskData: {
      title: string;
      status?: TaskStatus;
      category: TaskCategory;
      deadline?: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add task.');
    }
  }
);

// Async thunk to update a task's fields
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task.');
    }
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id; // Return the ID to remove it from the state
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete task.');
  }
});

// Create the slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // addTask
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.unshift(action.payload); // Add the new task to the top of the array
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateTask
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;