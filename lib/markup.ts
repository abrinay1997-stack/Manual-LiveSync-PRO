/**
 * Mini-sintaxis de las líneas del manual (data/part*.ts).
 *
 * Cada elemento de `content: string[]` es una línea. Tipos de línea:
 *   - "TABLE:Col A | Col B"  → encabezado de tabla. Las líneas siguientes que
 *                              contienen "|" son filas, hasta la primera línea
 *                              vacía o sin "|". (También acepta filas separadas
 *                              por "\n" dentro del mismo string.)
 *   - "CODE:..."             → bloque de código/diagrama. Usa "\n" para saltos.
 *   - "• texto"              → viñeta. Cada 2 espacios iniciales = 1 nivel ("  • ").
 *   - "1. texto"             → elemento numerado (admite sangría igual que "•").
 *   - "**Título**"           → línea completa en negrita = subtítulo.
 *   - ""                     → separador vertical.
 *   - cualquier otra         → párrafo.
 *
 * Inline: **negrita**, *cursiva*, `código`. Se pueden anidar (**a *b* c**).
 * Un "\" antes de *, ` o \ lo escapa.
 *
 * Este módulo es puro (sin React) para poder reutilizarlo en el buscador y en
 * scripts/export-manual.mjs.
 */

export type Inline =
  | { type: 'text'; value: string }
  | { type: 'bold'; children: Inline[] }
  | { type: 'italic'; children: Inline[] }
  | { type: 'code'; value: string };

export interface ListItem {
  level: number;
  /** "•" para viñetas o "N." para elementos numerados. */
  marker: string;
  text: string;
}

export type Block =
  | { type: 'heading'; level: 3 | 4; text: string }
  | { type: 'paragraph'; indent: number; text: string }
  | { type: 'list'; items: ListItem[] }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'code'; code: string }
  | { type: 'spacer' };

const ESCAPABLE = '*`\\';

