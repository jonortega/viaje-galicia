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
- **travelGroup**: nombre del grupo, viajeros y rutas de sus fotografías.
- **playlist.url**: enlace de Spotify.
- **playlist.image**: portada local de la playlist.

Las fechas usan el formato AAAA-MM-DD y el estado del viaje se calcula en Europe/Madrid.

## Fotografías locales

La portada provisional de Spotify está en:

**public/images/spotify/playlist-cover-placeholder.webp**

Puedes sustituir ese archivo manteniendo el nombre. Si prefieres otro formato, guarda el nuevo archivo en la misma carpeta y cambia únicamente **playlist.image** en **src/data/trip.ts**.

Las fotografías de los lugares se guardan en:

**public/images/places/**

Cada lugar ya tiene su ruta esperada en el campo **image** de **src/data/trip.ts**. Para añadir o reemplazar una fotografía:

1. Guarda la imagen con el nombre indicado, por ejemplo **public/images/places/faro-cabo-vilan.webp**.
2. Mantén el mismo encuadre en formato horizontal o cuadrado; la aplicación usa recorte con **object-fit: cover**.
3. Si cambias el nombre o formato, actualiza solo el campo **image** del lugar.

Mientras un archivo no exista o no pueda cargarse, el panel muestra un fondo neutro con el texto “Foto pendiente”.

Las fotografías del grupo Mentawai se guardan en:

**public/images/travelers/**

Usa estos nombres para que aparezcan automáticamente sin editar componentes:

- **ibon.webp**
- **bilbao.webp**
- **olea.webp**
- **ortega.webp**

Mientras una fotografía no exista, se muestran las iniciales de la persona. Los nombres, las rutas y la posición opcional del recorte (**imagePosition**) se editan en **travelGroup.members** dentro de **src/data/trip.ts**.

## Vista previa al compartir

La vista previa de WhatsApp usa la imagen local:

**public/images/trip/share-preview.webp**

Debe ser una imagen horizontal de 1200 × 630 píxeles, con buen contraste y los elementos importantes alejados de los bordes. Para cambiarla:

1. Sustituye el archivo manteniendo el mismo nombre y formato.
2. No cambies componentes ni rutas.
3. Vuelve a desplegar la aplicación.
4. WhatsApp cargará la nueva imagen cuando actualice su caché.

La variable pública **NEXT_PUBLIC_SITE_URL** debe contener la URL canónica completa con HTTPS. En Vercel, asígnale el dominio de producción o el dominio personalizado en el entorno **Production**. Si no se define allí, la aplicación usa **VERCEL_PROJECT_PRODUCTION_URL**; fuera de Vercel, una build de producción exige la variable para evitar publicar metadatos con una URL local.

## Desplegar en Vercel

1. Sube el proyecto a un repositorio Git.
2. Impórtalo desde [Vercel](https://vercel.com/new).
3. Define **NEXT_PUBLIC_SITE_URL** para **Production** con el dominio público completo, por ejemplo **https://tu-proyecto.vercel.app**.
4. Vercel detectará Next.js y **pnpm-lock.yaml**.
5. Pulsa **Deploy**.

La aplicación es frontend-only y no necesita base de datos, autenticación ni servicios externos aparte de las teselas de OpenStreetMap.
