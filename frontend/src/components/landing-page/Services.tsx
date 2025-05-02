import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import {
  Bone,
  HandHeart,
  Stethoscope,
} from "lucide-react";
import petcare from "@/assets/petcare1.jpg";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Layanan Grooming",
    description:
      "Perawatan lengkap untuk kebersihan dan kesehatan bulu, kuku, dan tubuh hewan kesayangan Anda.",
    icon: <HandHeart />,
  },
  {
    title: "Konsultasi Dokter Hewan",
    description:
    "Berkonsultasi dengan dokter hewan profesional untuk kesehatan dan perawatan hewan Anda.",
    icon: <Stethoscope />,
  },
  {
    title: "Produk Makanan & Aksesoris",
    description:
    "Menjual makanan berkualitas, vitamin, mainan, dan aksesoris untuk kebutuhan hewan Anda.",
    icon: <Bone />,
  },
];

export const Services = () => {
  return (
    <section id="layanankami" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
              Layanan{" "}
            </span>
            Kami
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
          Kami menyediakan berbagai layanan terbaik untuk merawat dan menjaga kebahagiaan hewan kesayangan Anda.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-blue-500/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={petcare  }
          className="w-[300px] md:w-[500px] lg:w-[600px] h-[700px] rounded-3xl"
          alt="About services"
        />
      </div>
    </section>
  );
};
