import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { BottomNavigation } from "@/components/BottomNavigation";

const siteName = "Galicia 2026";
const siteDescription =
  "Aplicación web del viaje a Galicia 20206 de Mentawai: Mapa, itinerario, documentos y playlist para el camino.";
const shareImagePath = "/images/trip/hero-captura.png";

function getSiteUrl() {
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || (vercelProductionUrl ? `https://${vercelProductionUrl}` : undefined);

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "development") {
      return new URL("http://localhost:3000");
    }

    throw new Error("Define NEXT_PUBLIC_SITE_URL con la URL pública HTTPS antes de crear la build de producción.");
  }

  const siteUrl = new URL(configuredUrl);

  if (process.env.NODE_ENV === "production" && siteUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL debe usar HTTPS en producción.");
  }

  siteUrl.pathname = siteUrl.pathname.replace(/\/+$/, "") || "/";
  siteUrl.search = "";
  siteUrl.hash = "";

  return siteUrl;
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName,
    images: [
      {
        url: shareImagePath,
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Vista previa del viaje a Galicia 2026",
      },
    ],
  },
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
    <html lang='es'>
      <body>
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
