import api from "./axios";

type PostBooking = {
  idHewan: number;
  idLayanan: number;
  idDokter: number;
  totalPrice: number;
  notes: string;
  appointmentDate: Date;
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
    return response.data.booking
  } catch (error: any) {
    throw error.response.data;
  }
}
