import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/products/getFormattedProducts");
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  });

  

    const productSlice = createSlice({
    name: "products",
    initialState: {
        GetProduct: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
           
            state.GetProduct = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    });

    export default productSlice.reducer;