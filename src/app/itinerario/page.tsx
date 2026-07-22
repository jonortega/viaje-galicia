import type { Metadata } from "next";
import { ItineraryList } from "@/components/ItineraryList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Itinerario",
};

export default function ItineraryPage() {
  return (
    <main className='mx-auto w-full max-w-4xl'>
      <PageHeader
        eyebrow='Ocho días'
        title='Itinerario de viaje'
        description='Planes, ubicaciones y detalles prácticos de cada día.'
        icon='calendar'
        action={{ href: "/mapa", label: "Abrir mapa" }}
      />
      <ItineraryList />
    </main>
  );
}
