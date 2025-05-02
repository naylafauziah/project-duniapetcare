import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { loginUser } from "@/utils/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import illustration from "@/assets/illustration.svg";

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
    <div className="flex h-screen w-screen items-center justify-center bg-primary-foreground">
      <div className="flex h-full w-full">
        {/* Left Section */}
        <div className="flex lg:w-1/2 w-screen flex-col items-center justify-center px-12">
          <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
          <p className="text-gray-500 mb-8">Please enter your details.</p>
          <form
            onSubmit={handleSubmit}
            className="flex w-80 flex-col items-center gap-y-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Sign In
            </Button>
          </form>
          <p className="mt-4 text-gray-500 text-sm">
            Don’t have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>Sign up for free!</span>
          </p>
        </div>
        {/* Right Section */}
        <div className="lg:flex w-1/2 bg-white items-center justify-center rounded-3xl shadow-2xl hidden">
          <img
            src={illustration}
            alt="Illustration"
            className="max-w-full h-auto scale-x-[-1]"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
