
import { combineReducers } from "redux";
import { persistReducer, createTransform  } from "redux-persist";
import registerReducer from "./registerSlice"
import getProduct from "./productReducer"
import authReducer  from "./authSlice"
import selectProduct  from "./selectedProduct"
import storage from "redux-persist/lib/storage";
import wishlist from "./wishlistReducer"
import SelectedWishList from "./selectedWishList"
import cartUiReducer from "./cartOpen"; 
import cartItems  from "./cartItem"

import SelectedCartItem from "./selectedCartItem"

// Dùng để gộp nhiều reducer thành một rootReducer
const rootReducer = combineReducers({
    register: registerReducer,
    auth: authReducer,
    getProduct: getProduct,
    selectProduct: selectProduct,
    // wishList
    wishlist: wishlist,
    fetchWishListSlice: SelectedWishList,
    cartUi: cartUiReducer,
    //cartItem
    cartItem: cartItems,
    fetchCartItemSlice: SelectedCartItem

});


const authTransform = createTransform(
  (inboundState, key) => {
    if (inboundState.shouldPersist) {
      return { token: inboundState.token, shouldPersist: true };
    }
    return { token: null, shouldPersist: false }; 
  },
  (outboundState) => outboundState,
  { whitelist: ['auth'] }
);


const persistConfig = {
  key: "root",
  storage,
  transforms: [authTransform],
  // whitelist: ['auth'],
};


// Dùng để bọc rootReducer giúp Redux Persist lưu trữ dữ liệu.  
export default persistReducer(persistConfig, rootReducer);
