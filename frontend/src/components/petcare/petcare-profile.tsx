import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";
import { CircleUserRound } from "lucide-react";

function PetcareProfile() {
  const { user } = useAuth();
  return (
    <Popover>
      <PopoverTrigger>
        <CircleUserRound />
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <p className="flex justify-center text-lg font-bold">
            {user?.full_name}
          </p>
          <p>Username</p>
          <p className="rounded-md border border-blue-400 px-2 py-1 h-8">
            {" "}
            {user?.username}
          </p>
          <p>Email</p>
          <p className="rounded-md border border-blue-400 px-2 py-1">
            {user?.email}
          </p>
          <p>Phone Number</p>
          <p className="rounded-md border border-blue-400 px-2 py-1">
            {user?.phone_number}
          </p>
          <p>Role</p>
          <p className="rounded-md border border-blue-400 px-2 py-1">
            {user?.role}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PetcareProfile;
