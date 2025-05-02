import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  step: number;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    step: 1,
    title: "Login ke Akun Anda",
    description:
      "Jika anda belum mempunyai akun, silakan melakukan Registrasi",
  },
  {
    step: 2,
    title: "Pilih Layanan",
    description:
      "Pilihlah layanan sesuai kebutuhan hewan peliharaan Anda",
  },
  {
    step: 3,
    title: "Isi Data dan Pesan",
    description:
      "Isi data hewan peliharaan anda, jadwal pertemuan, dan Lanjut pemesanan",
  },
  {
    step: 4,
    title: "Tunggu Konfirmasi",
    description:
      "Setelah memesan, nanti akan kami konfirmasi untuk pemesanan anda",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container py-24 text-center sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        Bagaimana Cara{" "}
        <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Memesan Layanan?{" "}
        </span>
      </h2>
      <p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
      Ikuti langkah-langkah berikut untuk memesan layanan kami dengan mudah dan cepat. Kami siap membantu kebutuhan Anda!
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ step, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid place-items-center gap-4">
                <span className="text-5xl font-bold text-blue-500">{step}</span>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};