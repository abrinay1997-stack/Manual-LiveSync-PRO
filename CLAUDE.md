# CLAUDE.md — Manual de LiveSync Pro (contexto para agentes)

> Léelo al iniciar cada sesión. Si cambias estructura, comandos, despliegue o reglas,
> **actualiza este archivo en el mismo commit**.

## 1. Qué es este repo

Manual de usuario de **LiveSync Pro** (https://livesyncpro.com), servido en
**https://manual.livesyncpro.com**. Es una SPA estática (sin backend, sin cuentas, sin
variables de entorno ni secretos) que documenta cómo usar la aplicación: acceso y planes,
Project Hub y equipos, configuración del sistema, reportes, exportación, glosario y fórmulas.

Forma parte de un ecosistema de 3 repos en GitHub `abrinay1997-stack/*`:

| Repo | Rol |
|---|---|
| `LiveSync-Pro` | App principal (motor físico, UI, cuentas, pagos). **Contiene el CLAUDE.md maestro** con la misión, la arquitectura, las reglas de seguridad y el plan de migración a Cloudflare. Léelo para el contexto global. |
| `Manual-LiveSync-PRO` (este) | Manual de usuario + exportación `knowledge/manual.jsonl` para el asistente de IA. |
| `LiveSync-PRO-Dataset-Explorer` | Base de conocimiento científico (conceptos, normas, fórmulas). |

Visión: unificar app + manual + conocimiento + IA en una sola plataforma en Cloudflare. Este
repo aporta el contenido del manual a esa plataforma vía `knowledge/manual.jsonl` (RAG).

## 2. Stack y comandos

- React 19 + TypeScript 5 + Vite 5, `lucide-react` para iconos.
- Tailwind 3.4 **compilado** en el build (`tailwind.config.js`, `postcss.config.js`, `index.css`).
  Las clases deben aparecer completas en el código (nada de `text-${color}`). Estilos globales y
  animaciones en el `<style>` de `index.html`. Sin CDN de terceros en runtime.
- Node 22 (igual que Netlify).

```bash
npm ci                          # dependencias (package-lock.json versionado)
npm run dev                     # servidor local en http://localhost:3000
npm run build                   # tsc && vite build → dist/  (debe pasar antes de cada commit)
npm run preview                 # sirve dist/
npm run export:manual           # regenera knowledge/manual.jsonl (usa tsx)
npm run export:manual -- --check  # falla si knowledge/manual.jsonl está desactualizado
npx wrangler deploy             # despliegue a Cloudflare (ver §6)
```

No hay tests automatizados; `npm run build` (incluye `tsc` estricto) y
`npm run export:manual -- --check` son la verificación mínima.

## 3. Estructura

```
App.tsx                 Shell: barra lateral, búsqueda, cabecera, deep links, progreso, swipe
components/
  Navigation.tsx        Árbol Parte → Sección (usa part.label y stripNumber)
  SectionBody.tsx       Renderiza bloques (párrafos, listas, tablas, código) + enlaces al glosario
  SearchResults.tsx     Resultados de búsqueda (escritorio compacto y overlay móvil)
  Logo.tsx
lib/                    Lógica pura, sin React (reutilizable desde scripts/)
  markup.ts             Parser de la mini-sintaxis → bloques / texto plano
  manual.ts             Anclas (#seccion, #seccion-sub-N), parseAnchor, stripNumber, fold
  search.ts             Índice y búsqueda (secciones y subsecciones, sin tildes)
  glossary.ts           Extrae el glosario y enlaza términos en el texto
  progress.ts           Progreso de lectura en localStorage (tolerante a errores)
data/part*.ts           CONTENIDO del manual (un ManualPart por archivo)
constants.tsx           MANUAL_DATA: orden de las partes
types.ts                ManualPart / ManualSection / ManualSubsection
scripts/export-manual.mjs  Exportador a knowledge/manual.jsonl
knowledge/manual.jsonl  Generado; se versiona
public/                 logo-livesyncpro.png, favicon.png, apple-touch-icon.png (Vite los copia a dist/)
```

Los nombres `part1, part2, part5, part6, part7` son históricos: el orden real lo dan
`constants.tsx` y los campos `number`/`label` de cada parte.

## 4. Modelo de contenido

```ts
ManualPart       { id, number, label /* "PARTE 1" | "ANEXO" */, title, sections }
ManualSection    { id, title, icon?, content: string[], subsections?: ManualSubsection[] }
ManualSubsection { title, content: string[] }
```

- **`section.id` es estable**: es el ancla de la URL (`#id`), la clave del progreso guardado en
  `localStorage` y el `id` del registro exportado. No lo renombres sin necesidad (los enlaces
  antiguos dejarían de funcionar; un hash inválido simplemente se limpia).
- Las subsecciones no tienen id propio: su ancla es `<sectionId>-sub-<n>` (n desde 1, por
  posición). Insertar una subsección en medio cambia las anclas de las siguientes: añade al
  final cuando sea posible.
- Numeración continua en los títulos: secciones `"N. TÍTULO"`, subsecciones y subtítulos
  `"N.M Título"`. Si insertas o eliminas una sección, renumera las siguientes (sin huecos).
- Glosario: la primera sección de `data/part7.ts` define términos con líneas
  `"• **Término (Alias):** definición"`. Se enlazan automáticamente (primera mención por
  sección) en todo el manual; los alias salen del término y de su paréntesis.

