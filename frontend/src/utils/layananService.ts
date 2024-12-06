import api from "./axios";

export async function getAllLayanan() {
  try {
    const response = await api.get("/layanan");
    console.log(response.data.user);
    return response.data.layanan;
  } catch (error: any) {
    throw error.response.data;
  }
}
