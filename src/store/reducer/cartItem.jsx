import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const createCartIem = createAsyncThunk("cartItem/createCartItem", async (cartItem, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:8080/cartItems/createCartItem`, cartItem);
      return res.data;
    } catch (error) {
      console.error("Lỗi kiểm tra categoryID:", error);
      return [];
    }
  }); 

  const cartIemSlice = createSlice({
      name: "cartItem",
      initialState: {
        cartItems: [],
        isLoading: false,
        iserror: false,
      },
     
      extraReducers: (builder) => {
        builder
          .addCase(createCartIem.pending, (state) => {
            state.isLoading = true;
            state.iserror = false;
          })
          .addCase(createCartIem.fulfilled, (state, action) => {
           
            state.cartItems = action.payload; 
            state.isLoading = false;
            state.iserror = false;
          })
          .addCase(createCartIem.rejected, (state, action) => {
            state.isLoading = false;
            state.iserror = true;
          })
      },
    });
  
    export default cartIemSlice.reducer;

