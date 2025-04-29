import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createWishList = createAsyncThunk("wishlist/createWishlist", async (wishlistData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:8080/wishlist/createWishlist`, wishlistData);
      return res.data;
    } catch (error) {
      console.error("Lỗi kiểm tra categoryID:", error);
      return [];
    }
  }); 

  const wishListSlice = createSlice({
      name: "wishlist",
      initialState: {
        wishList: [],
        isLoading: false,
        iserror: false,
      },
     
      extraReducers: (builder) => {
        builder
          .addCase(createWishList.pending, (state) => {
            state.isLoading = true;
            state.iserror = false;
          })
          .addCase(createWishList.fulfilled, (state, action) => {
           
            state.wishList = action.payload; 
            state.isLoading = false;
            state.iserror = false;
          })
          .addCase(createWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.iserror = true;
          })
          
         
      },
    });
  
    export default wishListSlice.reducer;

