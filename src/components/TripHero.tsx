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
          className="absolute inset-0 bg-[linear-gradient(145deg,#0b3157,#147d76)]"
        />
      )}
    </div>
  );
}