### Mini-sintaxis de cada línea de `content` (implementada en `lib/markup.ts`)

| Línea | Resultado |
|---|---|
| `"TABLE:Col A \| Col B"` | Encabezado de tabla; las líneas siguientes con `\|` son filas, hasta una línea vacía o sin `\|`. |
| `"CODE:..."` | Bloque de código/diagrama monoespaciado; `\n` para saltos de línea. |
| `"• texto"` | Viñeta; cada 2 espacios iniciales = 1 nivel (`"  • sub-viñeta"`). |
| `"1. texto"` | Elemento numerado (admite sangría igual que `•`). |
| `"**Subtítulo**"` | Línea entera en negrita = subtítulo (h3 si empieza por `N.M`, si no h4). |
| `""` | Separador vertical. |
| cualquier otra | Párrafo. |

Inline: `**negrita**`, `*cursiva*`, `` `código` `` (anidables: `**a *b* c**`). `\` escapa
`*`, `` ` `` y `\`. El renderer no interpreta HTML ni enlaces Markdown.

## 5. Reglas

1. **El manual debe coincidir con la app real**: comportamiento, nombres de botones, límites y
   precios. Antes de documentar algo, verifícalo en el código de `LiveSync-Pro`
   (p. ej. `components/LandingPage.tsx`, `App.tsx`, `components/ProjectHub.tsx`, `worker/src/routes/`).
   Planes vigentes (Stripe): **Core $97/año**, **Partner Estándar $199/año**,
   **Corporativo PRO $499/año** (equipos de hasta 10 miembros, incluido el Owner).
   Inicio de sesión: solo Google. No menciones proveedores internos (p. ej. Supabase): usa
   "sincronización en la nube".
2. **Idioma**: contenido y UI en **español**; código e identificadores en inglés.
3. **Atribución**: cita la norma, paper o autor de cada fórmula o criterio (ISO 9613-1, Sabine,
   Eyring, Olson, Heil/WST…). Las marcas y modelos de terceros (L-Acoustics, d&b, DiGiCo, Lake,
   Dante…) pertenecen a sus dueños; no copies texto de manuales de fabricantes sin atribución
   o permiso.
4. **La verdad física primero** (regla del ecosistema): no inventes cifras; si un valor es una
   estimación, dilo y declara sus límites.
5. Sin datos personales, secretos ni tokens en el repo (`.env*` está en `.gitignore`; este
   proyecto no necesita ninguno).
6. Tras cambiar `data/`, ejecuta `npm run export:manual` y versiona `knowledge/manual.jsonl`
   en el mismo commit.
7. `npm run build` debe pasar antes de cada commit. Commits pequeños; push frecuente.

## 6. Despliegue

- **Netlify (producción actual)**: `netlify.toml` → `npm run build`, publica `dist/`,
  `NODE_VERSION = "22"`, redirección SPA `/* → /index.html`.
- **Cloudflare Workers (destino)**: `wrangler.jsonc` sirve `dist/` como assets estáticos (sin
  código de Worker) con `not_found_handling: "single-page-application"`.
  `npm ci && npm run build && npx wrangler deploy` (requiere `CLOUDFLARE_API_TOKEN` y
  `CLOUDFLARE_ACCOUNT_ID`). En el entorno cloud de agentes `api.cloudflare.com` está
  bloqueado: despliega con GitHub Actions o con el conector de Cloudflare.
- **Plataforma unificada (destino final): `livesyncpro.com/manual/`.** La app principal compila
  este repo con `SITE_URL=https://livesyncpro.com/manual/ vite build --outDir <app>/dist/manual`
  (`LiveSync-Pro/scripts/build-platform.mjs`) y lo sirve desde su mismo Worker. Por eso
  `vite.config.ts` usa `base: './'`: todo recurso referenciado desde código debe ser **relativo**
  (`favicon.svg`, no `/favicon.svg`; Vite reescribe el `index.html`). `__SITE_URL__` en
  `index.html` (canonical, og:url) se sustituye en el build; por defecto el subdominio actual.
  El CI de la app clona este repo (público) en cada despliegue. Tras el corte de DNS,
  `manual.livesyncpro.com/*` debe redirigir a `livesyncpro.com/manual/` (el hash se conserva).
- Las anclas usan el hash (`#id`), así que los enlaces profundos funcionan en todos los destinos
  sin reglas de servidor. Las citas del asistente de IA enlazan a `/manual/#<id>`.
  Sourcemaps desactivados en producción (`vite.config.ts`).

## 7. Pendientes conocidos

- Logo local desde el 2026-10-19 (`public/logo-livesyncpro.png`, 256 px, generado del original del
  dueño; también `favicon.png` y `apple-touch-icon.png`). Ya no hay CDN de terceros en runtime.
- `npm audit`: aviso moderado de `esbuild` (solo afecta al servidor de desarrollo); se resuelve
  al subir a Vite 6+.
- Revisar con la app el resto de secciones (configuración, reportes) tras las correcciones de
  física del motor (ver auditoría en `LiveSync-Pro/docs/auditorias/`).
- Integración en la plataforma unificada: hecha en el build de la app (`/manual/`); falta el
  corte de DNS y la redirección del subdominio.
