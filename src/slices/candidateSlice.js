import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/candidate'; // Adjust based on your backend URL

// 1. Create Candidate
export const createCandidate = createAsyncThunk(
    'candidates/createCandidate',
    async (candidateData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/create`, candidateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
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
    'candidates/getCandidateById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 4. Update Candidate
export const updateCandidate = createAsyncThunk(
    'candidates/updateCandidate',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 5. Delete Candidate
export const deleteCandidate = createAsyncThunk(
    'candidates/deleteCandidate',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id; // Return ID to remove from Redux store
        } catch (error) {
            return rejectWithValue(error.response.data);
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
