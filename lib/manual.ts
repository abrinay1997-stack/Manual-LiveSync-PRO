import type { ManualPart, ManualSection } from '../types';

export const SITE_URL = 'https://manual.livesyncpro.com';

/** Ancla (sin "#") de una sección: su id. */
export const sectionAnchor = (sectionId: string) => sectionId;

/** Ancla (sin "#") de una subsección, prefijada con el id de la sección para que no colisione. */
export const subsectionAnchor = (sectionId: string, index: number) => `${sectionId}-sub-${index + 1}`;

export interface ManualTarget {
  sectionId: string;
  /** Índice (base 0) de la subsección, si el ancla apunta a una. */
  subIndex?: number;
}

/** Interpreta un hash ("#seccion" o "#seccion-sub-N") contra las secciones existentes. */
export function parseAnchor(hash: string, sections: ManualSection[]): ManualTarget | null {
  let raw = hash.replace(/^#/, '');
  try {
    raw = decodeURIComponent(raw);
  } catch {
    /* hash mal codificado: se usa tal cual */
  }
  if (!raw) return null;
  const direct = sections.find(s => s.id === raw);
  if (direct) return { sectionId: direct.id };
  const m = /^(.*)-sub-(\d+)$/.exec(raw);
  if (m) {
    const section = sections.find(s => s.id === m[1]);
    const n = Number(m[2]);
    if (section && n >= 1 && n <= (section.subsections?.length ?? 0)) {
      return { sectionId: section.id, subIndex: n - 1 };
    }
  }
  return null;
}

export const anchorFor = (t: ManualTarget) =>
  t.subIndex === undefined ? sectionAnchor(t.sectionId) : subsectionAnchor(t.sectionId, t.subIndex);

/** "13. BOTÓN CALCULAR" → "BOTÓN CALCULAR"; "5.2 Condiciones" → "Condiciones". */
export const stripNumber = (title: string) => title.replace(/^\d+(\.\d+)*\.?\s+/, '') || title;

/** Minúsculas y sin tildes, conservando la longitud por carácter cuando es posible (para buscar). */
export function fold(s: string): string {
  let out = '';
  for (const ch of s) {
    const base = ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    out += base.length === ch.length ? base : ch.toLowerCase();
  }
  return out;
}

export function findPart(parts: ManualPart[], sectionId: string): ManualPart | undefined {
  return parts.find(p => p.sections.some(s => s.id === sectionId));
}
