#!/usr/bin/env node
/**
 * Exporta el manual a knowledge/manual.jsonl: un registro JSON por sección y
 * por subsección, con el texto en plano (sin la mini-sintaxis de data/part*.ts).
 * Alimenta la base de conocimiento del asistente de IA de LiveSync Pro.
 *
 * Uso (importa los datos TypeScript, por eso se ejecuta con tsx):
 *   npm run export:manual            → escribe knowledge/manual.jsonl
 *   npm run export:manual -- --check → falla si el archivo no está al día
 *
 * La salida es determinista (sin fechas) para que el diff en git sea limpio.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { MANUAL_DATA } from '../constants.tsx';
import { SITE_URL, sectionAnchor, subsectionAnchor } from '../lib/manual.ts';
import { linesToPlainText } from '../lib/markup.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'knowledge/manual.jsonl');

function buildRecords() {
  const records = [];
  const seen = new Set();
  const push = record => {
    if (seen.has(record.id)) throw new Error(`Id duplicado en el manual: ${record.id}`);
    seen.add(record.id);
    records.push(record);
  };

  for (const part of MANUAL_DATA) {
    const partName = `${part.label} — ${part.title}`;
    for (const section of part.sections) {
      const id = sectionAnchor(section.id);
      push({
        id,
        type: 'section',
        part: partName,
        part_id: part.id,
        section_id: section.id,
        title: section.title,
        text: linesToPlainText(section.content),
        url: `${SITE_URL}/#${id}`,
        lang: 'es'
      });
      section.subsections?.forEach((sub, i) => {
        const subId = subsectionAnchor(section.id, i);
        push({
          id: subId,
          type: 'subsection',
          part: partName,
          part_id: part.id,
          section_id: section.id,
          section_title: section.title,
          title: sub.title,
          text: linesToPlainText(sub.content),
          url: `${SITE_URL}/#${subId}`,
          lang: 'es'
        });
      });
    }
  }
  return records;
}

async function main() {
  const records = buildRecords();
  const empty = records.filter(r => !r.text.trim());
  if (empty.length) throw new Error(`Registros sin texto: ${empty.map(r => r.id).join(', ')}`);

  const output = records.map(r => JSON.stringify(r)).join('\n') + '\n';

  if (process.argv.includes('--check')) {
    const current = await readFile(OUT, 'utf8').catch(() => '');
    if (current !== output) {
      console.error('knowledge/manual.jsonl no está al día. Ejecuta: npm run export:manual');
      process.exit(1);
    }
    console.log(`knowledge/manual.jsonl al día (${records.length} registros).`);
    return;
  }

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, output, 'utf8');
  console.log(`Escrito knowledge/manual.jsonl: ${records.length} registros.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
