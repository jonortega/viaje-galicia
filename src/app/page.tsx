import Image from "next/image";
import Link from "next/link";
import { HomePulse } from "@/components/HomePulse";
import { Icon } from "@/components/Icon";
import { TripHero } from "@/components/TripHero";
import { trip } from "@/data/trip";
import { formatShortDate, formatTripRange } from "@/lib/trip-date";

function addCalendarDays(date: string, days: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export default function HomePage() {
  const accommodations = trip.bases.map((accommodation) => {
    const firstDate = trip.days.find(
      (day) => day.baseId === accommodation.id,
    )?.date;
    const dateLabel = firstDate
      ? `${formatShortDate(firstDate)}–${formatShortDate(
          addCalendarDays(firstDate, accommodation.nights),
        )}`
      : undefined;

    return { accommodation, dateLabel };
  });

  return (
    <main className='mx-auto w-full max-w-6xl pb-28 md:pb-32'>
      <section className='relative isolate min-h-88 overflow-hidden rounded-b-[2.6rem] bg-[#0b3157] px-5 pb-8 pt-7 text-white shadow-[0_20px_60px_rgba(11,49,87,.18)] sm:mx-5 sm:mt-5 sm:rounded-[2.6rem] sm:px-9 sm:pt-9'>
        <TripHero {...trip.hero} />
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,55,.72)_0%,rgba(7,31,55,.52)_52%,rgba(7,31,55,.28)_100%)]'
        />

        <div className='relative z-10 flex items-center justify-between'>
          <span className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[.68rem] font-extrabold uppercase tracking-[.18em] backdrop-blur-sm'>
            <Icon name='compass' className='size-4 text-[#f6c94c]' />
            Viaje por Galicia
          </span>
          <span className='grid size-11 place-items-center rounded-full bg-[#f6c94c] text-[#0b3157] shadow-lg shadow-black/10'>
            <Icon name='shell' className='size-6' strokeWidth={2.1} />
          </span>
        </div>

        <div className='relative z-10 mt-12 max-w-2xl'>
          <p className='mb-2 text-sm font-bold text-[#a8d8dc]'>{formatTripRange(trip.startDate, trip.endDate)}</p>
          <h1 className='text-[3.4rem] font-black leading-[.88] tracking-[-.07em] sm:text-7xl'>
            Galicia
            <span className='block text-[#f6c94c]'>2026</span>
          </h1>
          {trip.subtitle ? (
            <p className='mt-5 max-w-sm text-base font-medium leading-6 text-white/72 sm:text-lg'>
              {trip.subtitle}
            </p>
          ) : null}
        </div>
      </section>

      <div className='space-y-8 px-5 pt-7 sm:px-8'>
        <HomePulse />

        <section aria-labelledby='documents-title'>
          <div className='rounded-[1.6rem] border border-[#e5ddcf] bg-white p-4 shadow-[0_12px_28px_rgba(26,54,75,.055)] sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-5'>
            <div className='flex min-w-0 flex-1 items-start gap-3'>
              <span className='grid size-11 shrink-0 place-items-center rounded-xl bg-[#e4f1ec] text-[#147d76]'>
                <Icon name='folder' className='size-5' />
              </span>
              <div className='min-w-0'>
                <h2 id='documents-title' className='text-lg font-black text-[#0b3157]'>
                  Documentos del viaje
                </h2>
                <p className='mt-1 text-sm leading-5 text-[#60717c]'>
                  Billetes de avión, alquiler coche, reservas...
                </p>
              </div>
            </div>
            <a
              href={trip.driveFolderUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Abrir la carpeta de documentos del viaje en Google Drive en una pestaña nueva'
              className='mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#e4f1ec] px-4 py-2.5 text-sm font-extrabold text-[#0b3157] transition-colors hover:bg-[#d5e9e1] active:bg-[#c8dfd6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76] sm:mt-0 sm:w-auto sm:shrink-0'
            >
              Abrir carpeta de Drive
              <Icon name='external' className='size-4' />
            </a>
          </div>
        </section>

        <section aria-label='Playlist del viaje'>
          <a
            href={trip.playlist.url}
            target='_blank'
            rel='noreferrer'
            aria-label={`Abrir la playlist ${trip.playlist.title} en Spotify`}
            className='group grid grid-cols-1 overflow-hidden rounded-[1.75rem] bg-[#183c34] text-white shadow-[0_18px_42px_rgba(24,60,52,.2)] transition-transform hover:-translate-y-0.5 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#147d76] sm:min-h-48 sm:grid-cols-[12rem_1fr]'
          >
            <span className='relative aspect-square w-full overflow-hidden bg-[#dce7df] sm:aspect-auto sm:min-h-48'>
              <Image
                src={trip.playlist.image}
                alt={`Portada de la playlist ${trip.playlist.title}`}
                fill
                sizes='(max-width: 639px) calc(100vw - 2.5rem), 192px'
                className='object-cover object-center'
              />
            </span>
            <span className='flex min-w-0 flex-col justify-center p-5 sm:p-6'>
              <span className='flex items-center gap-2 text-[.66rem] font-extrabold uppercase tracking-[.16em] text-[#8ce6aa]'>
                <span className='grid size-7 place-items-center rounded-full bg-[#1ed760] text-[#102c25]'>
                  <Icon name='music' className='size-4' strokeWidth={2.2} />
                </span>
                Playlist del viaje
              </span>
              <strong className='mt-3 text-xl leading-tight sm:text-2xl'>{trip.playlist.title}</strong>
              <span className='mt-1.5 text-xs leading-5 text-white/65 sm:text-sm'>{trip.playlist.subtitle}</span>
              <span className='mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-extrabold text-[#183c34] transition-colors group-hover:bg-[#e8f7ed] sm:mt-4 sm:min-h-10 sm:w-fit sm:justify-start sm:px-3.5 sm:py-2'>
                Abrir en Spotify
                <Icon name='external' className='size-3.5' />
              </span>
            </span>
          </a>
        </section>

        <section aria-labelledby='accommodations-title'>
          <div className='mb-4 flex items-end justify-between gap-4'>
            <div>
              <p className='text-xs font-extrabold uppercase tracking-[.16em] text-[#147d76]'>Alojamientos</p>
              <h2 id='accommodations-title' className='mt-1 text-2xl font-black tracking-tight text-[#0b3157]'>
                Dónde dormimos
              </h2>
            </div>
            <Link
              href='/itinerario'
              className='shrink-0 text-sm font-extrabold text-[#147d76] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]'
            >
              Ver itinerario
            </Link>
          </div>

          <div className='grid gap-2.5 md:grid-cols-3'>
            {accommodations.map(({ accommodation, dateLabel }) => (
              <article
                key={accommodation.id}
                className='flex min-h-24 items-center gap-3 rounded-[1.35rem] border border-[#e5ddcf] bg-white p-3.5 shadow-[0_10px_24px_rgba(26,54,75,.055)]'
              >
                <span className='grid size-11 shrink-0 place-items-center rounded-xl bg-[#e4f1ec] text-[#147d76]'>
                  <Icon name='bed' className='size-5' />
                </span>
                <span className='min-w-0 flex-1'>
                  <span className='block text-[.62rem] font-extrabold uppercase tracking-[.12em] text-[#7b8a92]'>
                    {accommodation.town}
                  </span>
                  <strong className='mt-0.5 block truncate text-sm text-[#0b3157]'>{accommodation.name}</strong>
                  {dateLabel ? <span className='mt-1 block text-xs font-semibold text-[#60717c]'>{dateLabel}</span> : null}
                </span>
                <span className='shrink-0 rounded-xl bg-[#fff6d7] px-2.5 py-2 text-center text-[#8a6200]'>
                  <strong className='block text-lg leading-none'>{accommodation.nights}</strong>
                  <span className='mt-1 block text-[.58rem] font-extrabold uppercase tracking-[.08em]'>
                    {accommodation.nights === 1 ? "noche" : "noches"}
                  </span>
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
