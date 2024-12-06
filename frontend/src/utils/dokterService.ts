import api from "./axios";

export async function getAllDokter() {
  try {
    const response = await api.get("/dokter");
    return response.data.dokter;
  } catch (error: any) {
    throw error.response.data;
  }
}