/** Busca el delimitador de cierre a partir de `from`, saltando spans de código. */
function findClosing(src: string, from: number, delim: '**' | '*'): number {
  let j = from;
  while (j < src.length) {
    const ch = src[j];
    if (ch === '\\' && j + 1 < src.length && ESCAPABLE.includes(src[j + 1])) {
      j += 2;
      continue;
    }
    if (ch === '`') {
      const end = src.indexOf('`', j + 1);
      if (end !== -1) {
        j = end + 1;
        continue;
      }
    }
    if (delim === '**') {
      if (src.startsWith('**', j)) return j;
    } else if (ch === '*') {
      if (src.startsWith('**', j)) {
        // Negrita anidada dentro de cursiva: saltar hasta su cierre.
        const end = findClosing(src, j + 2, '**');
        if (end !== -1) {
          j = end + 2;
          continue;
        }
      } else if (!/\s/.test(src[j - 1] ?? ' ')) {
        return j;
      }
    }
    j++;
  }
  return -1;
}

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let buf = '';
  let i = 0;
  const flush = () => {
    if (buf) {
      out.push({ type: 'text', value: buf });
      buf = '';
    }
  };

  while (i < src.length) {
    const ch = src[i];

    if (ch === '\\' && i + 1 < src.length && ESCAPABLE.includes(src[i + 1])) {
      buf += src[i + 1];
      i += 2;
      continue;
    }

    if (ch === '`') {
      const end = src.indexOf('`', i + 1);
      if (end > i + 1) {
        flush();
        out.push({ type: 'code', value: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    } else if (src.startsWith('**', i)) {
      const end = findClosing(src, i + 2, '**');
      if (end > i + 2) {
        flush();
        out.push({ type: 'bold', children: parseInline(src.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    } else if (ch === '*') {
      const next = src[i + 1];
      if (next && !/\s/.test(next)) {
        const end = findClosing(src, i + 1, '*');
        if (end > i + 1) {
          flush();
          out.push({ type: 'italic', children: parseInline(src.slice(i + 1, end)) });
          i = end + 1;
          continue;
        }
      }
    }

    buf += ch;
    i++;
  }
  flush();
  return out;
}

export function inlineToPlain(nodes: Inline[]): string {
  return nodes
    .map(n => (n.type === 'text' || n.type === 'code' ? n.value : inlineToPlain(n.children)))
    .join('');
}

/** Quita la sintaxis inline (**, *, `) y devuelve texto plano. */
export function stripInline(src: string): string {
  return inlineToPlain(parseInline(src));
}

const BULLET_RE = /^( *)•\s*(.*)$/;
const NUMBERED_RE = /^( *)(\d+)\.\s+(.*)$/;
const NUMBERED_HEADING_RE = /^\d+(\.\d+)+\s/;

function isTableRow(line: string): boolean {
  const t = line.trim();
  return t !== '' && t.includes('|') && !t.startsWith('TABLE:') && !t.startsWith('CODE:') && !t.startsWith('•');
}

function splitRow(row: string): string[] {
  let cells = row.split('|').map(c => c.trim());
  // Admite filas estilo Markdown con "|" inicial/final.
  if (cells.length > 1 && cells[0] === '') cells = cells.slice(1);
  if (cells.length > 1 && cells[cells.length - 1] === '') cells = cells.slice(0, -1);
  return cells;
}

/** Línea completa en negrita (una sola corrida **...**). */
function wholeBold(line: string): string | null {
  const t = line.trim();
  if (t.length < 5 || !t.startsWith('**') || !t.endsWith('**')) return null;
  const inner = t.slice(2, -2);
  if (inner.includes('**')) return null;
  return inner;
}

function listItem(line: string): ListItem | null {
  const b = BULLET_RE.exec(line);
  if (b) return { level: Math.floor(b[1].length / 2), marker: '•', text: b[2] };
  const n = NUMBERED_RE.exec(line);
  if (n) return { level: Math.floor(n[1].length / 2), marker: `${n[2]}.`, text: n[3] };
  return null;
}

export function parseBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? '';
    const trimmed = line.trim();

    if (trimmed === '') {
      // Colapsa separadores consecutivos.
      if (blocks.length && blocks[blocks.length - 1].type !== 'spacer') blocks.push({ type: 'spacer' });
      i++;
      continue;
    }

    if (trimmed.startsWith('TABLE:')) {
      const rawRows = trimmed.slice('TABLE:'.length).split('\n').filter(r => r.trim());
      let j = i + 1;
      while (j < lines.length && isTableRow(lines[j])) {
        rawRows.push(...lines[j].split('\n').filter(r => r.trim()));
        j++;
      }
      const [headerRow = '', ...bodyRows] = rawRows;
      const header = splitRow(headerRow);
      const width = Math.max(header.length, ...bodyRows.map(r => splitRow(r).length));
      const pad = (cells: string[]) => [...cells, ...Array(Math.max(0, width - cells.length)).fill('')];
      blocks.push({ type: 'table', header: pad(header), rows: bodyRows.map(r => pad(splitRow(r))) });
      i = j;
      continue;
    }

    if (trimmed.startsWith('CODE:')) {
      blocks.push({ type: 'code', code: trimmed.slice('CODE:'.length).replace(/^\n+/, '') });
      i++;
      continue;
    }

    const item = listItem(line);
    if (item) {
      const items: ListItem[] = [item];
      let j = i + 1;
      while (j < lines.length) {
        const next = listItem(lines[j] ?? '');
        if (!next) break;
        items.push(next);
        j++;
      }
      blocks.push({ type: 'list', items });
      i = j;
      continue;
    }

    const bold = wholeBold(line);
    if (bold !== null) {
      blocks.push({ type: 'heading', level: NUMBERED_HEADING_RE.test(bold) ? 3 : 4, text: bold });
      i++;
      continue;
    }

    const indent = Math.floor((line.length - line.trimStart().length) / 2);
    blocks.push({ type: 'paragraph', indent, text: trimmed });
    i++;
  }

  if (blocks.length && blocks[blocks.length - 1].type === 'spacer') blocks.pop();
  return blocks;
}

/** Convierte líneas del manual a texto plano (sin sintaxis), una línea por bloque/fila. */
export function linesToPlainText(lines: string[]): string {
  const out: string[] = [];
  for (const block of parseBlocks(lines)) {
    switch (block.type) {
      case 'heading':
        out.push(stripInline(block.text));
        break;
      case 'paragraph':
        out.push(stripInline(block.text));
        break;
      case 'list':
        for (const it of block.items) {
          const marker = it.marker === '•' ? '-' : it.marker;
          out.push(`${'  '.repeat(it.level)}${marker} ${stripInline(it.text)}`);
        }
        break;
      case 'table':
        out.push(block.header.map(stripInline).join(' | '));
        for (const row of block.rows) out.push(row.map(stripInline).join(' | '));
        break;
      case 'code':
        out.push(block.code);
        break;
      case 'spacer':
        out.push('');
        break;
    }
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
