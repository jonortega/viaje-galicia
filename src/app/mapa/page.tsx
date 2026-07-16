import type { Metadata } from "next";
import { MapExplorer } from "@/components/map/MapExplorer";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Mapa",
};

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ lugar?: string }>;
}) {
  const { lugar } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-6xl">
      <PageHeader
        eyebrow="Lugares del viaje"
        title="Mapa del viaje"
        description="Alojamientos, playas, pueblos y paradas incluidas en el itinerario."
        icon="map"
        action={{ href: "/itinerario", label: "Ver itinerario" }}
      />
      <MapExplorer initialPlaceId={lugar} />
    </main>
  );
}
