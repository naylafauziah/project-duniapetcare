import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AvatarImage } from "@radix-ui/react-avatar";

function Profile() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-fit w-full">
        <p className="p-5 text-3xl font-semibold">Profile</p>
      </div>
      <div className="flex h-full w-full">
        <div className="h-full w-1/3 p-10">
          <Card>
            <CardHeader className="flex items-center justify-center">
              <Avatar className="size-48">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Loading...</AvatarFallback>
              </Avatar>
            </CardHeader>
            <Separator />
            <CardContent>
              <p>ini username</p>
              <p>ini email</p>
              <p>ini email</p>
              <p>ini email</p>
              <p>ini email</p>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-2/3 p-10 pl-0">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <form className="flex gap-3 flex-col">
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
                <Button type="submit">Update</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
