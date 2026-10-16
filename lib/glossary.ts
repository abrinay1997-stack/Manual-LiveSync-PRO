import { stripInline } from './markup';

export interface GlossaryEntry {
  /** Término tal como aparece en el glosario, p. ej. "Critical Distance (Dc)". */
  term: string;
  /** Definición en texto plano. */
  definition: string;
}

export interface GlossaryMatcher {
  regex: RegExp;
  lookup: Map<string, GlossaryEntry>;
}

export type GlossaryChunk = string | { text: string; entry: GlossaryEntry };

/** Extrae las entradas "• **Término:** definición" del glosario. */
export function extractGlossary(lines: string[]): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  for (const line of lines) {
    const m = /^\s*•\s*\*\*(.+?)\*\*\s*(.*)$/.exec(line);
    if (!m) continue;
    const term = m[1].replace(/:\s*$/, '').trim();
    const definition = stripInline(m[2].replace(/^:\s*/, '')).trim();
    if (term && definition) entries.push({ term, definition });
  }
  return entries;
}

const norm = (s: string) => s.toLocaleLowerCase('es');

/**
 * Variantes con las que se reconoce un término en el texto:
 *  - el término completo: "RT60 (Reverberation Time)"
 *  - sin el paréntesis final: "RT60"
 *  - el contenido del paréntesis si es un nombre/sigla: "Reverberation Time", "Dc", "CSA"
 *    (se descartan unidades como "(°C)", "(%)", "(m/s)", "(kPa)").
 */
function aliasesFor(term: string): string[] {
  const aliases = [term];
  const m = /^(.*?)\s*\(([^)]*)\)\s*$/.exec(term);
  if (m) {
    const base = m[1].trim();
    const paren = m[2].trim();
    if (base) aliases.push(base);
    if (paren.length >= 2 && /^[A-ZÁÉÍÓÚÑ]/.test(paren)) aliases.push(paren);
  }
  return aliases.filter(a => a.length >= 2);
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

export function buildGlossaryMatcher(entries: GlossaryEntry[]): GlossaryMatcher | null {
  const lookup = new Map<string, GlossaryEntry>();
  for (const entry of entries) {
    for (const alias of aliasesFor(entry.term)) {
      const key = norm(alias);
      if (!lookup.has(key)) lookup.set(key, entry);
    }
  }
  if (lookup.size === 0) return null;
  // Los alias más largos primero para que "Damping Factor" gane a "Damping".
  const alternation = [...lookup.keys()]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|');
  // Sin lookbehind (compatibilidad con Safari antiguo): el grupo 1 captura el
  // carácter previo (o inicio) y el grupo 2 el término.
  const regex = new RegExp(`(^|[^\\p{L}\\p{N}_])(${alternation})(?![\\p{L}\\p{N}_])`, 'giu');
  return { regex, lookup };
}

/**
 * Divide `text` en trozos de texto y términos del glosario.
 * `seen` evita enlazar el mismo término más de una vez (primera mención).
 */
export function splitByGlossary(text: string, matcher: GlossaryMatcher, seen?: Set<GlossaryEntry>): GlossaryChunk[] {
  const chunks: GlossaryChunk[] = [];
  let last = 0;
  matcher.regex.lastIndex = 0;
  for (const m of text.matchAll(matcher.regex)) {
    const entry = matcher.lookup.get(norm(m[2]));
    if (!entry || seen?.has(entry)) continue;
    const start = (m.index ?? 0) + m[1].length;
    if (start > last) chunks.push(text.slice(last, start));
    chunks.push({ text: m[2], entry });
    last = start + m[2].length;
    seen?.add(entry);
  }
  if (last < text.length) chunks.push(text.slice(last));
  return chunks;
}
