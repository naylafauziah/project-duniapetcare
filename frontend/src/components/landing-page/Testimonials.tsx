import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://i.pravatar.cc/150?img=40",
    name: "Sarah Williams",
    userName: "Pemilik Kucing",
    comment:
      "DuniaPetcare benar-benar membantu saya menjaga kebersihan dan kesehatan kucing saya, Luna. Pelayanannya cepat dan sangat profesional!",
  },
  {
    image: "https://i.pravatar.cc/150?img=70",
    name: "Michael Brown",
    userName: "Pemilik Anjing",
    comment:
      "Sangat puas dengan layanan grooming untuk anjing saya, Max. Dia selalu terlihat segar dan bahagia setelah perawatan di DuniaPetcare.",
  },
  {
    image: "https://i.pravatar.cc/150?img=35",
    name: "Emily Davis",
    userName: "Pemilik Kucing",
    comment:
      "Dokter hewan di DuniaPetcare sangat ramah dan informatif. Mereka memberikan solusi terbaik untuk kesehatan kucing saya, Simba.",
  },
  {
    image: "https://i.pravatar.cc/150?img=60",
    name: "James Wilson",
    userName: "Pemilik Anjing",
    comment:
      "Saya sangat merekomendasikan DuniaPetcare untuk layanan daycare. Anjing saya, Spot, selalu tampak senang dan aktif setelah berada di sana.",
  },
  {
    image: "https://i.pravatar.cc/150?img=36",
    name: "Olivia Johnson",
    userName: "Pemilik Kucing",
    comment:
      "Layanan konsultasi dokter di DuniaPetcare sangat membantu. Kucing saya, Bella, mendapatkan perawatan terbaik untuk kesehatannya.",
  },
  {
    image: "https://i.pravatar.cc/150?img=17",
    name: "Daniel Roberts",
    userName: "Pemilik Anjing",
    comment:
      "DuniaPetcare memberikan pengalaman yang luar biasa untuk anjing saya, Bruno. Grooming dan daycare-nya sangat profesional!",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
      Temukan Alasan
        <span className="bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
          {" "}
          Mengapa Mereka Memilih{" "}
        </span>
        DuniaPetcare
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
      Kami berdedikasi untuk memberikan layanan terbaik bagi hewan kesayangan Anda. 
        Berikut pengalaman dari para pemilik kucing dan anjing yang mempercayakan 
        perawatan hewan mereka kepada kami.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
