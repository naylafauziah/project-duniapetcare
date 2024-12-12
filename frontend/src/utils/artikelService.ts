import api from "./axios";

type UpdateArtikelParams = {
  id: number;
  judul: string;
  content: string;
};

export async function getAllArtikel() {
  try {
    const response = await api.get("/artikel");
    return response.data.artikel;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function addArtikel({
  judul,
  content,
}: {
  judul: string;
  content: string;
}) {
  try {
    const response = await api.post("/artikel", {
      judul: judul,
      content: content,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function updateArtikel({
  id,
  judul,
  content,
}: UpdateArtikelParams) {
  try {
    const response = await api.patch(`/artikel/${id}`, {
      judul: judul,
      content: content,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function deleteArtikel(id: number) {
  try {
    const response = await api.delete(`/artikel/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
