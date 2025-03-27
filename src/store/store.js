import { configureStore } from '@reduxjs/toolkit'
import candidateReducer from "../slices/candidateSlice"; 
import jobReducer from "../slices/jobSlice"; // Ensure the path is correct

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    candidates:candidateReducer // Include jobReducer here
  },
});

export default store;
