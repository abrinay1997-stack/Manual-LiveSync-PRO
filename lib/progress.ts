/**
 * Progreso de lectura (secciones marcadas como completadas) en localStorage.
 *
 * localStorage puede no existir o lanzar (modo privado, cookies bloqueadas,
 * cuota llena) y el valor guardado puede estar corrupto o contener ids de
 * secciones que ya no existen: todo eso se tolera sin romper la app.
 */
const STORAGE_KEY = 'livesync_progress';

export function loadProgress(validIds: ReadonlySet<string>): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const ids = parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id));
    return [...new Set(ids)];
  } catch {
    return [];
  }
}

export function saveProgress(ids: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* almacenamiento no disponible: el progreso solo vive en esta sesión */
  }
}
