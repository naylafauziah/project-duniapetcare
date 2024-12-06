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
  DialogDescription,
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
import { deleteUser, getAllUser, updateRoleUser } from "@/utils/usersService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

function ListUser() {
  const [role, setRole] = useState<string>();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      users.refetch();
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      updateRoleUser({ id: id, role: role }),
    onSuccess: () => {
      users.refetch();
      setRole(undefined);
    },
  });

  const handleEdit = (id: number, role: string) => {
    updateUserRoleMutation.mutate({ id, role });
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="container flex h-full w-full items-center justify-center">
      <Table>
        <TableCaption>List User</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Full name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.isLoading ? (
            <></>
          ) : (
            users.data.map((user: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{user.id_user}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell className="flex w-full items-center justify-center gap-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>
                        <Pencil />
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                      <DialogHeader>
                        <DialogTitle>Update role user</DialogTitle>
                        <DialogDescription>{`Username: ${user.username}`}</DialogDescription>
                        <DialogDescription>{`Email: ${user.email}`}</DialogDescription>
                        <DialogDescription>{`Current role: ${user.role}`}</DialogDescription>
                      </DialogHeader>
                      <DropdownMenu>
                        <Label>Pilih role baru:</Label>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"outline"}>{role}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Pilih role user</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={role}
                            onValueChange={setRole}
                          >
                            <DropdownMenuRadioItem value="user">
                              User
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dokter">
                              Dokter
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
                              handleEdit(user.id_user, role ?? "user")
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
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-red-400"
                          onClick={() => handleDelete(user.id_user)}
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

export default ListUser;
