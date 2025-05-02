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
import { Trash2, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

function ListUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [role, setRole] = useState<string>();

  const fetchUsers = async () => {
    try {
      const data = await getAllUser();
      setUsers(data);
      setIsError(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id: number, role: string) => {
    try {
      await updateRoleUser({ id, role });
      fetchUsers(); // Refresh the user list
      setRole(undefined);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      <div className="my-2 flex w-full justify-between">
        <p className="text-2xl font-bold">List User</p>
      </div>
      <Table>
        <TableCaption>List User</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Error loading data.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
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
