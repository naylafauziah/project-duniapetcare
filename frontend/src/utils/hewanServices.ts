import api from "./axios";

type PostHewanProps = {
  namaHewan: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
};

export async function getAllHewan() {
  try {
    const response = await api.get("/hewan");
    return response.data.hewan;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function postHewan({
  namaHewan,
  species,
  breed,
  age,
  weight,
}: PostHewanProps) {
  try {
    const response = await api.post("/hewan", {
      nama_hewan: namaHewan,
      species,
      breed,
      age,
      weight,
    });
    return response.data.hewan;
  } catch (error: any) {
    throw error.response.data;
  }
}
