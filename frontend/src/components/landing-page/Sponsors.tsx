import WhiskasLogo from "@/assets/whiskas.svg";
import RoyalCaninLogo from "@/assets/royalcanin.svg";
import PurinaLogo from "@/assets/purina.svg";
import PedigreeLogo from "@/assets/pedigree.svg";
import FriskiesLogo from "@/assets/friskies.svg";
import HillsLogo from "@/assets/hills.svg";

interface SponsorProps {
  imageSrc: string;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    imageSrc: RoyalCaninLogo, // Ganti dengan path gambar brand
    name: "Royal Canin",
  },
  {
    imageSrc: WhiskasLogo,
    name: "Whiskas",
  },
  {
    imageSrc: PurinaLogo,
    name: "Purina",
  },
  {
    imageSrc: PedigreeLogo,
    name: "Pedigree",
  },
  {
    imageSrc: FriskiesLogo,
    name: "Friskies",
  },
  {
    imageSrc: HillsLogo,
    name: "Hill's",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-blue-500">
        Brand Partners
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-20 md:gap-8">
        {sponsors.map(({ imageSrc, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center justify-center mx-4"
          >
            <img
              src={imageSrc}
              alt={name}
              className="h-24 w-auto object-contain mx-4" // Atur ukuran gambar
            />
          </div>
        ))}
      </div>
    </section>
  );
};