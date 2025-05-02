import { Navbar } from "@/components/landing-page/Navbar";
import PetcareCard from "@/components/petcare/petcare-card";
import { getAllLayanan } from "@/utils/layananService";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Filter = "all" | "grooming" | "konsultasi";

function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [filter, setFilter] = useState<Filter>("all");
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data manually using useEffect
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllLayanan();
        setServices(data);
        setFilteredServices(data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Update filteredServices based on filter and searchQuery
  useEffect(() => {
    if (isLoading || isError) {
      setFilteredServices([]);
      return;
    }

    let filtered = services;

    if (filter !== "all") {
      filtered = filtered.filter(
        (service: any) => service.tipe_layanan === filter
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((service: any) =>
        service.nama_layanan.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  }, [filter, searchQuery, services, isLoading, isError]);
  return (
    <div>
      <Navbar />
      <div className="m-4 flex items-center justify-center">
        <Input
          className="w-80"
          type="search"
          placeholder="Search here..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ToggleGroup
        className="flex w-full gap-x-5"
        type="single"
        value={filter}
        onValueChange={(value: Filter) => {
          if (value) setFilter(value);
        }}
      >
        <ToggleGroupItem
          value="all"
          className="w-14 rounded-full font-bold outline outline-1 data-[state=on]:bg-primary data-[state=on]:text-background"
        >
          All
        </ToggleGroupItem>
        <ToggleGroupItem
          value="grooming"
          className="w-24 rounded-full font-bold outline outline-1 data-[state=on]:bg-primary data-[state=on]:text-background"
        >
          Grooming
        </ToggleGroupItem>
        <ToggleGroupItem
          value="konsultasi"
          className="w-24 rounded-full font-bold outline outline-1 data-[state=on]:bg-primary data-[state=on]:text-background"
        >
          Konsultasi
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="container flex h-full w-full flex-wrap items-center justify-center gap-10 py-10">
        {services.isLoading ? (
          <div className="flex items-center justify-center font-bold">
            Loading...
          </div>
        ) : (
          filteredServices.map((service: any, index: number) => (
            <PetcareCard key={index} layanan={service} />
          ))
        )}
      </div>
    </div>
  );
}

export default Services;
