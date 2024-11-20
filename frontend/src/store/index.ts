// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slices/tasksSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

// Export types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;