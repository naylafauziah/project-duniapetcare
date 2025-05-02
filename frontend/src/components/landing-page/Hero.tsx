import { Button, buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
          Membangun {" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
             Kebahagiaan,
            </span>
          </h1>{" "}
          Satu{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            Hewan 
            </span>{" "}
            pada Satu Waktu
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Dengan tim ahli dan fasilitas terbaik, kami menjadikan setiap kunjungan menjadi pengalaman menyenangkan untuk Anda dan hewan kesayangan.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button rel="noreferrer noopener"
                onClick={() => navigate("/services")} variant="default" className="w-full md:w-1/3">Booking Now</Button>

          <a
            rel="noreferrer noopener"
            href="https://www.instagram.com/duniapetcareandstore?igsh=d3lnYTgwMDBxajM3"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Our Gallery
            <InstagramLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
