import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust based on your backend URL

// 1. Create Job
export const createJob = createAsyncThunk(
    'jobs/createJob',
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/jobs/createJob`, jobData);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 2. Get All Jobs
// export const getJobs = createAsyncThunk(
//     "jobs/getJobs",
//     async (_, { rejectWithValue, getState }) => {
//         try {
           
//             const token = localStorage.getItem("token");
//             console.log(token)
//             const response = await axios.get(`${API_URL}/jobs/getJobs`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//             });
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Something went wrong");
//         }
//     }
// );

export const getJobs = createAsyncThunk(
    "jobs/getJobs",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found");

            const response = await axios.get(`${API_URL}/jobs/getJobs`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch jobs");
        }
    }
);

// 3. Get Job by ID
export const getJobById = createAsyncThunk(
    '/jobs/getJob',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from storage
            const response = await axios.get(`${API_URL}/jobs/getJob/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in Authorization header
                },
            });
            console.log('get job response:::', response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
// 4. Update Job
export const updateJob = createAsyncThunk(
    'jobs/updateJob',
    async ({ id, updatedData, token }, { rejectWithValue }) => {
        try {
            console.log("usedispatch");
            const token = localStorage.getItem('token'); 
            const response = await axios.put(
                `${API_URL}/jobs/updateJob/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("update edit job:::", response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


// 5. Delete Job
export const deleteJob = createAsyncThunk(
    'jobs/deleteJob',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/jobs/deleteJob/${id}`);
            return id; // Return ID to remove from Redux store
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Redux Slice
const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        job: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getJobById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.job = action.payload;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = state.jobs.map((job) =>
                    job._id === action.payload._id ? action.payload : job
                );
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = state.jobs.filter((job) => job._id !== action.payload);
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default jobSlice.reducer;
