"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import { placeCategoryMeta } from "@/data/trip";
import type { Place, PlaceCategory } from "@/types/trip";

const glyphs: Record<PlaceCategory, string> = {
  aeropuerto: '<path d="M22 16.5 13.5 12V4.5a1.5 1.5 0 0 0-3 0V12L2 16.5v2l8.5-2.5V21l1.5 1 1.5-1v-5l8.5 2.5Z"/>',
  alojamiento: '<path d="M3 17V8m0 6h18v4M7 14v-4h5a3 3 0 0 1 3 3v1"/>',
  comida: '<path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c4 2 4 7 0 9"/>',
  cultura: '<path d="m3 9 9-5 9 5M5 9h14M7 9v9M12 9v9M17 9v9M4 20h16"/>',
  isla: '<path d="M3 19h18M5 19c1.5-4 4-6 7-6s5.5 2 7 6M12 13V6M12 6c-2 0-3.5 1-4.5 2.5M12 6c2 0 3.5 1 4.5 2.5M12 6c-1-2-2.5-3-4.5-3M12 6c1-2 2.5-3 4.5-3"/>',
  naturaleza: '<path d="M20 4C11 4 5 9 5 16c0 2 1 4 3 5 1-7 5-11 12-17ZM5 20c3-4 7-7 12-9"/>',
  playa: '<path d="M2 10c3 0 3-2 6-2s3 2 6 2 3-2 6-2M2 15c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',
  pueblo: '<path d="M4 20V8l8-5 8 5v12M9 20v-5h6v5M8 10h.01M12 10h.01M16 10h.01"/>',
};

function createMarkerIcon(place: Place, selected: boolean) {
  const color = placeCategoryMeta[place.category].color;
  return L.divIcon({
    className: "map-marker-shell",
    html: `<div class="map-marker ${selected ? "is-selected" : ""}" style="background:${color}" title="${place.name}"><span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${glyphs[place.category]}</svg></span></div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });
}

function FitPlaces({ places }: { places: Place[] }) {
  const map = useMap();

  useEffect(() => {
    if (!places.length) return;
    if (places.length === 1) {
      map.setView([places[0].coordinates.lat, places[0].coordinates.lng], 11);
      return;
    }
    const bounds = L.latLngBounds(
      places.map((place) => [place.coordinates.lat, place.coordinates.lng]),
    );
    map.fitBounds(bounds, {
      paddingTopLeft: [55, 70],
      paddingBottomRight: [55, 135],
      maxZoom: 11,
    });
  }, [map, places]);

  return null;
}

export default function TripMap({
  places,
  selectedId,
  onSelect,
}: {
  places: Place[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const markerIcons = useMemo(
    () =>
      new Map(
        places.map((place) => [
          place.id,
          createMarkerIcon(place, place.id === selectedId),
        ]),
      ),
    [places, selectedId],
  );

  return (
    <MapContainer
      center={[42.75, -8.88]}
      zoom={8}
      minZoom={7}
      scrollWheelZoom
      zoomControl
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitPlaces places={places} />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={markerIcons.get(place.id)}
          eventHandlers={{ click: () => onSelect(place.id) }}
          keyboard
          title={place.name}
          alt={place.name}
        />
      ))}
    </MapContainer>
  );
}
