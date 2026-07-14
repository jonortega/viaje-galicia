"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryIcon, Icon } from "@/components/Icon";
import { PlaceVisual } from "@/components/PlaceVisual";
import { placeCategoryMeta, trip } from "@/data/trip";
import { cn } from "@/lib/cn";
import type { PlaceCategory } from "@/types/trip";

const TripMap = dynamic(() => import("@/components/map/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-[#dce9e5] text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-[#147d76] shadow-sm">
          <Icon name="map" className="size-6" />
        </span>
        <p className="mt-3 text-sm font-bold text-[#496875]">Desplegando el mapa…</p>
      </div>
    </div>
  ),
});

type Filter = "todos" | PlaceCategory;

export function MapExplorer({ initialPlaceId }: { initialPlaceId?: string }) {
  const validInitial = trip.places.some((place) => place.id === initialPlaceId)
    ? initialPlaceId
    : undefined;
  const [filter, setFilter] = useState<Filter>("todos");
  const [selectedId, setSelectedId] = useState<string | undefined>(validInitial);

  const categories = Object.keys(placeCategoryMeta) as PlaceCategory[];
  const filteredPlaces = useMemo(
    () =>
      filter === "todos"
        ? trip.places
        : trip.places.filter((place) => place.category === filter),
    [filter],
  );
  const selected = trip.places.find((place) => place.id === selectedId);

  function changeFilter(next: Filter) {
    setFilter(next);
    if (
      selected &&
      next !== "todos" &&
      selected.category !== next
    ) {
      setSelectedId(undefined);
    }
  }

  return (
    <section className="px-3 pb-28 sm:px-8">
      <div
        aria-label="Filtrar lugares por categoría"
        className="mb-3 flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => changeFilter("todos")}
          aria-pressed={filter === "todos"}
          className={cn(
            "min-h-10 rounded-full border px-3.5 text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]",
            filter === "todos"
              ? "border-[#0b3157] bg-[#0b3157] text-white"
              : "border-[#ded7ca] bg-white text-[#526773] hover:border-[#147d76]",
          )}
        >
          Todos · {trip.places.length}
        </button>
        {categories.map((category) => {
          const meta = placeCategoryMeta[category];
          const active = filter === category;
          const count = trip.places.filter(
            (place) => place.category === category,
          ).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => changeFilter(category)}
              aria-pressed={active}
              className="flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-extrabold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
              style={{
                color: active ? "white" : meta.color,
                backgroundColor: active ? meta.color : "white",
                borderColor: active ? meta.color : "#ded7ca",
              }}
            >
              <CategoryIcon category={category} className="size-3.5" />
              {meta.label} · {count}
            </button>
          );
        })}
      </div>

      <div className="relative h-[calc(100dvh-15.5rem)] min-h-[31rem] max-h-[45rem] overflow-hidden rounded-[1.7rem] border-4 border-white bg-[#dce9e5] shadow-[0_18px_45px_rgba(11,49,87,.14)]">
        <TripMap
          places={filteredPlaces}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <div className="pointer-events-none absolute right-3 top-3 z-[500] rounded-full bg-white/90 px-3 py-2 text-[.65rem] font-extrabold uppercase tracking-[.11em] text-[#0b3157] shadow-sm backdrop-blur">
          {filteredPlaces.length} lugares
        </div>

        {selected ? (
          <article
            role="dialog"
            aria-label={`Información de ${selected.name}`}
            className="animate-rise absolute inset-x-2 bottom-2 z-[800] overflow-hidden rounded-[1.45rem] border border-white/80 bg-[#fffdf7] shadow-[0_18px_50px_rgba(11,49,87,.26)] sm:left-auto sm:right-3 sm:w-[23rem]"
          >
            <div className="grid grid-cols-[6.3rem_1fr]">
              <PlaceVisual place={selected} compact className="h-full min-h-28 rounded-none" />
              <div className="min-w-0 p-4">
                <button
                  type="button"
                  onClick={() => setSelectedId(undefined)}
                  aria-label="Cerrar ficha"
                  className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/90 text-[#526773] shadow-sm transition-colors hover:text-[#0b3157] focus-visible:outline-2 focus-visible:outline-[#147d76]"
                >
                  <Icon name="close" className="size-4" />
                </button>
                <p
                  className="text-[.62rem] font-extrabold uppercase tracking-[.14em]"
                  style={{ color: placeCategoryMeta[selected.category].color }}
                >
                  {placeCategoryMeta[selected.category].label}
                </p>
                <h2 className="mt-1 pr-7 text-lg font-black leading-tight text-[#0b3157]">
                  {selected.name}
                </h2>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#60717c]">
                  {selected.description}
                </p>
              </div>
            </div>
            <div className="border-t border-[#ece5d9] px-4 py-3">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {selected.dayIds.map((dayId) => {
                  const day = trip.days.find((item) => item.id === dayId);
                  return day ? (
                    <Link
                      key={dayId}
                      href={`/itinerario#${dayId}`}
                      className="rounded-full bg-[#e4f1ec] px-2.5 py-1 text-[.68rem] font-extrabold text-[#147d76] hover:bg-[#d5e9e1]"
                    >
                      Día {day.number}
                    </Link>
                  ) : null;
                })}
                {selected.practicalNote ? (
                  <span className="text-[.68rem] font-semibold text-[#8a6a1c]">
                    {selected.practicalNote}
                  </span>
                ) : null}
              </div>
              <a
                href={selected.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0b3157] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#147d76] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
              >
                <Icon name="external" className="size-4" />
                Abrir en Google Maps
              </a>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
