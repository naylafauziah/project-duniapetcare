import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Apa itu DuniaPetcare?",
    answer: "DuniaPetcare adalah layanan perawatan hewan yang menyediakan berbagai kebutuhan untuk hewan peliharaan Anda, seperti grooming, konsultasi kesehatan, penitipan, dan produk makanan berkualitas tinggi. Kami berdiri sejak tahun 2023 dengan misi memberikan kenyamanan dan kebahagiaan bagi hewan kesayangan Anda.",
    value: "item-1",
  },
  {
    question: "Apa saja layanan yang ditawarkan oleh DuniaPetcare?",
    answer:
      "Kami menyediakan berbagai layanan, antara lain: Grooming seperti Perawatan bulu, kuku, dan kebersihan hewan, Konsultasi Kesehatan untuk bertemu dokter hewan profesional untuk pemeriksaan kesehatan, Daycare dan Boarding untuk menitipkan hewan peliharaan anda, Pet Shop kami menjual makanan, aksesoris, dan produk kesehatan berkualitas tinggi. ",
    value: "item-2",
  },
  {
    question:
      "Bagaimana cara memesan layanan di DuniaPetcare?",
    answer:
      "Langkah-langkah untuk memesan layanan: 1. Kunjungi halaman layanan di website kami, 2. Isi formulir pemesanan atau hubungi nomor kontak yang tersedia, 3. Tim kami akan menghubungi Anda untuk konfirmasi jadwal dan detail layanan, 4. Bawa hewan kesayangan Anda ke lokasi kami sesuai dengan jadwal yang telah di konfirmasi ",
    value: "item-3",
  },
  {
    question: "Di mana lokasi DuniaPetcare?",
    answer: "DuniaPetcare berlokasi di [Alamat Lengkap Anda] dan kami juga melayani pemesanan melalui online. Untuk informasi lebih lanjut, silakan hubungi kami melalui Instagram atau email yang tertera di halaman kontak.",
    value: "item-4",
  },
  {
    question:
      "Apakah ada dokter hewan di DuniaPetcare?",
    answer:
      "Tentu! Kami bekerja sama dengan dokter hewan berpengalaman untuk memberikan konsultasi kesehatan, vaksinasi, dan pengobatan bagi hewan peliharaan Anda.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
      Masih ada pertanyaan?{" "}
        <a
          rel="noreferrer noopener"
          href="https://www.instagram.com/duniapetcareandstore?igsh=d3lnYTgwMDBxajM3"
          target="_blank"
          className="text-blue-500 transition-all border-primary hover:border-b-2"
        >
          Hubungi kami
        </a>
      </h3>
    </section>
  );
};
