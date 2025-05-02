import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="mx-auto w-11/12" />

      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="flex text-xl font-bold"
          >
            <img
              src="/src/assets/logopet.png"
              alt="Logo Dunia Petcare"
              className="mr-2 h-10" // Anda bisa menyesuaikan ukuran gambar
            />
            Dunia Petcare
          </a>
          {/* Alamat Perusahaan */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold font-serif text-2xl">CV. Rajawali Feed Centre</span>{" "}
              <br />
              Jl. By Pass No.5, Tj. Saba Pitameh Nan XX, Kec. Lubuk Begalung, Kota Padang, Sumatera Barat 25221 <br/>
              Pusat Kebutuhan Hewan Peliharaan Terlengkap, Terbesar, & <br />
              Terpercaya di Padang
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Toko Online</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Tokopedia
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Shopee
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Bukalapak
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Lazada
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Blibli
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Social</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Instagram
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Facebook
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Tiktok
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Tentang Kami</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="/services"
              className="opacity-60 hover:opacity-100"
            >
              Layanan
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/history"
              className="opacity-60 hover:opacity-100"
            >
              My Order
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#faq"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Kami Melayani</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Grooming
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Konsul Kesehatan
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Penitipan Hewan
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Makanan & Aksesoris
            </a>
          </div>

        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/nayla-fauziah-b65101264/"
            className="border-blue-500 text-blue-400 transition-all hover:border-b-2"
          >
            Nayla Fauziah
          </a>
        </h3>
      </section>
    </footer>
  );
};
