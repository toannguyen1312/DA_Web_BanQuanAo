import { createSlice } from '@reduxjs/toolkit';

const cartUiSlice = createSlice({
  name: 'cartUi',
  initialState: {
    isCartOpen: false
  },
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    }
  }
});

export const { toggleCart, openCart, closeCart } = cartUiSlice.actions;
export default cartUiSlice.reducer;
