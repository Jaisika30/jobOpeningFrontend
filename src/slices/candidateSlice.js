import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jobopeningbackend.onrender.com/api/candidate'; // Adjust based on your backend URL

// 1. Create Candidate
export const createCandidate = createAsyncThunk(
    "candidates/createCandidate",
    async (candidateData, { rejectWithValue }) => {
        try {
            console.log(candidateData);
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_URL}/create`, candidateData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

// 2. Get All Candidates (with filters: jobId, status, search)
export const getCandidates = createAsyncThunk(
    "candidates/getCandidates",
    async (_, { rejectWithValue, getState }) => {
        try {
            console.log("Fetching candidates...");

            // Get token from Redux state (assuming you store it in auth slice)
            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/getCandidates`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in headers
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

// 3. Get Candidate by ID
export const getCandidateById = createAsyncThunk(
    "candidates/getCandidateById",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("Authentication token not found.");
            }

            const response = await axios.get(`${API_URL}/getCandidate/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);
// 4. Update Candidate
export const updateCandidate = createAsyncThunk(
    "candidates/updateCandidate",
    async ({ id, updatedData }, { rejectWithValue, getState }) => {
        try {
            // Retrieve token from Redux state or localStorage
            console.log("object")
            const token = localStorage.getItem("token");
            console.log("id::", id, "udate Data :::", updatedData);
            // Set headers with Authorization token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            // Send request with token
            const response = await axios.put(`${API_URL}/updateCandidate/${id}`, updatedData, config);
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

// 5. Delete Candidate
export const deleteCandidate = createAsyncThunk(
    "candidates/deleteCandidate",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

         const resp=   await axios.delete(`${API_URL}/deleteCandidate/${id}`, config); // ✅ Include headers
          console.log("resppppppp:::::",resp);
         return id; // ✅ Return ID to remove from Redux store
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

// 6. Get Candidates by Job ID
export const getCandidatesByJobID = createAsyncThunk(
    'candidates/getCandidatesByJobID',
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getCandidatesbyJobID/${jobId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Redux Slice
const candidateSlice = createSlice({
    name: 'candidates',
    initialState: {
        candidates: [],
        candidate: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates.push(action.payload);
            })
            .addCase(createCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCandidates.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload;
            })
            .addCase(getCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCandidateById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCandidateById.fulfilled, (state, action) => {
                state.loading = false;
                state.candidate = action.payload;
            })
            .addCase(getCandidateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = state.candidates.map((candidate) =>
                    candidate._id === action.payload._id ? action.payload : candidate
                );
            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = state.candidates.filter((candidate) => candidate._id !== action.payload);
            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCandidatesByJobID.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCandidatesByJobID.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload;
            })
            .addCase(getCandidatesByJobID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default candidateSlice.reducer;
