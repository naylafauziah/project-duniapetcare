import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import {
  SiFacebook,
  SiGoogle,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { loginUser } from "@/utils/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      const userData = await loginUser(formData);
      toast({
        title: "Login success",
        variant: "default",
      });
      console.log("User logged in:", userData);
    } catch (error) {
      console.log(error);
      toast({
        title: "Login failed",
        variant: "destructive",
      });
    } finally {
      await refreshAuth();
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bggree">
      <div className="flex h-[80vh] w-[80vw] shadow-2xl">
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-5">
          <p className="text-5xl font-bold">Sign in to petcare</p>
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button
              type="submit"
              className="w-40 rounded-full bg-primary font-bold text-secondary"
            >
              SIGN IN
            </Button>
          </form>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-8 bg-primary">
          <p className="text-5xl font-bold text-secondary">Hello, Friend!</p>
          <p className="text-center text-lg text-secondary">
            <span>Enter your personal details and start your</span>
            <br />
            <span>journey with us</span>
          </p>
          <Button
            onClick={() => navigate("/register")}
            variant={"outline"}
            className="w-40 rounded-full bg-primary font-bold text-secondary"
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
