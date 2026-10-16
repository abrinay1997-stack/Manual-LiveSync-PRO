import type { ManualPart, ManualSection } from '../types';
import { fold } from './manual';
import { linesToPlainText } from './markup';

export interface SearchSnippet {
  before: string;
  match: string;
  after: string;
}

export interface SearchResult {
  partLabel: string;
  partTitle: string;
  section: ManualSection;
  /** Índice de la subsección encontrada (si el resultado es una subsección). */
  subIndex?: number;
  /** Título mostrado: el de la subsección o el de la sección. */
  title: string;
  matchType: 'title' | 'content';
  snippet: SearchSnippet | null;
}

interface IndexEntry {
  part: ManualPart;
  section: ManualSection;
  subIndex?: number;
  title: string;
  foldedTitle: string;
  lines: string[];
  foldedLines: string[];
}

export function buildSearchIndex(parts: ManualPart[]): IndexEntry[] {
  const entries: IndexEntry[] = [];
  const add = (part: ManualPart, section: ManualSection, title: string, content: string[], subIndex?: number) => {
    const lines = linesToPlainText(content)
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    entries.push({ part, section, subIndex, title, foldedTitle: fold(title), lines, foldedLines: lines.map(fold) });
  };
  for (const part of parts) {
    for (const section of part.sections) {
      add(part, section, section.title, section.content);
      section.subsections?.forEach((sub, i) => add(part, section, sub.title, sub.content, i));
    }
  }
  return entries;
}

function makeSnippet(line: string, folded: string, needle: string): SearchSnippet {
  const idx = folded.indexOf(needle);
  // Si el plegado cambió la longitud, los índices no son fiables: mostrar el inicio.
  if (idx === -1 || folded.length !== line.length) {
    return { before: '', match: '', after: line.length > 120 ? `${line.slice(0, 120)}…` : line };
  }
  const start = Math.max(0, idx - 40);
  const end = Math.min(line.length, idx + needle.length + 80);
  return {
    before: (start > 0 ? '…' : '') + line.slice(start, idx),
    match: line.slice(idx, idx + needle.length),
    after: line.slice(idx + needle.length, end) + (end < line.length ? '…' : '')
  };
}

/**
 * Busca en títulos y contenido de secciones y subsecciones.
 * Ignora mayúsculas y tildes; con varias palabras exige que aparezcan todas.
 */
export function searchManual(index: IndexEntry[], query: string, limit = 20): SearchResult[] {
  const q = fold(query.trim().replace(/\s+/g, ' '));
  if (q.length < 2) return [];
  const tokens = q.split(' ').filter(Boolean);

  const titleHits: SearchResult[] = [];
  const contentHits: SearchResult[] = [];

  for (const e of index) {
    const base = {
      partLabel: e.part.label,
      partTitle: e.part.title,
      section: e.section,
      subIndex: e.subIndex,
      title: e.title
    };
    if (tokens.every(t => e.foldedTitle.includes(t))) {
      titleHits.push({ ...base, matchType: 'title', snippet: null });
      continue;
    }
    const haystack = `${e.foldedTitle}\n${e.foldedLines.join('\n')}`;
    if (!tokens.every(t => haystack.includes(t))) continue;
    const needle = e.foldedLines.some(l => l.includes(q)) ? q : tokens[0];
    const li = e.foldedLines.findIndex(l => l.includes(needle));
    contentHits.push({
      ...base,
      matchType: 'content',
      snippet: li === -1 ? null : makeSnippet(e.lines[li], e.foldedLines[li], needle)
    });
  }

  return [...titleHits, ...contentHits].slice(0, limit);
}
