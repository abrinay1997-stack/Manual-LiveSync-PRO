# Manual de LiveSync Pro

Manual de usuario de [LiveSync Pro](https://livesyncpro.com), la plataforma web para diseñar,
predecir y alinear sistemas de audio en vivo. Publicado en
**https://manual.livesyncpro.com**.

SPA estática en React 19 + TypeScript + Vite: navegación por partes y secciones, búsqueda
(sin tildes, incluye subsecciones), enlaces profundos (`#seccion`, `#seccion-sub-N`), glosario
enlazado automáticamente y progreso de lectura guardado en el navegador. No tiene backend ni
necesita variables de entorno.

## Desarrollo

Requisitos: Node 22.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # typecheck + build de producción en dist/
npm run preview  # sirve dist/
```

## Contenido

El texto vive en `data/part*.ts` (un objeto `ManualPart` por archivo; el orden lo define
`constants.tsx`). Cada línea de `content` usa una mini-sintaxis: `TABLE:`, `CODE:`, viñetas
`•`, listas `1.`, subtítulos `**...**` e inline `**negrita**`, `*cursiva*` y `` `código` ``.
La referencia completa y las reglas de redacción están en [`CLAUDE.md`](./CLAUDE.md).

Tras editar el contenido, regenera la exportación para el asistente de IA:

```bash
npm run export:manual             # escribe knowledge/manual.jsonl
npm run export:manual -- --check  # verifica que esté al día
```

`knowledge/manual.jsonl` tiene un registro por sección/subsección (`id`, `part`, `title`,
`text` en plano y `url` con ancla) y se versiona junto con el contenido.

## Despliegue

- **Netlify** (actual): `netlify.toml` — build `npm run build`, publica `dist/`.
- **Cloudflare Workers** (assets estáticos): `wrangler.jsonc` —
  `npm run build && npx wrangler deploy`.

Proyecto relacionado: la app principal está en
[`abrinay1997-stack/LiveSync-Pro`](https://github.com/abrinay1997-stack/LiveSync-Pro).
