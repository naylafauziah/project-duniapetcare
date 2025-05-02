import { Statistics } from "./Statistics";
import petcare from "@/assets/petcare.jpg";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="rounded-lg border bg-muted/50 py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <img
            src={petcare}
            alt=""
            className="w-[300px] rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Tentang{" "}
                </span>
                Kami
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                DuniaPetcare didirikan pada tahun 2023 dengan visi untuk menjadi
                solusi terbaik bagi kebutuhan hewan peliharaan Anda. Kami
                memahami bahwa hewan kesayangan adalah bagian penting dari
                keluarga, itulah sebabnya kami hadir untuk menyediakan layanan
                dan produk berkualitas tinggi yang membantu menjaga kebahagiaan
                serta kesehatan mereka.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
