import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { AvatarImage } from "@radix-ui/react-avatar";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-fit w-full">
        <p className="p-5 text-3xl font-semibold">Profile</p>
      </div>
      <div className="container flex h-full w-full items-center justify-center">
        <Card className="h-fit w-fit">
          <CardHeader className="flex items-center justify-center">
            <Avatar className="size-48">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Loading...</AvatarFallback>
            </Avatar>
          </CardHeader>
          <Separator />
          <CardContent>
            <div>
              <p>{`Full Name: ${user?.full_name}`}</p>
              <p>{`Username: ${user?.username}`}</p>
              <p>{`Email: ${user?.email}`}</p>
              <p>{`Phone Number: ${user?.phone_number}`}</p>
              <p>{`Role: ${user?.role}`}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
