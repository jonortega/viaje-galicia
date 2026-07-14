import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { BottomNavigation } from "@/components/BottomNavigation";

export const metadata: Metadata = {
  title: {
    default: "Galicia 2026",
    template: "%s · Galicia 2026",
  },
  description:
    "La guía de nuestro viaje por las Rías Baixas y la Costa da Morte.",
};

export const viewport: Viewport = {
  themeColor: "#0b3157",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
