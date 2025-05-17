import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchWishList = createAsyncThunk("wishlist/fetchWishList", async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:8080/wishlist/getByUserWishList/${userId}`);
        return res.data; // giả sử trả về array []
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeWishListItem = createAsyncThunk(
  "wishlist/removeWishListItem",
  async ({ userId, productId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:8080/wishlist/deleteByProduct/${productId}/${userId}`);
      // Gọi lại fetch để cập nhật danh sách
      dispatch(fetchWishList(userId));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const fetchWishListSlice = createSlice({
      name: "wishlist",
      initialState: {
        SelectedWishList: [],
        isLoading: false,
        iserror: false,
      },
      
      reducers: {
        // 👉 Action để reset state
        resetWishListState: (state) => {
          state.SelectedWishList = [];
          state.isLoading = false;
          state.iserror = false;
        },
      },
      
      extraReducers: (builder) => {
        builder
          .addCase(fetchWishList.pending, (state) => {
            state.isLoading = true;
            state.iserror = false;
          })
          .addCase(fetchWishList.fulfilled, (state, action) => {
           
            state.SelectedWishList = action.payload; 
            state.isLoading = false;
            state.iserror = false;
          })
          .addCase(fetchWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.iserror = true;
          })


          .addCase(removeWishListItem.pending, (state) => {
            state.isLoading = true;
            state.iserror = false;
          })
          .addCase(removeWishListItem.fulfilled, (state) => {
            state.isLoading = false;
            state.iserror = false;
          })
          .addCase(removeWishListItem.rejected, (state) => {
            state.isLoading = false;
            state.iserror = true;
          });
          
         
      },
    });
    export const { resetWishListState } = fetchWishListSlice.actions;
    export default fetchWishListSlice.reducer;


