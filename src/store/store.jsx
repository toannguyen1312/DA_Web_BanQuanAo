import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import { persistStore } from "redux-persist";
const store = configureStore({
    reducer: 
       rootReducer,
       middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST"], // Bỏ qua cảnh báo cho persist
          },
        }),

  });

  // Kết nối Redux Store với redux-persist để tự động lưu dữ liệu vào localStorage.
  const persistor = persistStore(store);

  export { store, persistor };


  