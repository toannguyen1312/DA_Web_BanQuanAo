
import { combineReducers } from "redux";
import { persistReducer, createTransform  } from "redux-persist";
import registerReducer from "./registerSlice"
import authReducer  from "./authSlice"
import storage from "redux-persist/lib/storage";


// Dùng để gộp nhiều reducer thành một rootReducer
const rootReducer = combineReducers({
    register: registerReducer,
    auth: authReducer

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
};


// Dùng để bọc rootReducer giúp Redux Persist lưu trữ dữ liệu.  
export default persistReducer(persistConfig, rootReducer);
