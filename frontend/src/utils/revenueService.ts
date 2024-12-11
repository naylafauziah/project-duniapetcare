import api from "./axios";

export async function getRevenue() {
  try {
    const response = await api.get("/pendapatan");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
