import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {

    try {
      const response = await axios.post("http://localhost:8080/users/createUser", userData);
      return response.data; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  });

  const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      isLoading: false,
      iserror: false,
    },
   
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.iserror = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
         
          state.user = action.payload; 
          state.isLoading = false;
          state.iserror = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.iserror = true;
        })
       
    },
  });

  export default authSlice.reducer;