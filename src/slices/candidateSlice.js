import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from "sweetalert2";
import axios from 'axios';
import { toast } from 'react-toastify';

// const API_URL = 'http://localhost:8085/api/candidate'; // Adjust based on your backend URL
const API_URL = process.env.REACT_APP_API_URL;
// 1. Create Candidate
export const createCandidate = createAsyncThunk(
    "candidates/createCandidate",
    async (candidateData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_URL}/api/candidate/create`, candidateData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

// 2. Get All Candidates (with filters: jobId, status, search)
export const getCandidates = createAsyncThunk(
    "candidates/getCandidates",
    async ({ page, limit, searchQuery, statusFilter, interviewStatusFilter }, { rejectWithValue, getState }) => {
        try {

            // Get token from Redux state (assuming you store it in auth slice)
            const token = localStorage.getItem("token");

            // const response = await axios.get(`${API_URL}/api/candidate/getCandidates?page=${page}&limit=${limit}`, {
            //     params: {},
            //     headers: {
            //         Authorization: `Bearer ${token}`, // Attach token in headers
            //     },
            // });
            const response = await axios.get(`${API_URL}/api/candidate/getCandidates`, {
                params: {
                    page,
                    limit,
                    ...(searchQuery && { searchQuery }),
                    ...(statusFilter && { statusFilter }),
                    ...(interviewStatusFilter && { interviewStatusFilter })
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // if (response.data.
            //     candidates.length === 0) {
            //     import("sweetalert2").then((Swal) => {
            //         Swal.default.fire({
            //             title: "No Candidates Available!",
            //             text: "Please add candidates for see the details.",
            //             icon: "info",
            //             confirmButtonText: "OK",
            //         });
            //     });
            // }
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

            const response = await axios.get(`${API_URL}/api/candidate/getCandidate/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
            const token = localStorage.getItem("token");
            // Set headers with Authorization token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            // Send request with token
            const response = await axios.put(`${API_URL}/api/candidate/updateCandidate/${id}`, updatedData, config);
            if (response.status === 200) {
                toast.success("Candidate updated successfully! 🎉"); // Success toast

            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

// 5. Delete Candidate
// export const deleteCandidate = createAsyncThunk(
//     "candidates/deleteCandidate",
//     async (id, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token");
//             console.log("Delete token",token)
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             };

//             const resp = await axios.put(`${API_URL}/deleteCandidate/${id}`, config); // ✅ Include headers
//             console.log("resppppppp:::::", resp);
//             return id; // ✅ Return ID to remove from Redux store
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Something went wrong");
//         }
//     }
// );
export const deleteCandidate = createAsyncThunk(
    "candidates/deleteCandidate",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            // ✅ Fix: Move `config` to the third argument (not second)
            const resp = await axios.put(`${API_URL}/api/candidate/deleteCandidate/${id}`, {}, config);

            return id; // ✅ Return ID to remove from Redux store
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);



// 6. Get Candidates by Job ID
// Assuming your token is stored in localStorage (you can adjust based on where you store the token

export const getCandidatesByJobID = createAsyncThunk(
    'candidates/getCandidatesByJobID',
    async ({ id, page, limit, searchQuery, statusFilter, interviewStatusFilter }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            // Send token in Authorization header if it exists


            const response = await axios.get(`${API_URL}/api/candidate/getCandidatesbyJobID/${id}`, {
                params: {
                    page,
                    limit,
                    ...(searchQuery && { searchQuery }),
                    ...(statusFilter && { statusFilter }),
                    ...(interviewStatusFilter && { interviewStatusFilter })
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("responseeee getCandidatesByJobID:: ", response.data)
            if (response.data.length === 0) {
                import("sweetalert2").then((Swal) => {
                    Swal.default.fire({
                        title: "No Candidates Available",
                        text: "There are no candidates available for this job.",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                });
            }

            return response.data.data;
        } catch (error) {
            console.error("Error fetching candidates by job ID:", error);
            return rejectWithValue(error.response ? error.response.data : error.message);
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
        total: 0,
        page: 1,
        limit: 10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.candidates.candidates)) {
                    state.candidates.candidates.push(action.payload);
                }
                // state.candidates.candidates.push(action.payload);
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
                state.candidates = action.payload; // this should be your candidates array
                state.total = action.payload.total;     // total number of candidates
                state.page = action.payload.page;       // current page from backend
                state.limit = action.payload.limit;
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
            // .addCase(updateCandidate.fulfilled, (state, action) => {
            //     console.log("11111111111",state.candidates);
            //     // console.log("22222222",state.candidates.candidates);
            //     state.loading = false;
            //     state.candidates = state.candidates.map((candidate) =>
            //       candidate._id === action.payload._id ? action.payload : candidate
            //     );
            //   })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.loading = false;

                // Safely handle cases where candidates might not be an array
                if (Array.isArray(state.candidates)) {
                    state.candidates = state.candidates.map((candidate) =>
                        candidate._id === action.payload._id ? action.payload : candidate
                    );
                }
                // If candidates is an object with nested array (common with paginated responses)
                else if (state.candidates?.candidates && Array.isArray(state.candidates.candidates)) {
                    state.candidates.candidates = state.candidates.candidates.map((candidate) =>
                        candidate._id === action.payload._id ? action.payload : candidate
                    );
                }
                // If candidates is null/undefined, initialize it as an array with the updated candidate
                else {
                    state.candidates = [action.payload];
                }
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
                if (Array.isArray(state.candidates)) {
                    state.candidates = state.candidates.filter(
                        (candidate) => candidate._id !== action.payload
                    );
                }
            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCandidatesByJobID.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(getCandidatesByJobID.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload;
            })
            .addCase(getCandidatesByJobID.rejected, (state, action) => {
                state.loading = false;
                // Check if action.payload exists or if it's a network error
                state.error = action.payload || 'Failed to fetch candidates';
            });
    },
});

export default candidateSlice.reducer;
