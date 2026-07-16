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
- **playlist.image**: portada local de la playlist.

Las fechas usan el formato AAAA-MM-DD y el estado del viaje se calcula en Europe/Madrid.

## Fotografías locales

La portada provisional de Spotify está en:

**public/images/spotify/playlist-cover.svg**

Puedes sustituir ese archivo manteniendo el nombre. Si prefieres otro formato, guarda el nuevo archivo en la misma carpeta y cambia únicamente **playlist.image** en **src/data/trip.ts**.

Las fotografías de los lugares se guardan en:

**public/images/places/**

Cada lugar ya tiene su ruta esperada en el campo **image** de **src/data/trip.ts**. Para añadir o reemplazar una fotografía:

1. Guarda la imagen con el nombre indicado, por ejemplo **public/images/places/faro-cabo-vilan.webp**.
2. Mantén el mismo encuadre en formato horizontal o cuadrado; la aplicación usa recorte con **object-fit: cover**.
3. Si cambias el nombre o formato, actualiza solo el campo **image** del lugar.

Mientras un archivo no exista o no pueda cargarse, el panel muestra un fondo neutro con el texto “Foto pendiente”.

## Desplegar en Vercel

1. Sube el proyecto a un repositorio Git.
2. Impórtalo desde [Vercel](https://vercel.com/new).
3. Vercel detectará Next.js y **pnpm-lock.yaml**; no hacen falta variables de entorno.
4. Pulsa **Deploy**.

La aplicación es frontend-only y no necesita base de datos, autenticación ni servicios externos aparte de las teselas de OpenStreetMap.
