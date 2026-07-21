export type PlaceCategory =
  | "alojamiento"
  | "pueblo"
  | "playa"
  | "mirador"
  | "comida"
  | "cultura"
  | "naturaleza";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PlaylistInfo {
  title: string;
  subtitle: string;
  url: string;
  image: string;
}

export interface TripHeroInfo {
  image: string;
  alt: string;
}

export interface AccommodationBase {
  id: string;
  name: string;
  town: string;
  nights: number;
  coordinates: Coordinates;
  note?: string;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  coordinates: Coordinates;
  description: string;
  image?: string;
  dayIds: string[];
  baseId?: string;
  practicalNote?: string;
  mapsUrl: string;
}

export type TripDayStatus = "confirmado" | "provisional" | "por-decidir";

export interface TripActivity {
  text: string;
  time?: string;
}

export interface TripDay {
  id: string;
  number: number;
  date: string;
  baseId: string;
  title: string;
  summary: string;
  stopIds: string[];
  activities?: TripActivity[];
  meals?: string[];
  alternatives?: string[];
  logistics?: string[];
  status?: TripDayStatus;
  notes?: string;
  driving?: string;
}

export interface Trip {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  timeZone: string;
  travelers: number;
  hero: TripHeroInfo;
  driveFolderUrl: string;
  playlist: PlaylistInfo;
  bases: AccommodationBase[];
  days: TripDay[];
  places: Place[];
}

export interface PlaceCategoryMeta {
  label: string;
  color: string;
  accent: string;
}
