import type { PlaceCategory, PlaceCategoryMeta, Trip } from "@/types/trip";

export const placeCategoryMeta: Record<PlaceCategory, PlaceCategoryMeta> = {
  aeropuerto: { label: "Aeropuerto", color: "#4d5ca8", accent: "#e2e5f5" },
  alojamiento: { label: "Alojamiento", color: "#0b3157", accent: "#d9a928" },
  comida: { label: "Comer", color: "#c86f3d", accent: "#f9e1d2" },
  cultura: { label: "Cultura", color: "#73577c", accent: "#ede1ef" },
  isla: { label: "Isla", color: "#886b2f", accent: "#f5eccf" },
  naturaleza: { label: "Naturaleza", color: "#39805f", accent: "#dcebdd" },
  playa: { label: "Playa", color: "#1687a7", accent: "#d9f1f5" },
  pueblo: { label: "Pueblo", color: "#147d76", accent: "#dff2ec" },
};

// TODO: Añadir la URL definitiva de Spotify y completar la hora del vuelo de vuelta.
// Siete noches implican ocho días contando el regreso a Santiago.
export const trip: Trip = {
  title: "Galicia 2026",
  subtitle: "",
  startDate: "2026-07-25",
  endDate: "2026-08-01",
  timeZone: "Europe/Madrid",
  travelers: 4,
  hero: {
    image: "/images/trip/hero.webp",
    alt: "Ilustración de la costa gallega junto al océano Atlántico",
  },
  driveFolderUrl: "https://drive.google.com/drive/folders/1xYp6VXfjA6n7ZgJ-iNnfOJQT_K_K4SxC?usp=sharing",
  playlist: {
    title: "Muñeiras y otros éxitos",
    subtitle: "Pulsa para abrir Spotify",
    url: "https://open.spotify.com/",
    image: "/images/spotify/playlist-cover-placeholder.webp",
  },
  bases: [
    {
      id: "cambados",
      name: "Casa de Cambados",
      town: "Cambados",
      nights: 4,
      coordinates: { lat: 42.5192285, lng: -8.8135434 },
      note: "Alojamiento confirmado",
    },
    {
      id: "finisterre",
      name: "Casa de Finisterre",
      town: "Finisterre",
      nights: 2,
      coordinates: { lat: 42.9059587, lng: -9.2626941 },
      note: "Alojamiento confirmado",
    },
    {
      id: "sigueiro",
      name: "Casa de Sigüeiro",
      town: "Sigüeiro",
      nights: 1,
      coordinates: { lat: 42.9687859, lng: -8.4417454 },
      note: "Alojamiento confirmado",
    },
  ],
  days: [
    {
      id: "dia-1",
      number: 1,
      date: "2026-07-25",
      baseId: "cambados",
      title: "Santiago en fiestas y Cambados",
      summary: "Llegada temprana, Santiago en fiestas y primera tarde en Cambados antes de recoger a Ibón.",
      stopIds: [
        "aeropuerto-santiago",
        "santiago",
        "base-cambados",
        "santa-marina-dozo",
      ],
      status: "confirmado",
      activities: [
        { time: "08:40", text: "Aterrizaje en Santiago." },
        { time: "09:00", text: "Recoger el coche en el aeropuerto." },
        {
          time: "Mañana",
          text: "Pasear por las fiestas de Santiago, con ambiente en Quintana y Obradoiro; misa si apetece.",
        },
        {
          time: "Mediodía",
          text: "Salir hacia Cambados y comprar comida para el apartamento.",
        },
        { time: "15:00", text: "Check-in en el apartamento de Cambados." },
        {
          time: "Tarde",
          text: "Recorrer Fefiñáns, la zona vieja, el paseo marítimo y las ruinas de Santa Mariña Dozo.",
        },
        {
          time: "Noche",
          text: "Volver a Santiago a por Ibón, que llega a las 23:00, y regresar a Cambados.",
        },
      ],
      logistics: [
        "Día con varios trayectos entre Santiago y Cambados.",
        "Hacer la compra antes o después del check-in, según el tiempo disponible.",
      ],
    },
    {
      id: "dia-2",
      number: 2,
      date: "2026-07-26",
      baseId: "cambados",
      title: "Rías Baixas",
      summary: "Ruta costera por islas, pueblo marinero y playa.",
      stopIds: ["illa-arousa", "o-grove", "isla-toja", "a-lanzada"],
      status: "provisional",
      activities: [
        { text: "Isla de Arousa." },
        { text: "O Grove." },
        { text: "Isla de Toja." },
        { text: "Playa de la Lanzada." },
      ],
    },
    {
      id: "dia-3",
      number: 3,
      date: "2026-07-27",
      baseId: "cambados",
      title: "Día en la Isla de Ons",
      summary: "Excursión de día completo a Ons con los billetes ya reservados.",
      stopIds: ["isla-ons"],
      status: "confirmado",
      activities: [
        {
          text: "Pasar prácticamente todo el día en la Isla de Ons.",
        },
      ],
      meals: ["Llevar bocadillos preparados desde el apartamento."],
      logistics: ["Billetes para la isla ya comprados."],
    },
    {
      id: "dia-4",
      number: 4,
      date: "2026-07-28",
      baseId: "cambados",
      title: "Combarro y plan abierto",
      summary: "Combarro como plan principal y varias ideas para completar el día según apetezca.",
      stopIds: [
        "combarro",
        "sanxenxo",
        "portonovo",
        "corrubedo",
        "pozas-rio-pedras",
      ],
      status: "provisional",
      activities: [{ text: "Visitar Combarro." }],
      meals: ["Posible comida de mejillones en barco por unos 20 €; propuesta pendiente de decidir."],
      alternatives: ["Sanxenxo y Portonovo.", "Corrubedo.", "Pozas del río Pedras: paseo hasta las pozas naturales."],
    },
    {
      id: "dia-5",
      number: 5,
      date: "2026-07-29",
      baseId: "finisterre",
      title: "Camino por la Costa da Morte",
      summary: "Cambio de alojamiento con una ruta de paradas costeras hasta Finisterre.",
      stopIds: [
        "castro-barona",
        "noia",
        "muros",
        "playa-carnota",
        "ezaro",
        "base-finisterre",
      ],
      status: "provisional",
      activities: [
        { text: "Castro de Baroña, asentamiento celta." },
        { text: "Parada en Noia." },
        { text: "Paseo por Muros." },
        { text: "Playa de Carnota." },
        { text: "Cascada de Ézaro." },
        { text: "Llegada y check-in en Finisterre." },
        { text: "Atardecer en Finisterre si quedan tiempo y energía." },
      ],
      logistics: ["Hacer las visitas de camino en coche hacia Finisterre, ajustando las paradas al tiempo disponible."],
    },
    {
      id: "dia-6",
      number: 6,
      date: "2026-07-30",
      baseId: "finisterre",
      title: "Faros y costa",
      summary: "Jornada por Muxía y Camariñas con el mar siempre cerca.",
      stopIds: ["muxia", "camarinas", "faro-vilan"],
      status: "provisional",
      activities: [
        { text: "Muxía y el santuario junto al mar." },
        { text: "Camariñas." },
        { text: "Faro de Vilán." },
      ],
    },
    {
      id: "dia-7",
      number: 7,
      date: "2026-07-31",
      baseId: "sigueiro",
      title: "Santiago y última noche",
      summary: "Comida reservada en Santiago y resto del día abierto antes de dormir en Sigüeiro.",
      stopIds: ["a-horta-obradoiro", "base-sigueiro"],
      status: "provisional",
      activities: [
        { text: "Tiempo libre en Santiago; resto del plan por concretar." },
        { text: "Traslado a Sigüeiro para pasar la última noche." },
      ],
      meals: ["15:00 · Comida en A Horta d’Obradoiro, en Santiago."],
    },
    {
      id: "dia-8",
      number: 8,
      date: "2026-08-01",
      baseId: "sigueiro",
      title: "Regreso a Bilbao",
      summary: "Últimas horas abiertas antes del vuelo de vuelta.",
      stopIds: ["aeropuerto-santiago"],
      status: "por-decidir",
      activities: [{ text: "Tiempo libre o plan pendiente de concretar." }],
      logistics: ["Vuelo de Santiago a Bilbao; hora todavía pendiente (XX:XX)."],
    },
  ],
  places: [
    {
      id: "aeropuerto-santiago",
      name: "Aeropuerto de Santiago de Compostela",
      category: "aeropuerto",
      coordinates: { lat: 42.8918668, lng: -8.4204772 },
      description:
        "Terminal de pasajeros utilizada para la llegada y el vuelo de regreso del viaje.",
      image: "/images/places/aeropuerto-santiago.webp",
      dayIds: ["dia-1", "dia-8"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.8918668,-8.4204772",
    },
    {
      id: "santiago",
      name: "Santiago de Compostela",
      category: "cultura",
      coordinates: { lat: 42.8805003, lng: -8.54576 },
      description:
        "Centro histórico de Santiago, con el Obradoiro y las plazas previstas para la primera mañana.",
      image: "/images/places/santiago-de-compostela.webp",
      dayIds: ["dia-1"],
      practicalNote: "El aparcamiento del centro suele requerir paciencia.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.8805003,-8.5457600",
    },
    {
      id: "base-cambados",
      name: "Cambados",
      category: "alojamiento",
      coordinates: { lat: 42.5192285, lng: -8.8135434 },
      description:
        "Punto de referencia en el centro de Cambados para la llegada al alojamiento de las primeras cuatro noches.",
      image: "/images/places/alojamiento-cambados.webp",
      dayIds: ["dia-1"],
      baseId: "cambados",
      practicalNote:
        "Referencia en la plaza de Fefiñáns; dirección exacta pendiente.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.5192285,-8.8135434",
    },
    {
      id: "santa-marina-dozo",
      name: "Ruinas de Santa Mariña Dozo",
      category: "cultura",
      coordinates: { lat: 42.5118969, lng: -8.8075074 },
      description:
        "Ruinas de la antigua iglesia de Santa Mariña Dozo y su cementerio, en Cambados.",
      image: "/images/places/ruinas-santa-marina-dozo.webp",
      dayIds: ["dia-1"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.5118969,-8.8075074",
    },
    {
      id: "illa-arousa",
      name: "Isla de Arousa",
      category: "isla",
      coordinates: { lat: 42.5654751, lng: -8.8680386 },
      description:
        "Porto do Xufre como punto práctico para comenzar la visita a la isla y su paisaje de ría.",
      image: "/images/places/illa-de-arousa.webp",
      dayIds: ["dia-2"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.5654751,-8.8680386",
    },
    {
      id: "o-grove",
      name: "O Grove",
      category: "pueblo",
      coordinates: { lat: 42.4962412, lng: -8.8641868 },
      description:
        "Praza do Corgo como referencia central para la parada en este pueblo marinero.",
      image: "/images/places/o-grove.webp",
      dayIds: ["dia-2"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.4962412,-8.8641868",
    },
    {
      id: "isla-toja",
      name: "Isla de Toja",
      category: "isla",
      coordinates: { lat: 42.4840081, lng: -8.8465466 },
      description:
        "La capilla de las Conchas sirve como punto reconocible para la visita a la isla.",
      image: "/images/places/isla-de-toja.webp",
      dayIds: ["dia-2"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.4840081,-8.8465466",
    },
    {
      id: "a-lanzada",
      name: "Playa de la Lanzada",
      category: "playa",
      coordinates: { lat: 42.4538414, lng: -8.8756833 },
      description:
        "Acceso público de referencia a la extensa playa atlántica incluida en la ruta del domingo.",
      image: "/images/places/playa-de-la-lanzada.webp",
      dayIds: ["dia-2"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.4538414,-8.8756833",
    },
    {
      id: "isla-ons",
      name: "Isla de Ons",
      category: "isla",
      coordinates: { lat: 42.3771727, lng: -8.9295275 },
      description:
        "Muelle de llegada de los barcos y punto práctico para comenzar la excursión por Ons.",
      image: "/images/places/isla-de-ons.webp",
      dayIds: ["dia-3"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.3771727,-8.9295275",
    },
    {
      id: "combarro",
      name: "Combarro",
      category: "pueblo",
      coordinates: { lat: 42.4337021, lng: -8.705618 },
      description:
        "Praza da Fonte, en el conjunto histórico de hórreos junto al mar y calles de piedra.",
      image: "/images/places/combarro.webp",
      dayIds: ["dia-4"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.4337021,-8.7056180",
    },
    {
      id: "sanxenxo",
      name: "Sanxenxo",
      category: "pueblo",
      coordinates: { lat: 42.400142, lng: -8.8069623 },
      description:
        "Posible parada en el centro de Sanxenxo, con la plaza de Pascual Veiga como referencia.",
      image: "/images/places/sanxenxo.webp",
      dayIds: ["dia-4"],
      status: "posible",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.4001420,-8.8069623",
    },
    {
      id: "portonovo",
      name: "Portonovo",
      category: "pueblo",
      coordinates: { lat: 42.3955761, lng: -8.8220062 },
      description:
        "Posible parada en el puerto de Portonovo durante el día de plan abierto.",
      image: "/images/places/portonovo.webp",
      dayIds: ["dia-4"],
      status: "posible",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.3955761,-8.8220062",
    },
    {
      id: "corrubedo",
      name: "Corrubedo",
      category: "pueblo",
      coordinates: { lat: 42.5761851, lng: -9.0699626 },
      description:
        "Posible parada en el núcleo marinero de Corrubedo, en la costa de Barbanza.",
      image: "/images/places/corrubedo.webp",
      dayIds: ["dia-4"],
      status: "posible",
      practicalNote: "Marcador de referencia en el núcleo de Corrubedo.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.5761851,-9.0699626",
    },
    {
      id: "pozas-rio-pedras",
      name: "Pozas del río Pedras",
      category: "naturaleza",
      coordinates: { lat: 42.6356781, lng: -8.954899 },
      description:
        "Posible paseo hasta las pozas naturales del río Pedras, en A Pobra do Caramiñal.",
      image: "/images/places/pozas-rio-pedras.webp",
      dayIds: ["dia-4"],
      status: "posible",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.6356781,-8.9548990",
    },
    {
      id: "castro-barona",
      name: "Castro de Baroña",
      category: "cultura",
      coordinates: { lat: 42.6946688, lng: -9.0319627 },
      description:
        "Yacimiento arqueológico costero situado sobre una península rocosa.",
      image: "/images/places/castro-de-barona.webp",
      dayIds: ["dia-5"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.6946688,-9.0319627",
    },
    {
      id: "noia",
      name: "Noia",
      category: "pueblo",
      coordinates: { lat: 42.7822552, lng: -8.8889416 },
      description:
        "Praza do Tapal como referencia para la parada en el casco histórico de Noia.",
      image: "/images/places/noia.webp",
      dayIds: ["dia-5"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.7822552,-8.8889416",
    },
    {
      id: "muros",
      name: "Muros",
      category: "pueblo",
      coordinates: { lat: 42.774581, lng: -9.0577101 },
      description:
        "Praza do Curro como punto central para el paseo por la villa marinera de Muros.",
      image: "/images/places/muros.webp",
      dayIds: ["dia-5"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.7745810,-9.0577101",
    },
    {
      id: "playa-carnota",
      name: "Playa de Carnota",
      category: "playa",
      coordinates: { lat: 42.8272114, lng: -9.1000241 },
      description:
        "Acceso público de referencia a la extensa playa de Carnota durante la ruta costera.",
      image: "/images/places/playa-de-carnota.webp",
      dayIds: ["dia-5"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.8272114,-9.1000241",
    },
    {
      id: "ezaro",
      name: "Cascada de Ézaro",
      category: "naturaleza",
      coordinates: { lat: 42.9128755, lng: -9.1164439 },
      description:
        "Cascada del río Xallas junto a su desembocadura, con acceso por la pasarela de visitantes.",
      image: "/images/places/cascada-de-ezaro.webp",
      dayIds: ["dia-5"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.9128755,-9.1164439",
    },
    {
      id: "base-finisterre",
      name: "Finisterre",
      category: "alojamiento",
      coordinates: { lat: 42.9059587, lng: -9.2626941 },
      description:
        "Punto de referencia en el centro de Finisterre para la llegada al alojamiento de la Costa da Morte.",
      image: "/images/places/alojamiento-finisterre.webp",
      dayIds: ["dia-5"],
      baseId: "finisterre",
      practicalNote:
        "Referencia en la plaza de la Constitución; dirección exacta pendiente.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.9059587,-9.2626941",
    },
    {
      id: "muxia",
      name: "Muxía",
      category: "pueblo",
      coordinates: { lat: 43.1048548, lng: -9.2146537 },
      description:
        "El puerto de Muxía sirve como referencia central para recorrer la villa y su frente marítimo.",
      image: "/images/places/muxia.webp",
      dayIds: ["dia-6"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=43.1048548,-9.2146537",
    },
    {
      id: "camarinas",
      name: "Camariñas",
      category: "pueblo",
      coordinates: { lat: 43.1302171, lng: -9.1803485 },
      description:
        "Praza da Insuela como referencia central para la parada en Camariñas.",
      image: "/images/places/camarinas.webp",
      dayIds: ["dia-6"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=43.1302171,-9.1803485",
    },
    {
      id: "faro-vilan",
      name: "Faro de Vilán",
      category: "cultura",
      coordinates: { lat: 43.1603606, lng: -9.2113859 },
      description:
        "Faro situado sobre el cabo Vilán, en la costa próxima a Camariñas.",
      image: "/images/places/faro-de-vilan.webp",
      dayIds: ["dia-6"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=43.1603606,-9.2113859",
    },
    {
      id: "a-horta-obradoiro",
      name: "A Horta d’Obradoiro",
      category: "comida",
      coordinates: { lat: 42.8807746, lng: -8.5472433 },
      description:
        "Restaurante de la comida reservada en Santiago, situado en la rúa das Hortas.",
      image: "/images/places/a-horta-d-obradoiro.webp",
      dayIds: ["dia-7"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.8807746,-8.5472433",
    },
    {
      id: "base-sigueiro",
      name: "Sigüeiro",
      category: "alojamiento",
      coordinates: { lat: 42.9687859, lng: -8.4417454 },
      description:
        "Punto de referencia en el centro de Sigüeiro para la llegada al alojamiento de la última noche.",
      image: "/images/places/alojamiento-sigueiro.webp",
      dayIds: ["dia-7"],
      baseId: "sigueiro",
      practicalNote: "Referencia en el centro; dirección exacta pendiente.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=42.9687859,-8.4417454",
    },
  ],
};
