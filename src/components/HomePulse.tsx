"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { MentawaiPanel } from "@/components/MentawaiPanel";
import { trip } from "@/data/trip";
import { formatLongDate, getTripStatus } from "@/lib/trip-date";

export function HomePulse() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const status = getTripStatus(trip, now);

  if (status.phase === "before") {
    const firstDay = trip.days[0];
    const previewStops = firstDay.stopIds
      .map((id) => trip.places.find((place) => place.id === id))
      .filter(Boolean)
      .slice(0, 2);

    return (
      <section className='grid gap-3 lg:grid-cols-[.9fr_1.1fr]'>
        <div className='grid gap-3 min-[360px]:grid-cols-[minmax(0,2fr)_minmax(7rem,1fr)]'>
          <div className='flex min-h-32 flex-col justify-center rounded-[1.6rem] bg-[#e4f1ec] p-4 text-[#0b3157] min-[400px]:p-5'>
            <div className='flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#147d76]'>
              <Icon name='clock' className='size-4 shrink-0' />
              Cuenta atrás
            </div>
            <div
              role='timer'
              aria-label={"Faltan " + status.days + " días y " + status.hours + " horas"}
              className='mt-3 flex items-baseline justify-center gap-1.5 whitespace-nowrap'
            >
              <span className='inline-flex items-baseline gap-1.5'>
                <strong className='text-4xl font-black leading-none tabular-nums tracking-[-.06em] min-[360px]:text-3xl xl:text-4xl'>
                  {status.days}
                </strong>
                <span className='text-base font-bold text-[#496875] min-[360px]:text-sm xl:text-base'>días</span>
              </span>
              <span className='text-sm font-bold text-[#7b8a92]'>y</span>
              <span className='inline-flex items-baseline gap-1.5'>
                <strong className='text-4xl font-black leading-none tabular-nums tracking-[-.06em] min-[360px]:text-3xl xl:text-4xl'>
                  {status.hours}
                </strong>
                <span className='text-base font-bold text-[#496875] min-[360px]:text-sm xl:text-base'>
                  horas
                </span>
              </span>
            </div>
          </div>

          <MentawaiPanel group={trip.travelGroup} />
        </div>

        <div className='rounded-[1.6rem] border border-[#e5ddcf] bg-white p-5 shadow-[0_14px_35px_rgba(26,54,75,.07)]'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-xs font-extrabold uppercase tracking-[.16em] text-[#c08a10]'>Próximo plan</p>
              <h2 className='mt-1 text-xl font-black text-[#0b3157]'>Día 1 · {firstDay.title}</h2>
            </div>
            <span className='grid size-10 shrink-0 place-items-center rounded-full bg-[#fff1bd] text-[#9c6c00]'>
              <Icon name='sparkles' className='size-5' />
            </span>
          </div>
          <p className='mt-3 text-sm leading-6 text-[#60717c]'>{firstDay.summary}</p>
          <div className='mt-4 flex flex-wrap gap-2'>
            {previewStops.map((place) =>
              place ? (
                <span key={place.id} className='rounded-full bg-[#f4efe4] px-3 py-1.5 text-xs font-bold text-[#435967]'>
                  {place.name}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </section>
    );
  }

  if (status.phase === "during") {
    const currentDay = status.currentDay;
    return (
      <section className='grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]'>
        <div className='rounded-[1.75rem] bg-[#0b3157] p-5 text-white shadow-[0_18px_45px_rgba(11,49,87,.2)] sm:p-6'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-xs font-extrabold uppercase tracking-[.16em] text-[#f6c94c]'>Estamos de viaje</p>
              <h2 className='mt-1 text-2xl font-black'>
                Día {status.dayNumber} de {status.totalDays}
              </h2>
              <p className='mt-1 text-sm capitalize text-white/65'>{formatLongDate(status.date)}</p>
            </div>
            <span className='grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#f6c94c]'>
              <Icon name='compass' className='size-6' />
            </span>
          </div>
          {currentDay ? (
            <>
              <div className='my-5 h-px bg-white/10' />
              <h3 className='text-xl font-extrabold'>{currentDay.title}</h3>
              <p className='mt-2 text-sm leading-6 text-white/72'>{currentDay.summary}</p>
            </>
          ) : null}
          <div className='mt-5 flex gap-2'>
            <Link
              href='/itinerario'
              className='inline-flex min-h-11 items-center rounded-full bg-[#f6c94c] px-4 text-sm font-extrabold text-[#0b3157] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
              Ver el día
            </Link>
            <Link
              href='/mapa'
              className='inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm font-extrabold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
              Abrir mapa
            </Link>
          </div>
        </div>

        <MentawaiPanel group={trip.travelGroup} compactLayout='wide' />
      </section>
    );
  }

  return (
    <section className='grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]'>
      <div className='rounded-[1.75rem] bg-[#e4f1ec] p-6 text-[#0b3157]'>
        <span className='grid size-11 place-items-center rounded-full bg-white text-[#147d76] shadow-sm'>
          <Icon name='sparkles' className='size-6' />
        </span>
        <h2 className='mt-4 text-2xl font-black'>Viaje finalizado</h2>
        <p className='mt-2 max-w-xl text-sm leading-6 text-[#496875]'>
          El itinerario y los lugares guardados siguen disponibles para consultarlos.
        </p>
      </div>

      <MentawaiPanel group={trip.travelGroup} compactLayout='wide' />
    </section>
  );
}
