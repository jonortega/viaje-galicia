import type { Metadata } from "next";
import { ItineraryList } from "@/components/ItineraryList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Itinerario",
};

export default function ItineraryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl">
      <PageHeader
        eyebrow="Ocho días"
        title="La ruta, día a día"
        description="Lo bastante planeado para no discutir. Lo bastante abierto para improvisar."
        icon="calendar"
        action={{ href: "/mapa", label: "Abrir mapa" }}
      />
      <ItineraryList />
    </main>
  );
}
