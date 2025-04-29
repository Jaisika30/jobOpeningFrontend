import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const API_URL = 'http://localhost:8085/api'; // Adjust based on your backend URL
const API_URL = process.env.REACT_APP_API_URL;
// 1. Create Job
export const createJob = createAsyncThunk(
    "jobs/createJob",
    async ({ jobData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${API_URL}/api/jobs/createJob`,
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const getJobs = createAsyncThunk(
    "jobs/getJobs",
    async ({ page, limit, searchQuery, statusFilter }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found");

            const response = await axios.get(`${API_URL}/api/jobs/getJobs`, {
                params: {
                    page,
                    limit,
                    ...(searchQuery && { searchQuery }),
                    ...(statusFilter && { statusFilter }),

                },
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.length === 0) {
                import("sweetalert2").then((Swal) => {
                    Swal.default.fire({
                        title: "No Jobs Available",
                        text: "There are no Jobs available please add Job for see details.",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                });
            }
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
            const response = await axios.get(`${API_URL}/api/jobs/getJob/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in Authorization header
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }

);
// 4. Update Job
export const updateJob = createAsyncThunk(
    'jobs/updateJob',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API_URL}/api/jobs/updateJob/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Job updated successfully!"); // ✅ Success Toaster
            }
            return response.data;
        } catch (error) {
            // toast.error(error.response?.data?.message || "Failed to update job!"); 
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


// 5. Delete Job
export const deleteJob = createAsyncThunk(
    "jobs/deleteJob",
    async ({ id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token
                },
            };

            const resp = await axios.delete(`${API_URL}/api/jobs/deleteJob/${id}`, config);
            return id; // Return ID to remove from Redux store
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete job");
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
        total: 0,
        page: 1,
        limit: 10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.jobs)) {
                    state.jobs.jobs.push(action.payload);
                }

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
                state.total = action.payload.total;     // total number of candidates
                state.page = action.payload.page;       // current page from backend
                state.limit = action.payload.limit;
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
                state.jobs = state.jobs.jobs.map((job) =>
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
