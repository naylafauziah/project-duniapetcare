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
import { useQuery, useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

  const dokter = useQuery({
    queryKey: ["dokter"],
    queryFn: getAllDokter,
  });

  const users = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  const addDokterMutation = useMutation({
    mutationFn: addDokter,
    onSuccess: () => {
      dokter.refetch();
    },
  });

  const updateDokterMutation = useMutation({
    mutationFn: updateDokter,
    onSuccess: () => {
      dokter.refetch();
    },
  });

  const deleteDokterMutation = useMutation({
    mutationFn: deleteDokter,
    onSuccess: () => {
      dokter.refetch();
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addDokterMutation.mutate({
      id_user: parseInt(userId),
      spesialisasi: newDokter.spesialisasi,
      experience_years: newDokter.experience_years,
      rating: newDokter.rating,
    });
    setNewDokter({
      id_user: 0,
      spesialisasi: "",
      experience_years: 0,
      rating: 0,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataDokter) {
      updateDokterMutation.mutate({
        id: dataDokter.id_dokter,
        spesialisasi: dataDokter.spesialisasi,
        experience_years: dataDokter.experience_years,
        rating: dataDokter.rating,
      });
      console.log(dataDokter);
    }
  };

  const handleDelete = (id: number) => {
    deleteDokterMutation.mutate(id);
  };

  //   if (dokter.isLoading) {
  //     return <div>Loading...</div>;
  //   }

  if (dokter.isError || users.isError) {
    return <div>Error loading data</div>;
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
                    {users.data.find((user: any) => user.id_user === userId)
                      ?.full_name || ""}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pilih Akun User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={userId}
                    onValueChange={setUserId}
                  >
                    {users.data.map((user: any, index: number) => (
                      <DropdownMenuRadioItem key={index} value={user.id_user}>
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
          {dokter.isLoading || users.isLoading ? (
            <></>
          ) : (
            dokter.data.map((singleDokter: Dokter, index: number) => (
              <TableRow key={index}>
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
                          value={dataDokter?.spesialisasi}
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
                          value={dataDokter?.experience_years}
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
                          value={dataDokter?.rating}
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
                          delete your doctor and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-red-400"
                          onClick={() => handleDelete(singleDokter.id_dokter)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Dokter;
