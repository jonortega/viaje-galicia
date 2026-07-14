import type { PlaceCategory } from "@/types/trip";

export type IconName =
  | "home"
  | "map"
  | "calendar"
  | "compass"
  | "music"
  | "clock"
  | "bed"
  | "car"
  | "pin"
  | "users"
  | "external"
  | "chevron"
  | "close"
  | "shell"
  | "sparkles"
  | "building"
  | "waves"
  | "utensils"
  | "landmark"
  | "leaf";

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className = "size-5", strokeWidth = 1.8 }: IconProps) {
  const content = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4Z" /></>,
    music: <><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    bed: <><path d="M3 19v-8M21 19v-6a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2" /><path d="M3 15h18M6 10V7h5v3" /></>,
    car: <><path d="m5 16-1 3M19 16l1 3M3 13l2-6h14l2 6v4H3Z" /><path d="M7 17v2M17 17v2M7 13h.01M17 13h.01" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    shell: <><path d="M12 21V7M5 19l7-12 7 12M3 14l9-7 9 7M7 5l5 2 5-2" /></>,
    sparkles: <><path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2Z" /><path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7ZM5 13l-.7 2.3L2 16l2.3.7L5 19l.7-2.3L8 16l-2.3-.7Z" /></>,
    building: <><path d="M4 21V8l8-5 8 5v13M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01" /></>,
    waves: <><path d="M2 9c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 3 2M2 14c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 3 2M2 19c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 3 2" /></>,
    utensils: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c4 2 4 7 0 9" /></>,
    landmark: <><path d="m3 10 9-6 9 6M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M3 21h18M4 18h16" /></>,
    leaf: <><path d="M20 4C11 4 5 9 5 16c0 2 1 4 3 5 1-7 5-11 12-17Z" /><path d="M5 20c3-4 7-7 12-9" /></>,
  }[name];

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {content}
    </svg>
  );
}

export function CategoryIcon({
  category,
  className,
}: {
  category: PlaceCategory;
  className?: string;
}) {
  const names: Record<PlaceCategory, IconName> = {
    alojamiento: "bed",
    pueblo: "building",
    playa: "waves",
    mirador: "compass",
    comida: "utensils",
    cultura: "landmark",
    naturaleza: "leaf",
  };
  return <Icon name={names[category]} className={className} />;
}
