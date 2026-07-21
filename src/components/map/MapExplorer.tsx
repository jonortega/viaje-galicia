"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryIcon, Icon } from "@/components/Icon";
import { PlaceVisual } from "@/components/PlaceVisual";
import { placeCategoryMeta, trip } from "@/data/trip";
import { cn } from "@/lib/cn";
import { formatCompactDayDate, getTripStatus } from "@/lib/trip-date";
import type { Place, PlaceCategory } from "@/types/trip";

const TripMap = dynamic(() => import("@/components/map/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-[#dce9e5] text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-[#147d76] shadow-sm">
          <Icon name="map" className="size-6" />
        </span>
        <p className="mt-3 text-sm font-bold text-[#496875]">Cargando el mapa…</p>
      </div>
    </div>
  ),
});

type Filter = "todos" | PlaceCategory;

const categories = (Object.keys(placeCategoryMeta) as PlaceCategory[]).filter(
  (category) => trip.places.some((place) => place.category === category),
);

function matchesDay(place: Place, dayId?: string) {
  return !dayId || place.dayIds.includes(dayId);
}

function matchesFilter(place: Place, filter: Filter) {
  return filter === "todos" || place.category === filter;
}

function filterPlaces(dayId: string | undefined, filter: Filter) {
  return trip.places.filter(
    (place) => matchesDay(place, dayId) && matchesFilter(place, filter),
  );
}

