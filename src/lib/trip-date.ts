import type { Trip, TripDay } from "@/types/trip";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

export type TripStatus =
  | { phase: "before"; days: number; hours: number }
  | {
      phase: "during";
      dayNumber: number;
      totalDays: number;
      date: string;
      currentDay?: TripDay;
    }
  | { phase: "after" };

function dateParts(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

function dateAtNoonUtc(date: string) {
  return new Date(`${date}T12:00:00Z`);
}

export function getDateKeyInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function zonedMidnightTimestamp(date: string, timeZone: string) {
  const { year, month, day } = dateParts(date);
  const utcGuess = Date.UTC(year, month - 1, day);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcGuess));
  const values = Object.fromEntries(
    parts.map((part) => [part.type, Number(part.value)]),
  );
  const representedAsUtc = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second,
  );
  return utcGuess - (representedAsUtc - utcGuess);
}

function calendarDayDifference(start: string, end: string) {
  const from = dateParts(start);
  const to = dateParts(end);
  return Math.round(
    (Date.UTC(to.year, to.month - 1, to.day) -
      Date.UTC(from.year, from.month - 1, from.day)) /
      DAY_MS,
  );
}

export function getTripStatus(trip: Trip, now = new Date()): TripStatus {
  const currentDate = getDateKeyInTimeZone(now, trip.timeZone);

  if (currentDate < trip.startDate) {
    const remaining = Math.max(
      0,
      zonedMidnightTimestamp(trip.startDate, trip.timeZone) - now.getTime(),
    );
    return {
      phase: "before",
      days: Math.floor(remaining / DAY_MS),
      hours: Math.floor((remaining % DAY_MS) / HOUR_MS),
    };
  }

  if (currentDate > trip.endDate) {
    return { phase: "after" };
  }

  const dayNumber = calendarDayDifference(trip.startDate, currentDate) + 1;
  return {
    phase: "during",
    dayNumber,
    totalDays: trip.days.length,
    date: currentDate,
    currentDay: trip.days.find((day) => day.date === currentDate),
  };
}

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dateAtNoonUtc(date));
}

export function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  })
    .format(dateAtNoonUtc(date))
    .replace(".", "");
}

export function formatTripRange(start: string, end: string) {
  const startParts = dateParts(start);
  const endParts = dateParts(end);
  const startDay = new Intl.DateTimeFormat("es-ES", { day: "numeric" }).format(
    dateAtNoonUtc(start),
  );
  const endLabel = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateAtNoonUtc(end));

  if (startParts.year === endParts.year && startParts.month === endParts.month) {
    return `${startDay}–${endLabel}`;
  }

  const startLabel = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
  }).format(dateAtNoonUtc(start));
  return `${startLabel} – ${endLabel}`;
}
