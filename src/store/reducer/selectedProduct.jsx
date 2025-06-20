import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setSelectedProduct = createAsyncThunk(
  "selectedProducts/fetchAll",
  async (id, { rejectWithValue }) => {
    try {
      // Giả lập delay ngẫu nhiên để test race condition
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1500));
      const res = await axios.get(`http://localhost:8080/productVariant/getByProductId/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);



  const selectedProduct = createSlice({
      name: "products",
      initialState: {
          selectedProduct: null,
          isLoading: false,
          isError: false,
        //   latestRequestId: null,
      },
      extraReducers: (builder) => {
          builder
          .addCase(setSelectedProduct.pending, (state, action) => {
              state.isLoading = true;
              state.isError = false;

            //    state.latestRequestId = action.meta.requestId;
          })
          .addCase(setSelectedProduct.fulfilled, (state, action) => {
                // if (state.latestRequestId !== action.meta.requestId) {
                //         return;
                //         }
              state.selectedProduct = action.payload;
              state.isLoading = false;
              state.isError = false;
          })
          .addCase(setSelectedProduct.rejected, (state, action) => {
        //      if (state.latestRequestId !== action.meta.requestId) {
        //   return;
        // }
              state.isLoading = false;
              state.isError = true;
          });
      },
      });
  
      export default selectedProduct.reducer;