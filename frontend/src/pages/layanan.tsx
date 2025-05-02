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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

type Layanan = {
  id_layanan: number;
  nama_layanan: string;
  description: string;
  harga: number;
  tipe_layanan: string;
  img_url: string;
};

function Layanan() {
  const [layananData, setLayananData] = useState<Layanan[]>([]);
  const [tipeLayanan, setTipeLayanan] = useState<string>("");
  const [dataLayanan, setDataLayanan] = useState<Layanan | null>(null);
  const [newLayanan, setNewLayanan] = useState({
    nama_layanan: "",
    description: "",
    harga: 0,
    img_url: "",
    tipe_layanan: "",
  });

  useEffect(() => {
    async function fetchLayanan() {
      const response = await fetch("/api/layanan");
      const data = await response.json();
      setLayananData(data);
    }
    fetchLayanan();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/layanan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLayanan),
    });
    setNewLayanan({
      nama_layanan: "",
      description: "",
      harga: 0,
      img_url: "",
      tipe_layanan: "",
    });
    const response = await fetch("/api/layanan");
    const updatedData = await response.json();
    setLayananData(updatedData);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dataLayanan) {
      await fetch(`/api/layanan/${dataLayanan.id_layanan}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_layanan: dataLayanan.nama_layanan,
          description: dataLayanan.description,
          harga: dataLayanan.harga,
          img_url: dataLayanan.img_url,
          tipe_layanan: tipeLayanan,
        }),
      });
      const response = await fetch("/api/layanan");
      const updatedData = await response.json();
      setLayananData(updatedData);
      setDataLayanan(null);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/layanan/${id}`, {
      method: "DELETE",
    });
    const response = await fetch("/api/layanan");
    const updatedData = await response.json();
    setLayananData(updatedData);
  };

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center gap-y-3">
      <div className="my-2 flex w-full justify-between">
        <p className="text-2xl font-bold">Layanan</p>
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
            <TableHead>No</TableHead>
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
          {layananData.map((singleLayanan, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
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
                        value={dataLayanan?.nama_layanan || ""}
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
                        value={dataLayanan?.description || ""}
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
                        value={dataLayanan?.harga || 0}
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
                        value={dataLayanan?.img_url || ""}
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
                          <DropdownMenuLabel>Pilih tipe layanan</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={tipeLayanan}
                            onValueChange={(value) => setTipeLayanan(value)}
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
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDelete(singleLayanan.id_layanan)}
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Layanan;