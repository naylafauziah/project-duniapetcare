import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getAllBooking,
  updateBookingStatus,
  deleteBooking,
} from "@/utils/bookingService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

function Booking() {
  const [status, setStatus] = useState<string>();

  const bookings = useQuery({
    queryKey: ["booking"],
    queryFn: getAllBooking,
  });

  const updateBookingStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateBookingStatus({ id, status }),
    onSuccess: () => {
      bookings.refetch();
      setStatus(undefined);
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () => {
      bookings.refetch();
    },
  });

  const handleUpdateStatus = (id: number, status: string) => {
    updateBookingStatusMutation.mutate({ id, status });
  };

  const handleDelete = (id: number) => {
    deleteBookingMutation.mutate(id);
  };

  if (bookings.isLoading) {
    return <div>Loading...</div>;
  }

  if (bookings.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="container flex h-full w-full items-center flex-col justify-center">
      <div className="my-2 flex w-full justify-between">
        <p className="text-2xl font-bold">Booking</p>
      </div>
      <Table>
        <TableCaption>List Booking</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Hewan</TableHead>
            <TableHead>Layanan</TableHead>
            <TableHead>Dokter</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.data.map((booking: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{booking.id_booking}</TableCell>
              <TableCell>{booking.hewan.nama_hewan}</TableCell>
              <TableCell>{booking.layanan?.nama_layanan || "N/A"}</TableCell>
              <TableCell>{booking.dokter.users.full_name}</TableCell>
              <TableCell>{`Rp.${booking.total_price}`}</TableCell>
              <TableCell>{booking.notes}</TableCell>
              <TableCell>
                {new Date(booking.appointment_date).toLocaleString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell className="flex w-full items-center justify-center gap-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Update Booking Status</DialogTitle>
                      <Label>{`Hewan: ${booking.hewan.nama_hewan}`}</Label>
                      <Label>{`Layanan: ${booking.layanan?.nama_layanan || "N/A"}`}</Label>
                      <Label>{`Dokter: ${booking.dokter.users.full_name}`}</Label>
                      <Label>{`Current Status: ${booking.status}`}</Label>
                    </DialogHeader>
                    <DropdownMenu>
                      <Label>Pilih status baru:</Label>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>{status}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Pilih status booking
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={status}
                          onValueChange={setStatus}
                        >
                          <DropdownMenuRadioItem value="pending">
                            Pending
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="confirmed">
                            Confirmed
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="completed">
                            Completed
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="canceled">
                            Canceled
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center justify-center gap-x-3">
                      <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant={"default"}
                          onClick={() =>
                            handleUpdateStatus(
                              booking.id_booking,
                              status ?? "pending",
                            )
                          }
                        >
                          Confirm
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"}>
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your booking and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-red-400"
                        onClick={() => handleDelete(booking.id_booking)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Booking;
