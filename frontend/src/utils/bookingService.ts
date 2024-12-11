import api from "./axios";

type PostBooking = {
  idHewan: number;
  idLayanan: number;
  idDokter: number;
  totalPrice: number;
  notes: string;
  appointmentDate: Date;
};

type UpdateBookingStatus = {
  id: number;
  status: string;
};

export async function postBooking({
  appointmentDate,
  idHewan,
  idLayanan,
  idDokter,
  notes,
  totalPrice,
}: PostBooking) {
  try {
    const response = await api.post("/booking", {
      id_hewan: idHewan,
      id_layanan: idLayanan,
      id_dokter: idDokter,
      total_price: totalPrice,
      notes,
      appointment_date: appointmentDate,
    });
    return response.data.booking;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function getAllBooking() {
  try {
    const response = await api.get("/booking");
    return response.data.bookings;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function updateBookingStatus({ id, status }: UpdateBookingStatus) {
  try {
    const response = await api.post(`/booking/status/${id}`, {
      status: status,
    });
    return response.data.booking;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function deleteBooking(id: number) {
  try {
    const response = await api.delete(`/booking/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
