"use client";

import { useState } from "react";
import { placeCategoryMeta } from "@/data/trip";
import { cn } from "@/lib/cn";
import type { Place } from "@/types/trip";

export function PlaceVisual({
  place,
  className,
  compact = false,
}: {
  place: Place;
  className?: string;
  compact?: boolean;
}) {
  const [failedImage, setFailedImage] = useState<string>();
  const meta = placeCategoryMeta[place.category];
  const showImage = Boolean(place.image && failedImage !== place.image);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[#e9e7e1]",
        compact ? "min-h-28" : "aspect-[4/3]",
        className,
      )}
    >
      {showImage ? (
        // Se usa una imagen normal para aceptar tanto rutas locales como URLs configurables.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={place.image}
          alt={`Fotografía de ${place.name}`}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setFailedImage(place.image)}
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center px-3 text-center text-[.65rem] font-bold uppercase tracking-[.12em] text-[#7c8588]">
          Foto pendiente
        </span>
      )}
      <span
        className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full px-2.5 py-1 text-[.58rem] font-extrabold uppercase tracking-[.1em] text-white shadow-sm"
        style={{ backgroundColor: meta.color }}
      >
        {meta.label}
      </span>
    </div>
  );
}
