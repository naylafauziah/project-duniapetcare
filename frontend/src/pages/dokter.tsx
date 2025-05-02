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
import { Trash2, Pencil } from "lucide-react";
import {
  getAllDokter,
  updateDokter,
  deleteDokter,
  addDokter,
} from "@/utils/dokterService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getAllUser } from "@/utils/usersService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Dokter = {
  id_dokter: number;
  spesialisasi: string;
  experience_years: number;
  rating: number;
  users: User;
};

type User = {
  id_user: number;
  username: string;
  email: string;
  full_name: string;
};

function Dokter() {
  const [dataDokter, setDataDokter] = useState<Dokter | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [newDokter, setNewDokter] = useState({
    id_user: 0,
    spesialisasi: "",
    experience_years: 0,
    rating: 0,
  });
  const [dokterData, setDokterData] = useState<Dokter[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dokterResponse = await getAllDokter();
        const usersResponse = await getAllUser();
        setDokterData(dokterResponse);
        setUsersData(usersResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDokter({
        id_user: parseInt(userId),
        spesialisasi: newDokter.spesialisasi,
        experience_years: newDokter.experience_years,
        rating: newDokter.rating,
      });
      const updatedDokter = await getAllDokter();
      setDokterData(updatedDokter);
    } catch (error) {
      console.error("Error adding dokter:", error);
    } finally {
      setNewDokter({
        id_user: 0,
        spesialisasi: "",
        experience_years: 0,
        rating: 0,
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dataDokter) {
      try {
        await updateDokter({
          id: dataDokter.id_dokter,
          spesialisasi: dataDokter.spesialisasi,
          experience_years: dataDokter.experience_years,
          rating: dataDokter.rating,
        });
        const updatedDokter = await getAllDokter();
        setDokterData(updatedDokter);
      } catch (error) {
        console.error("Error updating dokter:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDokter(id);
      const updatedDokter = await getAllDokter();
      setDokterData(updatedDokter);
    } catch (error) {
      console.error("Error deleting dokter:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center gap-y-3">
      <div className="my-2 flex w-full justify-between">
        <p className="text-2xl font-bold">Dokter</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <span className="text-2xl">+</span>Tambah Dokter
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tambah Dokter</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="flex flex-col gap-y-3">
              <Label>User</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>
                    {usersData.find((user) => user.id_user === parseInt(userId))?.full_name || ""}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pilih Akun User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={userId}
                    onValueChange={setUserId}
                  >
                    {usersData.map((user, index) => (
                      <DropdownMenuRadioItem key={index} value={user.id_user.toString()}>
                        {user.full_name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Label>Spesialisasi</Label>
              <Input
                type="text"
                value={newDokter.spesialisasi}
                onChange={(e) =>
                  setNewDokter({ ...newDokter, spesialisasi: e.target.value })
                }
              />
              <Label>Pengalaman (tahun)</Label>
              <Input
                type="number"
                value={newDokter.experience_years}
                onChange={(e) =>
                  setNewDokter({
                    ...newDokter,
                    experience_years: parseInt(e.target.value),
                  })
                }
              />
              <Label>Rating</Label>
              <Input
                type="number"
                value={newDokter.rating}
                onChange={(e) =>
                  setNewDokter({
                    ...newDokter,
                    rating: parseFloat(e.target.value),
                  })
                }
              />
              <div className="flex w-full items-center justify-center gap-x-3">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Confirm</Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>List Dokter</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Spesialisasi</TableHead>
            <TableHead>Pengalaman (tahun)</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="flex w-full items-center justify-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dokterData.map((singleDokter, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{singleDokter.id_dokter}</TableCell>
              <TableCell>{singleDokter.users.full_name}</TableCell>
              <TableCell>{singleDokter.spesialisasi}</TableCell>
              <TableCell>{singleDokter.experience_years}</TableCell>
              <TableCell>{singleDokter.rating}</TableCell>
              <TableCell className="flex w-full items-center justify-center gap-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDataDokter(singleDokter);
                      }}
                    >
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Edit Dokter</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleUpdate}
                      className="flex flex-col gap-y-3"
                    >
                      <Label>Spesialisasi</Label>
                      <Input
                        type="text"
                        value={dataDokter?.spesialisasi || ""}
                        onChange={(e) =>
                          setDataDokter((prev) =>
                            prev
                              ? { ...prev, spesialisasi: e.target.value }
                              : null,
                          )
                        }
                      />
                      <Label>Pengalaman (tahun)</Label>
                      <Input
                        type="number"
                        value={dataDokter?.experience_years || 0}
                        onChange={(e) =>
                          setDataDokter((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  experience_years: parseInt(e.target.value),
                                }
                              : null,
                          )
                        }
                      />
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        value={dataDokter?.rating || 0}
                        onChange={(e) =>
                          setDataDokter((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  rating: parseFloat(e.target.value),
                                }
                              : null,
                          )
                        }
                      />
                      <div className="flex w-full items-center justify-center gap-x-3">
                        <DialogClose asChild>
                          <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit">Confirm</Button>
                        </DialogClose>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDataDokter(singleDokter);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Apakah kamu yakin ingin menghapus data ini?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(singleDokter.id_dokter)}
                      >
                        Confirm
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

export default Dokter;
