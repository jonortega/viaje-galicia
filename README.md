# Galicia 2026

Aplicación móvil para consultar el estado, el mapa y el itinerario de un viaje de siete noches por Galicia.

## Requisitos

- Node.js 20.9 o superior.
- pnpm 10 (el proyecto fija la versión recomendada en **package.json**).

## Desarrollo

~~~bash
pnpm install
pnpm dev
~~~

Abre [http://localhost:3000](http://localhost:3000).

## Comprobaciones

~~~bash
pnpm lint
pnpm typecheck
pnpm build
~~~

Para probar el resultado de producción:

~~~bash
pnpm start
~~~

## Personalizar el viaje

Todo el contenido está en [src/data/trip.ts](src/data/trip.ts):

- **startDate** y **endDate**: fechas del viaje.
- **bases**: alojamientos, noches y coordenadas.
- **days**: títulos, paradas, notas y conducción de cada día.
- **places**: lugares, categorías, coordenadas y enlaces a Google Maps.
- **playlist.url**: enlace de Spotify.

Los valores actuales son datos de muestra señalados con un TODO. Las fechas usan el formato AAAA-MM-DD y el estado del viaje se calcula en Europe/Madrid.

Una imagen opcional puede ser una ruta dentro de **public** (por ejemplo, **/lugares/fisterra.jpg**) o una URL. Si no carga, la interfaz muestra automáticamente el fallback visual de su categoría.

## Desplegar en Vercel

1. Sube el proyecto a un repositorio Git.
2. Impórtalo desde [Vercel](https://vercel.com/new).
3. Vercel detectará Next.js y **pnpm-lock.yaml**; no hacen falta variables de entorno.
4. Pulsa **Deploy**.

La aplicación es frontend-only y no necesita base de datos, autenticación ni servicios externos aparte de las teselas de OpenStreetMap.
