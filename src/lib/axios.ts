import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API 요청 에러:", error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
