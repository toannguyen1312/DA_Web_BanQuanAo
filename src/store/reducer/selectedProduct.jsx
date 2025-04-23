import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setSelectedProduct = createAsyncThunk("selectedProducts/fetchAll", async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/productVariant/getByProductId/${id}`);
      console.log(response.data)
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  });

  const selectedProduct = createSlice({
      name: "products",
      initialState: {
          selectedProduct: null,
          isLoading: false,
          isError: false,
      },
      extraReducers: (builder) => {
          builder
          .addCase(setSelectedProduct.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
          })
          .addCase(setSelectedProduct.fulfilled, (state, action) => {

               console.log(action.payload) 
              state.selectedProduct = action.payload;
              state.isLoading = false;
              state.isError = false;
          })
          .addCase(setSelectedProduct.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
          });
      },
      });
  
      export default selectedProduct.reducer;