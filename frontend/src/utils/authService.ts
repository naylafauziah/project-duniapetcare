import api from "./axios";
import { AxiosResponse } from "axios";

export type RegisterProps = {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  role: "user" | "dokter" | "admin";
};

// Fungsi login user
export const loginUser = async (formData: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/auth/login", formData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    console.log("User logged in:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error.response.data);
    throw error.response.data;
  }
};

export const register = async ({
  email,
  username,
  password,
  full_name,
  phone_number,
  role,
}: RegisterProps) => {
  try {
    const response = await api.post("/auth/register", {
      full_name: full_name,
      username: username,
      email: email,
      password: password,
      phone_number: phone_number,
      role: role ?? "user",
    });
    return response.data
  } catch (error: any) {
    console.error("Error during login:", error.response.data);
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const checkIsAuthenticated = async () => {
  try {
    const response = await api.get("/auth/me");
    console.log(response.data.user);
    return response.data.user;
  } catch (error: any) {
    throw error.response.data;
  }
};
