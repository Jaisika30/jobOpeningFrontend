import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_URL = "http://localhost:8085";
// Forgot Password
const API_URL = process.env.REACT_APP_API_URL;
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/forgot`, { email });
            if (response.data.success) {
                localStorage.setItem("otpExpire", response.data.user.otpExpire);
                localStorage.setItem("otpHash", response.data.user.otpHash);
                localStorage.setItem("id", response.data.user._id);
            }

            return response.data; // No navigation here
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
// Verify OTP
// export const verifyOtp = createAsyncThunk(
//     "auth/verifyOtp",
//     async ({ id, otp }, { rejectWithValue }) => {
//         try {
//             console.log("verify otp id:::", id);
//             const response = await axios.post(`${API_URL}/api/auth/verify/${id}`, { otp });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ id, otp }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/api/auth/verify/${id}`, { otp });
        return response.data;
      } catch (error) {
        // Ensure we return a consistent error structure
        const errorData = error.response?.data || { message: error.message };
        return rejectWithValue({
          message: errorData.message || "Failed to verify OTP",
          details: errorData // Optional: include full error details if needed
        });
      }
    }
  );

// Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ id, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/resetpass/${id}`, { password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// change Password
export const changePassowrd = createAsyncThunk(
    "auth/changePassowrd",
    async ({ id, newPass, oldPass }, { rejectWithValue }) => {

        try {
            const response = await axios.post(`${API_URL}/api/auth/changePass/${id}`, { newPass, oldPass });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.success = true; // OTP verified successfully
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message
                state.success = false;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default authSlice.reducer;
