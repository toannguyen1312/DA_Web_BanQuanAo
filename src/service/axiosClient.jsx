
// import axios from "axios";
// import { store } from "../store/store";
// import { refreshToken, logout } from "./authSlice";

// const API = axios.create({
//     baseURL: "http://localhost:8080/api",
// });

// // Interceptor cho request: Thêm access token vào header
// API.interceptors.request.use(
//     (config) => {
//         const token = store.getState().auth.token;
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


// // Response: Tự động refresh nếu token hết hạn
// API.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 // Gọi API refresh token
//                 await store.dispatch(refreshToken()).unwrap();
//                 const newToken = store.getState().auth.token;
//                 originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                 return API(originalRequest); // Retry request
//             } catch (refreshErr) {
//                 store.dispatch(logout()); // Nếu refresh token thất bại, logout
//                 return Promise.reject(refreshErr);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default API;
