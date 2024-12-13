import api from "./axios";

type EditDokterParams = {
  id: number;
  spesialisasi: string;
  experience_years: number;
  rating: number;
};

type AddDokterParams = {
  id_user: number;
  spesialisasi: string;
  experience_years: number;
  rating: number;
};

export async function addDokter({
  id_user,
  spesialisasi,
  experience_years,
  rating,
}: AddDokterParams) {
  try {
    const response = await api.post("/dokter", {
      id_user: id_user,
      spesialisasi: spesialisasi,
      experience_years: experience_years,
      rating: rating,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function getAllDokter() {
  try {
    const response = await api.get("/dokter");
    return response.data.dokter;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function updateDokter({
  id,
  spesialisasi,
  experience_years,
  rating,
}: EditDokterParams) {
  try {
    const response = await api.patch(`/dokter/${id}`, {
      spesialisasi: spesialisasi,
      experience_years: experience_years,
      rating: rating,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function deleteDokter(id: number) {
  try {
    const response = await api.delete(`/dokter/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
