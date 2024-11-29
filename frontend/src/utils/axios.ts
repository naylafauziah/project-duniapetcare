import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Ganti dengan URL backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware untuk menambahkan token jika ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
