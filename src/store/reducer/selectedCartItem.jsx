import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCartItem = createAsyncThunk("cartItem/fetchCartItem", async (cartID, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:8080/cartItems/getCartItemByCartID/${cartID}`);
        return res.data; // giả sử trả về array []
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeCartItem = createAsyncThunk(
    "cartItem/removeCartItem",
    async ({ cartID, CartItemID }, { dispatch, rejectWithValue }) => {
      try {
        await axios.delete(`http://localhost:8080/cartItems/deleteCartItem/${CartItemID}`);
        dispatch(fetchCartItem(cartID));
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  


const fetchCartItemSlice = createSlice({
      name: "cartItem",
      initialState: {
        SelectedCartItem: [],
        isLoading: false,
        iserror: false,
      },

      reducers: {
        resetCartItemState: (state) => {
          state.SelectedCartItem = [];
          state.isLoading = false;
          state.iserror = false;
        },
      },
     
      extraReducers: (builder) => {
        builder
          .addCase(fetchCartItem.pending, (state) => {
            state.isLoading = true;
            state.iserror = false;
          })
          .addCase(fetchCartItem.fulfilled, (state, action) => {
           
            state.SelectedCartItem = action.payload; 
            state.isLoading = false;
            state.iserror = false;
          })
          .addCase(fetchCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.iserror = true;
          })


          .addCase(removeCartItem.pending, (state) => {
            state.isLoading = true;
            state.iserror = false;
          })
          .addCase(removeCartItem.fulfilled, (state) => {
            state.isLoading = false;
            state.iserror = false;
          })
          .addCase(removeCartItem.rejected, (state) => {
            state.isLoading = false;
            state.iserror = true;
          });
          
         
      },
    });
    export const { resetCartItemState } = fetchCartItemSlice.actions;
    export default fetchCartItemSlice.reducer;


