# Plan de implementación — Galicia 2026

## MVP propuesto

Una aplicación web móvil para consultar de un vistazo el estado del viaje, el plan de cada día y los lugares guardados en un mapa. Todo el contenido será local, tipado y editable desde `src/data/trip.ts`.

## Pantallas y componentes

- **Inicio:** hero, cuenta atrás o día actual, resumen del viaje, próximas paradas, bases y acceso a Spotify.
- **Mapa:** mapa Leaflet, filtros por categoría, marcadores diferenciados y ficha inferior del lugar seleccionado.
- **Itinerario:** acordeones por día con base, paradas, notas y conducción aproximada.
- **Compartidos:** navegación inferior, iconos SVG, tarjetas de lugar, fallback visual de imágenes y utilidades de fechas.

## Modelo de datos

- `Trip`: título, fechas, zona horaria, viajeros, playlist, bases, días y lugares.
- `TripDay`: fecha, tema, base, paradas, notas y conducción.
- `AccommodationBase`: nombre, localidad, noches, coordenadas y nota.
- `Place`: categoría, coordenadas, descripción, días asociados, base, imagen opcional, nota práctica y enlace a Maps.
- `PlaceCategory` y `PlaylistInfo`: categorías visuales y datos de la playlist.

## Orden de implementación

1. Configurar Next.js, Tailwind y dependencias del mapa.
2. Crear tipos, datos de ejemplo y utilidades temporales para `Europe/Madrid`.
3. Construir layout, navegación y sistema visual compartido.
4. Implementar Inicio, Mapa e Itinerario.
5. Documentar personalización y despliegue.
6. Validar lint, tipos, build y experiencia móvil en navegador.

## Mejoras futuras opcionales

- Instalable como PWA con caché básica.
- Álbum de fotos del grupo.
- Previsión meteorológica bajo demanda.
- Edición compartida antes del viaje.
