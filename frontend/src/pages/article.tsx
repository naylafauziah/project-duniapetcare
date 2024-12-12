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
  getAllArtikel,
  updateArtikel,
  deleteArtikel,
  addArtikel,
} from "@/utils/artikelService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Artikel = {
  id_artikel: number;
  judul: string;
  content: string;
  comment: [];
  penulis: {
    id_user: number;
    username: string;
    email: string;
    full_name: string;
  };
};

function Article() {
  const [dataArtikel, setDataArtikel] = useState<Artikel | null>(null);
  const [newArtikel, setNewArtikel] = useState({
    judul: "",
    content: "",
  });

  const artikel = useQuery({
    queryKey: ["artikel"],
    queryFn: getAllArtikel,
  });

  const addArtikelMutation = useMutation({
    mutationFn: addArtikel,
    onSuccess: () => {
      artikel.refetch();
    },
  });

  const updateArtikelMutation = useMutation({
    mutationFn: updateArtikel,
    onSuccess: () => {
      artikel.refetch();
    },
  });

  const deleteArtikelMutation = useMutation({
    mutationFn: deleteArtikel,
    onSuccess: () => {
      artikel.refetch();
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addArtikelMutation.mutate({
      judul: newArtikel.judul,
      content: newArtikel.content,
    });
    setNewArtikel({
      judul: "",
      content: "",
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataArtikel) {
      updateArtikelMutation.mutate({
        id: dataArtikel.id_artikel,
        judul: dataArtikel.judul,
        content: dataArtikel.content,
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteArtikelMutation.mutate(id);
  };

  if (artikel.isLoading) {
    return <div>Loading...</div>;
  }

  if (artikel.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center gap-y-3">
      <div className="my-2 flex w-full justify-between">
        <p className="text-2xl font-bold">Artikel</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <span className="text-2xl">+</span>Tambah Artikel
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tambah Artikel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="flex flex-col gap-y-3">
              <Label>Judul Artikel</Label>
              <Input
                type="text"
                value={newArtikel.judul}
                onChange={(e) =>
                  setNewArtikel({ ...newArtikel, judul: e.target.value })
                }
              />
              <Label>Konten Artikel</Label>
              <Textarea
                value={newArtikel.content}
                onChange={(e) =>
                  setNewArtikel({ ...newArtikel, content: e.target.value })
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
        <TableCaption>List Artikel</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Konten</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="flex w-full items-center justify-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artikel.data.map((singleArtikel: Artikel, index: number) => (
            <TableRow key={index}>
              <TableCell>{singleArtikel.id_artikel}</TableCell>
              <TableCell>{singleArtikel.penulis.full_name}</TableCell>
              <TableCell>{singleArtikel.judul}</TableCell>
              <TableCell>{singleArtikel.content}</TableCell>
              <TableCell>{singleArtikel.comment.length}</TableCell>
              <TableCell className="flex w-full items-center justify-center gap-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDataArtikel(singleArtikel);
                      }}
                    >
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Edit Artikel</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleUpdate}
                      className="flex flex-col gap-y-3"
                    >
                      <Label>Judul Artikel</Label>
                      <Input
                        type="text"
                        value={dataArtikel?.judul}
                        onChange={(e) =>
                          setDataArtikel((prev) =>
                            prev ? { ...prev, judul: e.target.value } : null,
                          )
                        }
                      />
                      <Label>Konten Artikel</Label>
                      <Textarea
                        value={dataArtikel?.content}
                        onChange={(e) =>
                          setDataArtikel((prev) =>
                            prev ? { ...prev, content: e.target.value } : null,
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
                        delete your article and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-red-400"
                        onClick={() => handleDelete(singleArtikel.id_artikel)}
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

export default Article;
