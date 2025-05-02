import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import grooming from "@/assets/services_grooming.jpg";
import doctor from "@/assets/doctor_service.jpg";

export const HeroCards = () => {
  const navigate = useNavigate();

  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
      {/* Testimonial */}
      <Card className="absolute -top-[5px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://github.com/shadcn.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Jhonny Orlando</CardTitle>
            <CardDescription>Pemilik Kucing</CardDescription>
          </div>
        </CardHeader>

        <CardContent>Betah bgt ngajak anabul kesini😻</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="mt-8 flex items-center justify-center pb-2">
          <img
            src="/src/assets/logopet.png"
            alt="user avatar"
            className="absolute -top-12 aspect-square h-24 w-24 rounded-full bg-gray-50 object-cover shadow-lg grayscale-[0%]"
          />
          <CardTitle className="text-center">Dunia Petcare</CardTitle>
          <CardDescription className="font-normal text-blue-400">
            Layanan untuk Hewan Peliharaan
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-center">
          <p>
          Dari perawatan kesehatan hingga grooming, kami memastikan teman berbulu Anda selalu bahagia dan sehat.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.instagram.com/duniapetcareandstore?igsh=d3lnYTgwMDBxajM3"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Instagram icon</span>
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://www.facebook.com/your_facebook_account"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Facebook icon</span>
              <FaFacebook className="h-5 w-5" />
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/nayla-fauziah-b65101264/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="p-0">
          <img
            src={grooming}
            alt="Card Image"
            className="h-40 w-full rounded-t-md object-cover"
          />
        </CardHeader>

        <CardContent>
          <Badge variant="secondary" className="mt-2 text-sm text-blue-400">
            Most popular
          </Badge>
          <h3 className="mt-2 text-lg font-bold">Grooming Service</h3>
          <p className="text-sm text-muted-foreground">
            Pet Grooming sebagai prosedur perawatan tubuh yg sangat penting
            untuk tumbuh kembang sahabat berbulu anda.
          </p>
        </CardContent>

        <CardFooter>
          <Button
            rel="noreferrer noopener"
            onClick={() => navigate("/services")}
            className={`border ${buttonVariants({ variant: "default" })}`}
          >
            Jelajahi Layanan Kami
          </Button>
        </CardFooter>
      </Card>

      <Card className="absolute right-[20px] top-[310px] flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <img
          src={doctor}
          alt="Card Image"
          className="h-40 w-full rounded-md rounded-t-md object-cover"
        />
      </Card>
    </div>
  );
};
