import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { store } from "../store";
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {

    try {
      const response = await axios.post("http://localhost:8080/Authentication/log-in-token", userData);
      return response.data; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  });

//   export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { getState, rejectWithValue }) => {
//     const accessToken = getState().auth.token;
//     try {
//         const res = await axios.post("http://localhost:8080/Authentication/refresh", { accessToken });
//         console.log(res.data)
//         return res.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || "Không thể refresh token");
//     }
// });

export const logout = createAsyncThunk("auth/logout", async (logoutToken, { rejectWithValue }) => {
  console.log(logoutToken)
  try {
    const response = await axios.post("http://localhost:8080/Authentication/logout", logoutToken);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi không xác định");
  }
});

const loginSlice = createSlice({
    name: "auth",
    initialState: {
      token: null,
      isLoading: false,
      iserror: false,
      shouldPersist: false,
    },
   
    extraReducers: (builder) => {
      builder
        // ----- LOGIN -----
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.iserror = false;
        })
        .addCase(login.fulfilled, (state, action) => {
          
          state.token = action.payload.result.token; 
          state.isLoading = false;
          state.iserror = false;
          state.shouldPersist = true; 
        })
        
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.iserror = true;
        })
      
         // ----- LOGOUT -----
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.iserror = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isLoading = false;
        state.iserror = false;
        state.shouldPersist = false;
      })
      .addCase(logout.rejected, (state) => {
        state.token = null;
        state.isLoading = false;
        state.iserror = true;
        state.shouldPersist = false;
      });
       
    },
  });

  export default loginSlice.reducer;
