import { configureStore } from '@reduxjs/toolkit'
import candidateReducer from "../slices/candidateSlice"; 
import jobReducer from "../slices/jobSlice"; // Ensure the path is correct
import authReducer from "../slices/authSlice";
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    candidates:candidateReducer, // Include jobReducer here
    auth:authReducer,
  },
});

export default store;
