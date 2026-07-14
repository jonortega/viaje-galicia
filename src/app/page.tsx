import Link from "next/link";
import { HomePulse } from "@/components/HomePulse";
import { Icon } from "@/components/Icon";
import { trip } from "@/data/trip";
import { formatTripRange } from "@/lib/trip-date";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl pb-28 md:pb-32">
      <section className="relative isolate min-h-[25rem] overflow-hidden rounded-b-[2.6rem] bg-[#0b3157] px-5 pb-8 pt-7 text-white shadow-[0_20px_60px_rgba(11,49,87,.18)] sm:mx-5 sm:mt-5 sm:rounded-[2.6rem] sm:px-9 sm:pt-9">
        <div className="absolute -right-28 -top-32 size-80 rounded-full border-[54px] border-[#1687a7]/25" />
        <div className="absolute -bottom-28 -left-16 h-52 w-[34rem] rotate-[-7deg] rounded-[50%] bg-[#147d76]/60" />
        <div className="absolute -bottom-36 left-24 h-52 w-[34rem] rotate-[4deg] rounded-[50%] bg-[#1687a7]/35" />

        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[.68rem] font-extrabold uppercase tracking-[.18em] backdrop-blur-sm">
            <Icon name="compass" className="size-4 text-[#f6c94c]" />
            Ruta atlántica
          </span>
          <span className="grid size-11 place-items-center rounded-full bg-[#f6c94c] text-[#0b3157] shadow-lg shadow-black/10">
            <Icon name="shell" className="size-6" strokeWidth={2.1} />
          </span>
        </div>

        <div className="relative mt-14 max-w-2xl">
          <p className="mb-2 text-sm font-bold text-[#a8d8dc]">
            {formatTripRange(trip.startDate, trip.endDate)}
          </p>
          <h1 className="text-[3.4rem] font-black leading-[.88] tracking-[-.07em] sm:text-7xl">
            Galicia
            <span className="block text-[#f6c94c]">2026</span>
          </h1>
          <p className="mt-5 max-w-sm text-base font-medium leading-6 text-white/72 sm:text-lg">
            {trip.subtitle}
          </p>
        </div>
      </section>

      <div className="space-y-8 px-5 pt-7 sm:px-8">
        <HomePulse />

        <section aria-labelledby="bases-title">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#147d76]">
                Nuestro campamento
              </p>
              <h2 id="bases-title" className="mt-1 text-2xl font-black tracking-tight text-[#0b3157]">
                Tres bases, siete noches
              </h2>
            </div>
            <Link
              href="/itinerario"
              className="text-sm font-extrabold text-[#147d76] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]"
            >
              Ver ruta
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {trip.bases.map((base, index) => (
              <article
                key={base.id}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#e5ddcf] bg-white p-5 shadow-[0_12px_30px_rgba(26,54,75,.06)]"
              >
                <span className="absolute right-3 top-1 text-6xl font-black text-[#0b3157]/[.035]">
                  {index + 1}
                </span>
                <div className="grid size-10 place-items-center rounded-xl bg-[#e4f1ec] text-[#147d76]">
                  <Icon name="bed" className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-black text-[#0b3157]">{base.town}</h3>
                <p className="mt-1 text-sm text-[#60717c]">{base.name}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[.1em] text-[#c08a10]">
                  <span className="size-1.5 rounded-full bg-[#f6c94c]" />
                  {base.nights} {base.nights === 1 ? "noche" : "noches"}
                </p>
              </article>
            ))}
          </div>
        </section>

        <a
          href={trip.playlist.url}
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-24 items-center gap-4 rounded-[1.6rem] bg-[#183c34] p-4 text-white shadow-[0_15px_35px_rgba(24,60,52,.16)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76] sm:p-5"
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#1ed760] text-[#102c25] shadow-inner">
            <Icon name="music" className="size-7" strokeWidth={2.2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[.68rem] font-extrabold uppercase tracking-[.16em] text-white/55">
              Dale al play
            </span>
            <strong className="mt-1 block truncate text-lg">{trip.playlist.title}</strong>
            <span className="mt-0.5 block truncate text-xs text-white/60">
              {trip.playlist.subtitle}
            </span>
          </span>
          <Icon name="external" className="mr-1 size-5 shrink-0 text-white/55 transition-transform group-hover:translate-x-0.5" />
        </a>

        <section className="grid grid-cols-3 overflow-hidden rounded-[1.6rem] border border-[#e5ddcf] bg-white py-5 shadow-[0_12px_30px_rgba(26,54,75,.05)]">
          {[
            { value: trip.days.length, label: "días", icon: "calendar" as const },
            { value: trip.bases.length, label: "bases", icon: "bed" as const },
            { value: trip.places.length, label: "lugares", icon: "pin" as const },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-2 text-center ${index ? "border-l border-[#ece5d9]" : ""}`}
            >
              <Icon name={stat.icon} className="mb-2 size-4 text-[#147d76]" />
              <strong className="text-2xl font-black tracking-tight text-[#0b3157]">
                {stat.value}
              </strong>
              <span className="text-[.68rem] font-bold uppercase tracking-[.12em] text-[#82909a]">
                {stat.label}
              </span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
