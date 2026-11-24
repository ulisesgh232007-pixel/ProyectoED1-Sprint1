# Proyecto ED1 · Gestión de estaciones de laboratorio

Proyecto integrador de Estructura de Datos — Proyecto D «Laboratorios y
talleres», Equipo 1 · Prácticas y estaciones.

## Cómo correrlo

Requiere Node.js 18 o superior (usa `fetch` y `AbortSignal.timeout`).

```bash
npm start
```

o directamente:

```bash
node src/main.js
```

El programa muestra un menú principal en la consola.

También hay una interfaz web auxiliar del sprint 1: abrir `index.html`
en el navegador.

## URL base de los servicios (HU-D13)

La URL base está en un solo lugar: `src/config.js`

```js
export const BASE_URL = "https://servicios-proyecto-ed.vercel.app/api/v1";
export const PUERTO_API = 8080;
```

Cambiando solo `BASE_URL`, el programa lee `inscritos_practicas` desde
otra URL. Si el servicio no responde, el programa avisa y no se detiene;
la conexión se reintenta con la opción 10 del menú.

## Endpoints propios

Al arrancar, el programa publica los resultados en
`http://localhost:8080/api/v1/resultados_practicas`, con el mismo formato
que los servicios de prueba:

- `GET /api/v1/resultados_practicas` — lista con envoltura
  `{recurso, generado, total, datos}`.
- `GET /api/v1/resultados_practicas/{folio_inscripcion}` — un registro
  por su clave; `404 {"detail":"no encontrado"}` si no existe.

Campos de cada registro: `folio_inscripcion`, `matricula`, `practica_id`,
`asistio` (S/N), `calificacion` (0 a 10), `adeudo_material` (S/N),
`monto_adeudo`. Por la regla RN-D03, si `asistio` es `N` la calificación
queda en 0.

## Estructuras de datos

- **Diccionario** (`Map`) folio_inscripcion → resultado: un resultado
  por inscripción (HU-D03, `src/resultadosPracticas.js`).
- **Arreglo** de 25 estaciones (`src/estaciones.js`).
- **Diccionario** práctica → lista de inscritos (`src/consultaPracticas.js`).

## Historias implementadas (Sprint 2)

- HU-D03: registrar asistencia y calificación de la práctica.
- HU-D13: URL base de los servicios en un solo lugar.
