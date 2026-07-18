import type { Metadata } from "next";
import { MapExplorer } from "@/components/map/MapExplorer";
import { PageHeader } from "@/components/PageHeader";
import { trip } from "@/data/trip";

export const metadata: Metadata = {
  title: "Mapa",
};

type MapSearchParams = {
  day?: string | string[];
  lugar?: string | string[];
};

function getSingleValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<MapSearchParams>;
}) {
  const { day, lugar } = await searchParams;
  const requestedDayId = getSingleValue(day);
  const requestedPlaceId = getSingleValue(lugar);
  const initialDayId = trip.days.some(
    (tripDay) => tripDay.id === requestedDayId,
  )
    ? requestedDayId
    : undefined;
  const initialPlaceId = trip.places.some(
    (place) => place.id === requestedPlaceId,
  )
    ? requestedPlaceId
    : undefined;

  return (
    <main className="mx-auto w-full max-w-6xl">
      <PageHeader
        eyebrow="Lugares del viaje"
        title="Mapa del viaje"
        description="Alojamientos, playas, pueblos y paradas incluidas en el itinerario."
        icon="map"
        action={{ href: "/itinerario", label: "Ver itinerario" }}
      />
      <MapExplorer
        initialDayId={initialDayId}
        initialPlaceId={initialPlaceId}
      />
    </main>
  );
}
