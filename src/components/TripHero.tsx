"use client";

import { useState } from "react";
import type { TripHeroInfo } from "@/types/trip";

export function TripHero({ image, alt }: TripHeroInfo) {
  const [failedImage, setFailedImage] = useState<string>();
  const showImage = Boolean(image && failedImage !== image);

  return (
    <div className="absolute inset-0 bg-[#0b3157]">
      {showImage ? (
        // Se usa una imagen normal para ocultarla por completo si el archivo local falla.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 size-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={() => setFailedImage(image)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_70%_25%,rgba(22,135,167,.75),transparent_35%),linear-gradient(145deg,#0b3157,#147d76)] px-6 text-center"
        >
          <span
            aria-hidden="true"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-white/80 backdrop-blur-sm"
          >
            Imagen del viaje
          </span>
        </div>
      )}
    </div>
  );
}
