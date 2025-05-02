import { Navbar } from "@/components/landing-page/Navbar";
import { getAllBooking } from "@/utils/bookingService";
import { useEffect, useState } from "react";

function History() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBooking();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container flex flex-col gap-y-5">
        <p className="mt-5 text-2xl font-bold">Booking History</p>

        {isLoading ? (
          <></>
        ) : (
          bookings.map((booking: any, index: number) => (
            <div key={index}>
              <div className="grid h-20 w-full grid-flow-col grid-cols-10 border bg-primary-foreground font-mono text-sm font-semibold">
                <div className="col-span-2">
                  <div className="flex h-full w-full flex-col items-start justify-center pl-5">
                    <p>Appointment Date</p>
                    <p>
                      {new Date(booking?.appointment_date).toLocaleString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex h-full w-full flex-col items-start justify-center pl-5">
                    <p>Booking Number</p>
                    <p>{booking?.id_booking}</p>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex h-full w-full flex-col items-start justify-center pl-5">
                    <p>Total</p>
                    <p>{`Rp.${booking?.total_price}`}</p>
                  </div>
                </div>
              </div>
              <div className="grid h-52 w-full grid-flow-col grid-cols-10 border">
                <div className="col-span-2 overflow-hidden">
                  <img
                    className="flex h-full w-full items-center justify-center object-cover p-3"
                    src={booking?.layanan?.img_url}
                  />
                </div>
                <div className="col-span-4 p-5 text-sm">
                  <p>{`Nama: ${booking?.hewan?.nama_hewan}`}</p>
                  <p>{`Species: ${booking?.hewan?.species}`}</p>
                  <p>{`Breed: ${booking?.hewan?.breed}`}</p>
                  <p>{`Age: ${booking?.hewan?.age}`}</p>
                  <p>{`Weight: ${booking?.hewan?.weight}`}</p>
                  <br />
                  <p>{`Layanan: ${booking?.layanan?.nama_layanan}`}</p>
                  <p>{`Dokter: ${booking?.dokter?.users?.full_name}`}</p>
                </div>
                <div className="col-span-4 p-5">
                  <p>{booking?.status}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;