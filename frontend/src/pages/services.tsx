import { Navbar } from "@/components/landing-page/Navbar";
import PetcareCard from "@/components/petcare/petcare-card";
import { getAllLayanan } from "@/utils/layananService";
import { useQuery } from "@tanstack/react-query";

function Services() {
  //   const queryClient = useQueryClient();

  const services = useQuery({
    queryKey: ["layanan"],
    queryFn: getAllLayanan,
  });

  console.log(services.data);

  return (
    <div>
      <Navbar />

      <div className="container flex h-full w-full flex-wrap items-center justify-center gap-10 py-10">
        {services.isLoading ? (
          <div className="flex items-center justify-center font-bold">
            Loading...
          </div>
        ) : (
          services.data.map((service: any, index: number) => (
            <PetcareCard key={index} layanan={service} />
          ))
        )}
      </div>
    </div>
  );
}

export default Services;
