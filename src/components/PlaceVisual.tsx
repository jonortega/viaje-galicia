"use client";

import { useState } from "react";
import { CategoryIcon } from "@/components/Icon";
import { placeCategoryMeta } from "@/data/trip";
import { cn } from "@/lib/cn";
import type { Place } from "@/types/trip";

const backgrounds = {
  alojamiento: "from-[#0b3157] to-[#315d88]",
  pueblo: "from-[#147d76] to-[#65ad9e]",
  playa: "from-[#1687a7] to-[#85ced4]",
  mirador: "from-[#315d88] to-[#82a6c3]",
  comida: "from-[#c86f3d] to-[#e3a66f]",
  cultura: "from-[#73577c] to-[#a58aab]",
  naturaleza: "from-[#39805f] to-[#80aa76]",
};

export function PlaceVisual({
  place,
  className,
  compact = false,
}: {
  place: Place;
  className?: string;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const meta = placeCategoryMeta[place.category];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br",
        backgrounds[place.category],
        compact ? "h-24" : "h-36",
        className,
      )}
    >
      {place.image && !failed ? (
        // Se usa una imagen normal para aceptar tanto rutas locales como URLs configurables.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={place.image}
          alt={`Vista de ${place.name}`}
          className="absolute inset-0 size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div className="absolute -right-7 -top-8 size-28 rounded-full border-[18px] border-white/10" />
          <div className="absolute -bottom-10 -left-6 h-20 w-40 rotate-[-9deg] rounded-[50%] bg-white/10" />
          <CategoryIcon
            category={place.category}
            className="absolute bottom-4 right-4 size-12 text-white/25"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[.65rem] font-extrabold uppercase tracking-[.12em] text-white backdrop-blur-sm">
            {meta.label}
          </span>
        </>
      )}
    </div>
  );
}