export function MapExplorer({
  initialDayId,
  initialPlaceId,
}: {
  initialDayId?: string;
  initialPlaceId?: string;
}) {
  const router = useRouter();
  const selectedDayButtonRef = useRef<HTMLButtonElement>(null);
  const validInitial = trip.places.some(
    (place) =>
      place.id === initialPlaceId && matchesDay(place, initialDayId),
  )
    ? initialPlaceId
    : undefined;
  const [filter, setFilter] = useState<Filter>("todos");
  const [selectedId, setSelectedId] = useState<string | undefined>(validInitial);

  const tripStatus = getTripStatus(trip);
  const currentDayId =
    tripStatus.phase === "during" ? tripStatus.currentDay?.id : undefined;
  const dayPlaces = useMemo(
    () => filterPlaces(initialDayId, "todos"),
    [initialDayId],
  );
  const filteredPlaces = useMemo(
    () => dayPlaces.filter((place) => matchesFilter(place, filter)),
    [dayPlaces, filter],
  );
  const selected = filteredPlaces.find((place) => place.id === selectedId);

  useEffect(() => {
    if (!initialDayId) return;
    selectedDayButtonRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [initialDayId]);

  function changeFilter(next: Filter) {
    setFilter(next);
    const selectedPlace = trip.places.find((place) => place.id === selectedId);
    if (selectedPlace && !matchesFilter(selectedPlace, next)) {
      setSelectedId(undefined);
    }
  }

  function changeDay(nextDayId?: string) {
    const selectedPlace = trip.places.find((place) => place.id === selectedId);
    if (
      selectedPlace &&
      (!matchesDay(selectedPlace, nextDayId) ||
        !matchesFilter(selectedPlace, filter))
    ) {
      setSelectedId(undefined);
    }

    const params = new URLSearchParams(window.location.search);
    if (nextDayId) params.set("day", nextDayId);
    else params.delete("day");
    const query = params.toString();
    router.replace(query ? `/mapa?${query}` : "/mapa", { scroll: false });
  }

  return (
    <section className="px-3 pb-28 sm:px-8">
      <div className="mb-3 space-y-3">
        <div>
          <p
            id="day-filter-label"
            className="mb-1.5 text-[.65rem] font-extrabold uppercase tracking-[.14em] text-[#60717c]"
          >
            Día
          </p>
          <div
            role="group"
            aria-labelledby="day-filter-label"
            className="-mx-3 flex snap-x gap-2 overflow-x-auto px-3 pb-1 pr-8 [scrollbar-color:#bed8d0_transparent] [scrollbar-width:thin] sm:mx-0 sm:px-0 sm:pr-0"
          >
            <button
              type="button"
              onClick={() => changeDay()}
              aria-pressed={!initialDayId}
              className={cn(
                "flex min-h-10 shrink-0 snap-start items-center gap-1.5 rounded-full border px-3.5 text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]",
                !initialDayId
                  ? "border-[#0b3157] bg-[#0b3157] text-white shadow-sm"
                  : "border-[#ded7ca] bg-white text-[#526773] hover:border-[#147d76]",
              )}
            >
              {!initialDayId ? <span aria-hidden="true">✓</span> : null}
              Todos los días
            </button>
            {trip.days.map((day) => {
              const active = day.id === initialDayId;
              const isCurrent = day.id === currentDayId;
              const dateLabel = formatCompactDayDate(day.date);

              return (
                <button
                  key={day.id}
                  ref={active ? selectedDayButtonRef : undefined}
                  type="button"
                  onClick={() => changeDay(day.id)}
                  aria-pressed={active}
                  aria-label={`${isCurrent ? "Hoy. " : ""}Día ${day.number}, ${dateLabel}: ${day.title}`}
                  className={cn(
                    "flex min-h-10 shrink-0 snap-start items-center gap-1.5 rounded-full border px-3.5 text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]",
                    active
                      ? "border-[#0b3157] bg-[#0b3157] text-white shadow-sm"
                      : isCurrent
                        ? "border-[#d9a928] bg-[#fff8db] text-[#765e23] hover:border-[#147d76]"
                        : "border-[#ded7ca] bg-white text-[#526773] hover:border-[#147d76]",
                  )}
                >
                  {active ? <span aria-hidden="true">✓</span> : null}
                  {isCurrent ? `Hoy · ${dateLabel}` : dateLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p
            id="category-filter-label"
            className="mb-1.5 text-[.65rem] font-extrabold uppercase tracking-[.14em] text-[#60717c]"
          >
            Tipo de lugar
          </p>
          <div
            role="group"
            aria-labelledby="category-filter-label"
            className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 pr-8 [scrollbar-color:#bed8d0_transparent] [scrollbar-width:thin] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pr-0"
          >
            <button
              type="button"
              onClick={() => changeFilter("todos")}
              aria-pressed={filter === "todos"}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-3.5 text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]",
                filter === "todos"
                  ? "border-[#0b3157] bg-[#0b3157] text-white"
                  : "border-[#ded7ca] bg-white text-[#526773] hover:border-[#147d76]",
              )}
            >
              Todos · {dayPlaces.length}
            </button>
            {categories.map((category) => {
              const meta = placeCategoryMeta[category];
              const active = filter === category;
              const count = dayPlaces.filter(
                (place) => place.category === category,
              ).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => changeFilter(category)}
                  aria-pressed={active}
                  className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-extrabold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
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
        </div>
      </div>

      {!filteredPlaces.length ? (
        <div
          role="status"
          className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#ded7ca] bg-white px-3.5 py-3 text-xs text-[#526773]"
        >
          <p className="flex items-center gap-2 font-semibold">
            <Icon name="pin" className="size-4 shrink-0 text-[#147d76]" />
            {initialDayId && filter !== "todos"
              ? "No hay lugares de esta categoría previstos para este día."
              : filter !== "todos"
                ? "No hay lugares de esta categoría en el viaje."
                : "No hay lugares previstos para este día."}
          </p>
          <div className="flex flex-wrap gap-2">
            {filter !== "todos" ? (
              <button
                type="button"
                onClick={() => changeFilter("todos")}
                className="min-h-9 rounded-full bg-[#e4f1ec] px-3 font-extrabold text-[#147d76] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
              >
                Ver todos los tipos
              </button>
            ) : null}
            {initialDayId ? (
              <button
                type="button"
                onClick={() => changeDay()}
                className="min-h-9 rounded-full bg-[#0b3157] px-3 font-extrabold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
              >
                Todos los días
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="relative h-[calc(100dvh-20rem)] min-h-[28rem] max-h-[45rem] overflow-hidden rounded-[1.7rem] border-4 border-white bg-[#dce9e5] shadow-[0_18px_45px_rgba(11,49,87,.14)] sm:min-h-[31rem]">
        <TripMap
          places={filteredPlaces}
          selectedId={selected?.id}
          onSelect={setSelectedId}
        />

        <div className="pointer-events-none absolute right-3 top-3 z-[500] rounded-full bg-white/90 px-3 py-2 text-[.65rem] font-extrabold uppercase tracking-[.11em] text-[#0b3157] shadow-sm backdrop-blur">
          {filteredPlaces.length} {filteredPlaces.length === 1 ? "lugar" : "lugares"}
        </div>

        {selected ? (
          <article
            role="dialog"
            aria-label={`Información de ${selected.name}`}
            className="animate-rise absolute inset-x-2 bottom-2 z-[800] overflow-hidden rounded-[1.45rem] border border-white/80 bg-[#fffdf7] shadow-[0_18px_50px_rgba(11,49,87,.26)] sm:left-auto sm:right-3 sm:w-[23rem]"
          >
            <div className="grid grid-cols-[7.25rem_1fr]">
              <PlaceVisual
                key={selected.id}
                place={selected}
                compact
                className="h-full min-h-32 rounded-none"
              />
              <div className="min-w-0 p-4">
                <button
                  type="button"
                  onClick={() => setSelectedId(undefined)}
                  aria-label="Cerrar ficha"
                  className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/90 text-[#526773] shadow-sm transition-colors hover:text-[#0b3157] focus-visible:outline-2 focus-visible:outline-[#147d76]"
                >
                  <Icon name="close" className="size-4" />
                </button>
                <div className="flex flex-wrap items-center gap-1.5 pr-7">
                  <p
                    className="text-[.62rem] font-extrabold uppercase tracking-[.14em]"
                    style={{ color: placeCategoryMeta[selected.category].color }}
                  >
                    {placeCategoryMeta[selected.category].label}
                  </p>
                  {selected.status === "posible" ? (
                    <span className="rounded-full bg-[#fff1bd] px-2 py-0.5 text-[.58rem] font-black uppercase tracking-[.1em] text-[#8a6200]">
                      Posible
                    </span>
                  ) : null}
                </div>
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
