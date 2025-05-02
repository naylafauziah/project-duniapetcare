import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Cta = () => {
  const navigate = useNavigate();
  return (
    <section id="cta" className="my-24 bg-muted/50 py-16 sm:my-32">
      <div className="container place-items-center lg:grid lg:grid-cols-2">
        <div className="lg:col-start-1">
          <h2 className="text-3xl font-bold md:text-4xl">
            Semua Kebutuhan
            <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Perawatan Hewan Peliharaan{" "}
            </span>
            Dalam Satu Tempat
          </h2>
          <p className="mb-8 mt-4 text-xl text-muted-foreground lg:mb-0">
            Jaga teman berbulu Anda tetap sehat dan bahagia dengan layanan
            perawatan hewan peliharaan terbaik kami. Dari perawatan hingga
            pemeriksaan kesehatan, kami siap membantu!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button
            rel="noreferrer noopener"
            onClick={() => navigate("/services")}
            variant="default"
            className="w-full md:w-auto"
          >
            Jelajahi Layanan Kami
          </Button>
        </div>
      </div>
    </section>
  );
};
