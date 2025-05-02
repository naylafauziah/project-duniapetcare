import { useState, useEffect } from "react";
import { getAllLayanan } from "@/utils/layananService";

interface statsProps {
  quantity: string;
  description: string;
}

export const Statistics = () => {
  const [layanan, setLayanan] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const data = await getAllLayanan();  // Fetch the layanan data
        setLayanan(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching layanan data", error);
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  const stats: statsProps[] = [
    {
      quantity: "100+",
      description: "Users",
    },
    {
      quantity: layanan.length.toString(),
      description: "Services",
    }
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
