import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Set the base URL for your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;