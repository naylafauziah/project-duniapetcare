import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SiFacebook,
  SiGoogle,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { Input } from "@/components/ui/input";
import { register, RegisterProps } from "@/utils/authService";
import { useToast } from "@/hooks/use-toast";

function Register() {
  const navigate = useNavigate();
  const {toast} = useToast()
  const [userData, setUserData] = useState<RegisterProps>({
    full_name: "",
    phone_number: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await register(userData);
      toast({
        title: "Login success",
        variant: "default",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: "Login failed",
        variant: "destructive",
      });
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-[80vh] w-[80vw] shadow-2xl">
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-8 bg-primary">
          <p className="text-5xl font-bold text-secondary">Welcome Back!</p>
          <p className="text-center text-lg text-secondary">
            <span>To keep connected with us please login</span>
            <br />
            <span>with personal info</span>
          </p>
          <Button
            onClick={() => navigate("/login")}
            variant={"outline"}
            className="w-40 rounded-full bg-primary font-bold text-secondary"
          >
            SIGN IN
          </Button>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-5">
          <p className="text-5xl font-bold">Create Account</p>
          <div className="flex gap-x-5">
            <Button variant={"outline"} className="size-11 rounded-full">
              <SiFacebook />
            </Button>
            <Button variant={"outline"} className="size-11 rounded-full">
              <SiGoogle />
            </Button>
            <Button variant={"outline"} className="size-11 rounded-full">
              <SiLinkedin />
            </Button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-80 flex-col items-center justify-center gap-y-3"
          >
            <p className="text-gray-400">or use your email for registration</p>
            <Input
              type="number"
              placeholder="Phone number"
              name="phone_number"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Full name"
              name="full_name"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Username"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="w-40 rounded-full bg-primary font-bold text-secondary"
            >
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
