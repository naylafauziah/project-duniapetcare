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
import { Trash2, Pencil } from "lucide-react";
import {
  addLayanan,
  deleteLayanan,
  getAllLayanan,
  updateLayanan,
} from "@/utils/layananService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Layanan = {
  id_layanan: number;
  nama_layanan: string;
  description: string;
  harga: number;
  tipe_layanan: string;
  img_url: string;
};

function Layanan() {
  const [tipeLayanan, setTipeLayanan] = useState<string>("");
  const [dataLayanan, setDataLayanan] = useState<Layanan | null>();
  const [newLayanan, setNewLayanan] = useState({
    nama_layanan: "",
    description: "",
    harga: 0,
    img_url: "",
    tipe_layanan: "",
  });

  const layanan = useQuery({
    queryKey: ["layanan"],
    queryFn: getAllLayanan,
  });

  const addLayananMutation = useMutation({
    mutationFn: addLayanan,
    onSuccess: () => {
      layanan.refetch();
    },
  });

  const updateLayananMutation = useMutation({
    mutationFn: updateLayanan,
    onSuccess: () => {
      layanan.refetch();
    },
  });

  const deleteLayananMutation = useMutation({
    mutationFn: deleteLayanan,
    onSuccess: () => {
      layanan.refetch();
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addLayananMutation.mutate({
      namaLayanan: newLayanan.nama_layanan,
      description: newLayanan.description,
      harga: newLayanan.harga,
      img_url: newLayanan.img_url,
      tipeLayanan: newLayanan.tipe_layanan,
    });
    setNewLayanan({
      nama_layanan: "",
      description: "",
      harga: 0,
      img_url: "",
      tipe_layanan: "",
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataLayanan) {
      updateLayananMutation.mutate({
        id: dataLayanan.id_layanan,
        namaLayanan: dataLayanan.nama_layanan,
        description: dataLayanan.description,
        harga: dataLayanan.harga,
        img_url: dataLayanan.img_url,
        tipeLayanan: tipeLayanan,
      });
    }
    console.log(dataLayanan);
  };

  const handleDelete = (id: number) => {
    deleteLayananMutation.mutate(id);
  };

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center gap-y-3">
      <div className="flex w-full justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <span className="text-2xl">+</span>Tambah Layanan
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tambah Layanan</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="flex flex-col gap-y-3">
              <Label>Nama Layanan</Label>
              <Input
                type="text"
                value={newLayanan.nama_layanan}
                onChange={(e) =>
                  setNewLayanan({ ...newLayanan, nama_layanan: e.target.value })
                }
              />
              <Label>Deskripsi Layanan</Label>
              <Textarea
                value={newLayanan.description}
                onChange={(e) =>
                  setNewLayanan({ ...newLayanan, description: e.target.value })
                }
              />
              <Label>Harga Layanan (dalam Rupiah)</Label>
              <Input
                type="number"
                value={newLayanan.harga}
                onChange={(e) =>
                  setNewLayanan({
                    ...newLayanan,
                    harga: parseInt(e.target.value),
                  })
                }
              />
              <Label>Image url</Label>
              <Input
                type="text"
                value={newLayanan.img_url}
                onChange={(e) =>
                  setNewLayanan({ ...newLayanan, img_url: e.target.value })
                }
              />
              <DropdownMenu>
                <Label>Tipe Layanan</Label>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>{newLayanan.tipe_layanan}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Pilih tipe layanan</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={newLayanan.tipe_layanan}
                    onValueChange={(value) =>
                      setNewLayanan({ ...newLayanan, tipe_layanan: value })
                    }
                  >
                    <DropdownMenuRadioItem value="grooming">
                      Grooming
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="konsultasi">
                      Konsultasi
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
        <TableCaption>List Layanan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead className="flex w-full items-center justify-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {layanan.isLoading ? (
            <></>
          ) : (
            layanan.data.map((singleLayanan: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{singleLayanan.id_layanan}</TableCell>
                <TableCell>{singleLayanan.nama_layanan}</TableCell>
                <TableCell>{singleLayanan.description}</TableCell>
                <TableCell>{`Rp.${singleLayanan.harga}`}</TableCell>
                <TableCell>{singleLayanan.tipe_layanan}</TableCell>
                <TableCell className="max-w-20 truncate">
                  {singleLayanan.img_url}
                </TableCell>
                <TableCell className="flex w-full items-center justify-center gap-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setDataLayanan(singleLayanan);
                          setTipeLayanan(singleLayanan.tipe_layanan);
                        }}
                      >
                        <Pencil />
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                      <DialogHeader>
                        <DialogTitle>Edit Layanan</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleUpdate}
                        className="flex flex-col gap-y-3"
                      >
                        <Label>Nama Layanan</Label>
                        <Input
                          type="text"
                          value={dataLayanan?.nama_layanan}
                          onChange={(e) =>
                            setDataLayanan((prev) =>
                              prev
                                ? { ...prev, nama_layanan: e.target.value }
                                : null,
                            )
                          }
                        />
                        <Label>Deskripsi Layanan</Label>
                        <Textarea
                          value={dataLayanan?.description}
                          onChange={(e) =>
                            setDataLayanan((prev) =>
                              prev
                                ? { ...prev, description: e.target.value }
                                : null,
                            )
                          }
                        />
                        <Label>Harga Layanan (dalam Rupiah)</Label>
                        <Input
                          type="number"
                          value={dataLayanan?.harga}
                          onChange={(e) =>
                            setDataLayanan((prev) =>
                              prev
                                ? { ...prev, harga: parseInt(e.target.value) }
                                : null,
                            )
                          }
                        />
                        <Label>Image url</Label>
                        <Input
                          type="text"
                          value={dataLayanan?.img_url}
                          onChange={(e) =>
                            setDataLayanan((prev) =>
                              prev
                                ? { ...prev, img_url: e.target.value }
                                : null,
                            )
                          }
                        />
                        <DropdownMenu>
                          <Label>Tipe Layanan</Label>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"outline"}>{tipeLayanan}</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>
                              Pilih tipe layanan
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={tipeLayanan}
                              onValueChange={setTipeLayanan}
                            >
                              <DropdownMenuRadioItem value="grooming">
                                Grooming
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="konsultasi">
                                Konsultasi
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-red-400"
                          onClick={() => handleDelete(singleLayanan.id_layanan)}
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

export default Layanan;
