import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { getAllDokter } from "@/utils/dokterService";
import { postHewan } from "@/utils/hewanServices";
import { postBooking } from "@/utils/bookingService";

type PetcareCardProps = {
  id_layanan: number;
  nama_layanan: string;
  description: string;
  harga: number;
  tipe_layanan: string;
  img_url: string;
};

type FormHewanData = {
  namaHewan: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
};

function PetcareCard({ layanan }: { layanan: PetcareCardProps }) {
  const [idDokter, setIdDokter] = useState<string | undefined>();
  const [namaDokter, setNamaDokter] = useState("");
  const [species, setSpecies] = useState<string>("other");
  const [notes, setNotes] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [formHewanData, setFormHewanData] = useState<FormHewanData>({
    namaHewan: "",
    species: "other",
    breed: "",
    age: 0,
    weight: 0,
  });

  const queryDokter = useQuery({
    queryKey: ["dokter"],
    queryFn: getAllDokter,
  });

  const mutationHewan = useMutation({ mutationFn: postHewan });
  const mutationBooking = useMutation({ mutationFn: postBooking });

  const handleSubmit = () => {
    // e.preventDefault();
    mutationHewan.mutate(formHewanData, {
      onSuccess: (data) => {
        mutationBooking.mutate({
          idDokter: parseInt(idDokter!),
          idHewan: data.id_hewan,
          idLayanan: layanan.id_layanan,
          notes: notes,
          totalPrice: layanan.harga,
          appointmentDate: new Date(appointmentDate),
        });
        window.location.reload();
      },
    });
  };

  return (
    <div className="h-fit w-64 overflow-hidden rounded-lg shadow-xl">
      <img src={layanan.img_url} className="h-40 w-64 object-cover" />
      <div className="flex flex-col gap-4 p-3">
        <p className="font-bold">{layanan.nama_layanan}</p>
        <p className="truncate ">{layanan.description}</p>
        <p>{layanan.harga}</p>
        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Button className="w-full">Book</Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>{`book ${layanan.nama_layanan}`}</DialogTitle>
            </DialogHeader>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <Label>Nama hewan</Label>
                <Input
                  type="text"
                  required
                  value={formHewanData.namaHewan}
                  onChange={(e) =>
                    setFormHewanData({
                      ...formHewanData,
                      namaHewan: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Species</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="w-full">
                      {species}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Pilih Species</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={species}
                      onValueChange={(value) => {
                        setSpecies(value);
                        setFormHewanData({
                          ...formHewanData,
                          species: value,
                        });
                      }}
                    >
                      <DropdownMenuRadioItem value="cat">
                        cat
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dog">
                        dog
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="other">
                        other
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label>Breed</Label>
                <Input
                  type="text"
                  required
                  value={formHewanData.breed}
                  onChange={(e) =>
                    setFormHewanData({
                      ...formHewanData,
                      breed: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  required
                  value={formHewanData.age}
                  onChange={(e) =>
                    setFormHewanData({
                      ...formHewanData,
                      age: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Weight</Label>
                <Input
                  type="number"
                  required
                  value={formHewanData.weight}
                  onChange={(e) =>
                    setFormHewanData({
                      ...formHewanData,
                      weight: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Dokter</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="w-full">
                      {namaDokter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52">
                    <DropdownMenuLabel>
                      Pilih dokter yang tersedia
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={idDokter}
                      onValueChange={(value: any) => {
                        setIdDokter(value.id_dokter);
                        setNamaDokter(value.users.full_name);
                      }}
                    >
                      {queryDokter.isLoading ? (
                        <></>
                      ) : (
                        queryDokter.data.map((dokter: any, index: number) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={dokter}
                          >{`Dokter ${dokter.users.full_name}, spesialis ${dokter.spesialisasi}`}</DropdownMenuRadioItem>
                        ))
                      )}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Notes for doctor..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div>
                <Label>Appointment Date</Label>
                <Input
                  type="datetime-local"
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Save</Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogTitle>Konfirmasi Booking</DialogTitle>
                  <p>{`Nama hewan: ${formHewanData.namaHewan}`}</p>
                  <p>{`Species: ${formHewanData.species}`}</p>
                  <p>{`Breed: ${formHewanData.breed}`}</p>
                  <p>{`Age: ${formHewanData.age}`}</p>
                  <p>{`Weight: ${formHewanData.weight}`}</p>
                  <p>{`Dokter: ${namaDokter}`}</p>
                  <p>{`Notes: ${notes}`}</p>
                  <p>{`Appointment Date: ${
                    appointmentDate
                      ? new Date(appointmentDate).toLocaleString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Not provided"
                  }`}</p>
                  <div className="flex w-full items-center justify-center gap-x-10">
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={mutationHewan.isPending}
                      >
                        Confirm
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default PetcareCard;
