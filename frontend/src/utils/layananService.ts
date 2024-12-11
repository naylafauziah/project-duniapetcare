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

export async function addLayanan({
  namaLayanan,
  description,
  harga,
  img_url,
  tipeLayanan,
}: {
  namaLayanan: string;
  description: string;
  harga: number;
  img_url: string;
  tipeLayanan: string;
}) {
  try {
    const response = await api.post("/layanan", {
      nama_layanan: namaLayanan,
      description: description,
      harga: harga,
      img_url: img_url,
      tipe_layanan: tipeLayanan,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function updateLayanan({
  id,
  namaLayanan,
  description,
  harga,
  img_url,
  tipeLayanan,
}: {
  id: number;
  namaLayanan: string;
  description: string;
  harga: number;
  img_url: string;
  tipeLayanan: string;
}) {
  try {
    const response = await api.patch(`/layanan/${id}`, {
      nama_layanan: namaLayanan,
      description: description,
      harga: harga,
      img_url: img_url,
      tipe_layanan: tipeLayanan,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function deleteLayanan(id: number) {
  try {
    const response = await api.delete(`/layanan/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
