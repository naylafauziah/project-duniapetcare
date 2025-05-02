import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { register, RegisterProps } from "@/utils/authService";
import { useToast } from "@/hooks/use-toast";
import illustration from "@/assets/illustration.svg";

function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
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
        title: "Your account registered",
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
    <div className="flex h-screen w-screen items-center justify-center bg-primary-foreground">
      <div className="flex h-full w-full">
        {/* Left Section */}
          <div className="lg:flex w-1/2 bg-white items-center justify-center rounded-3xl shadow-2xl hidden">
            <img
              src={illustration}
            alt="Illustration"
              className="max-w-full h-auto"
            />
          </div>
        {/* Right Section */}
        <div className="flex h-full lg:w-1/2 w-screen flex-col items-center justify-center gap-y-5 p-10">
        <h1 className="text-4xl font-bold">Get Started Now</h1>
        <p className="text-gray-500 mb-4">Create account to make an appointment</p>
          <form
            onSubmit={handleSubmit}
            className="flex w-80 flex-col items-center gap-y-4"
          >
            <Input
              type="number"
              placeholder="Phone Number"
              name="phone_number"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Fullname"
              name="full_name"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Username"
              name="username"
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
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
            >
              Sign up
            </Button>
          </form>
          <p className="text-sm text-gray-500">
            Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
