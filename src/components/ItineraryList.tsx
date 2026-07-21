"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryIcon, Icon } from "@/components/Icon";
import { placeCategoryMeta, trip } from "@/data/trip";
import { cn } from "@/lib/cn";
import { formatLongDate, getTripStatus } from "@/lib/trip-date";
import type { TripDayStatus } from "@/types/trip";

const dayStatusMeta: Record<
  TripDayStatus,
  { label: string; className: string }
> = {
  confirmado: {
    label: "Confirmado",
    className: "bg-[#e4f1ec] text-[#147d76]",
  },
  provisional: {
    label: "Plan flexible",
    className: "bg-[#fff1bd] text-[#8a6200]",
  },
  "por-decidir": {
    label: "Por decidir",
    className: "bg-[#edf0f1] text-[#60717c]",
  },
};

export function ItineraryList() {
  const tripStatus = getTripStatus(trip);
  const currentDayId =
    tripStatus.phase === "during" ? tripStatus.currentDay?.id : undefined;
  const [openDays, setOpenDays] = useState<Set<string>>(() => new Set());

  function toggleDay(dayId: string) {
    setOpenDays((current) => {
      const next = new Set(current);
      if (next.has(dayId)) next.delete(dayId);
      else next.add(dayId);
      return next;
    });
  }

  return (
    <section className="relative px-5 pb-32 sm:px-8">
      <div className="absolute bottom-36 left-[2.34rem] top-7 w-px bg-gradient-to-b from-[#147d76] via-[#bed8d0] to-transparent sm:left-[3.34rem]" />

      <div className="space-y-4">
        {trip.days.map((day) => {
          const isOpen = openDays.has(day.id);
          const isCurrent = day.id === currentDayId;
          const base = trip.bases.find((item) => item.id === day.baseId);
          const stops = day.stopIds
            .map((stopId) => trip.places.find((place) => place.id === stopId))
            .filter(Boolean);
          const mappedPlaces = trip.places.filter((place) =>
            place.dayIds.includes(day.id),
          );
          const statusMeta = day.status ? dayStatusMeta[day.status] : undefined;

          return (
            <article
              key={day.id}
              id={day.id}
              className="relative scroll-mt-6 pl-11 sm:pl-14"
            >
              <div
                className={cn(
                  "absolute left-0 top-5 z-10 grid size-9 place-items-center rounded-full border-[3px] text-xs font-black shadow-sm sm:size-10",
                  isCurrent
                    ? "border-[#f6c94c] bg-[#0b3157] text-[#f6c94c]"
                    : "border-white bg-[#e4f1ec] text-[#147d76]",
                )}
              >
                {day.number}
              </div>

              <div
                className={cn(
                  "overflow-hidden rounded-[1.55rem] border bg-white shadow-[0_12px_30px_rgba(26,54,75,.06)] transition-colors",
                  isCurrent
                    ? "border-[#f6c94c] ring-2 ring-[#f6c94c]/20"
                    : "border-[#e5ddcf]",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${day.id}-content`}
                  className="flex min-h-24 w-full items-center gap-3 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#147d76] sm:p-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-[.68rem] font-extrabold uppercase tracking-[.14em] text-[#147d76]">
                        <span className="capitalize">{formatLongDate(day.date)}</span>
                      </p>
                      {isCurrent ? (
                        <span className="rounded-full bg-[#fff1bd] px-2 py-0.5 text-[.6rem] font-black uppercase tracking-[.12em] text-[#8a6200]">
                          Hoy
                        </span>
                      ) : null}
                      {statusMeta ? (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[.6rem] font-black uppercase tracking-[.1em]",
                            statusMeta.className,
                          )}
                        >
                          {statusMeta.label}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-1 text-lg font-black leading-tight text-[#0b3157] sm:text-xl">
                      {day.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#778690]">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="bed" className="size-3.5 text-[#c08a10]" />
                        {base?.town}
                      </span>
                      {day.driving ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="car" className="size-3.5 text-[#147d76]" />
                          {day.driving}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full bg-[#f4efe4] text-[#526773] transition-transform",
                      isOpen && "rotate-180",
                    )}
                  >
                    <Icon name="chevron" className="size-4" />
                  </span>
                </button>

                {isOpen ? (
                  <div
                    id={`${day.id}-content`}
                    className="animate-rise border-t border-[#eee7db] px-4 pb-5 pt-4 sm:px-5"
                  >
                    <p className="text-sm leading-6 text-[#60717c]">{day.summary}</p>

                    {mappedPlaces.length ? (
                      <Link
                        href={`/mapa?day=${day.id}`}
                        aria-label={`Ver los lugares del día ${day.number} en el mapa`}
                        className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#147d76] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#0b3157] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
                      >
                        <Icon name="map" className="size-4" />
                        Ver lugares en el mapa
                        <span
                          aria-hidden="true"
                          className="rounded-full bg-white/20 px-2 py-0.5 text-[.65rem]"
                        >
                          {mappedPlaces.length}
                        </span>
                      </Link>
                    ) : null}

                    {day.activities?.length ? (
                      <section className="mt-4">
                        <h3 className="mb-2 flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-[.13em] text-[#0b3157]">
                          <Icon name="clock" className="size-4 text-[#147d76]" />
                          Plan del día
                        </h3>
                        <ol className="divide-y divide-[#e9e3d8] overflow-hidden rounded-2xl bg-[#f8f5ee] px-3">
                          {day.activities.map((activity, index) => (
                            <li
                              key={`${activity.time ?? "plan"}-${index}`}
                              className="flex gap-3 py-3 text-xs leading-5 text-[#526773]"
                            >
                              {activity.time ? (
                                <span className="w-[4.3rem] shrink-0 font-extrabold text-[#147d76]">
                                  {activity.time}
                                </span>
                              ) : (
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#147d76]" />
                              )}
                              <span>{activity.text}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    ) : null}

                    {stops.length ? (
                      <section className="mt-4">
                        <h3 className="mb-2 flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-[.13em] text-[#0b3157]">
                          <Icon name="map" className="size-4 text-[#147d76]" />
                          En el mapa
                        </h3>
                        <ol className="space-y-2.5">
                          {stops.map((place, index) =>
                            place ? (
                              <li
                                key={place.id}
                                className="group flex items-center gap-3 rounded-2xl bg-[#f8f5ee] p-3 transition-colors hover:bg-[#f1eee5]"
                              >
                                <span
                                  className="grid size-9 shrink-0 place-items-center rounded-xl"
                                  style={{
                                    color: placeCategoryMeta[place.category].color,
                                    backgroundColor:
                                      placeCategoryMeta[place.category].accent,
                                  }}
                                >
                                  <CategoryIcon category={place.category} className="size-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[.62rem] font-extrabold uppercase tracking-[.12em] text-[#8a969e]">
                                    Parada {index + 1}
                                  </p>
                                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                                    <h4 className="min-w-0 max-w-full text-sm font-extrabold leading-tight text-[#173342]">
                                      {place.name}
                                    </h4>
                                    {place.status === "posible" ? (
                                      <span className="shrink-0 rounded-full bg-[#fff1bd] px-1.5 py-0.5 text-[.55rem] font-black uppercase tracking-[.08em] text-[#8a6200]">
                                        Posible
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                <Link
                                  href={`/mapa?day=${day.id}&lugar=${place.id}`}
                                  aria-label={`Ver ${place.name} en el mapa`}
                                  className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#147d76] shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
                                >
                                  <Icon name="map" className="size-4" />
                                </Link>
                              </li>
                            ) : null,
                          )}
                        </ol>
                      </section>
                    ) : null}

                    {day.meals?.length ? (
                      <section className="mt-4 rounded-2xl border border-[#f0d2bd] bg-[#fff4ec] p-3">
                        <h3 className="flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-[.13em] text-[#a8542d]">
                          <Icon name="utensils" className="size-4" />
                          Comida
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#765442]">
                          {day.meals.map((meal) => (
                            <li key={meal}>{meal}</li>
                          ))}
                        </ul>
                      </section>
                    ) : null}

                    {day.alternatives?.length ? (
                      <section className="mt-4 rounded-2xl border border-[#ded2e2] bg-[#f7f1f8] p-3">
                        <h3 className="flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-[.13em] text-[#73577c]">
                          <Icon name="sparkles" className="size-4" />
                          Si apetece
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#66536b]">
                          {day.alternatives.map((alternative) => (
                            <li key={alternative} className="flex gap-2">
                              <span aria-hidden="true">·</span>
                              <span>{alternative}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ) : null}

                    {day.logistics?.length ? (
                      <section className="mt-4 rounded-2xl border border-[#cddde7] bg-[#f0f6f8] p-3">
                        <h3 className="flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-[.13em] text-[#315d88]">
                          <Icon name="car" className="size-4" />
                          Logística
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#496875]">
                          {day.logistics.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    ) : null}

                    {day.notes ? (
                      <div className="mt-4 flex gap-2.5 rounded-2xl border border-[#f0df9a] bg-[#fff8db] p-3 text-xs leading-5 text-[#765e23]">
                        <Icon name="sparkles" className="mt-0.5 size-4 shrink-0 text-[#c08a10]" />
                        <p>{day.notes}</p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
