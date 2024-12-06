import api from "./axios";

export async function getAllUser() {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function updateRoleUser({
  id,
  role,
}: {
  id: number;
  role: string;
}) {
  try {
    const response = await api.patch(`/user/${id}`, {
      role: role,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.date;
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
