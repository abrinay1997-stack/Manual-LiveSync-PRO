import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { ManualSection } from '../types';
import { Block, Inline, parseBlocks, parseInline } from '../lib/markup';
import { GlossaryEntry, GlossaryMatcher, splitByGlossary } from '../lib/glossary';
import { subsectionAnchor } from '../lib/manual';

export type TermClickHandler = (e: React.MouseEvent<HTMLButtonElement>, entry: GlossaryEntry) => void;

interface RenderCtx {
  glossary: GlossaryMatcher | null;
  /** Términos ya enlazados en esta sección (solo se enlaza la primera mención). */
  seen: Set<GlossaryEntry>;
  onTermClick: TermClickHandler;
}

const TEXT_CLASS = 'leading-[1.8] text-slate-300 text-base md:text-lg';

function renderText(text: string, ctx: RenderCtx, key: string, link: boolean): React.ReactNode {
  if (!link || !ctx.glossary) return text;
  const chunks = splitByGlossary(text, ctx.glossary, ctx.seen);
  if (chunks.length === 1 && typeof chunks[0] === 'string') return text;
  return (
    <React.Fragment key={key}>
      {chunks.map((chunk, i) =>
        typeof chunk === 'string' ? (
          chunk
        ) : (
          <button
            key={i}
            type="button"
            aria-haspopup="dialog"
            onClick={e => ctx.onTermClick(e, chunk.entry)}
            className="inline p-0 m-0 bg-transparent text-left border-b border-dotted border-cyan-500/60 text-cyan-200/90 hover:text-cyan-400 hover:border-solid transition-colors cursor-help"
          >
            {chunk.text}
          </button>
        )
      )}
    </React.Fragment>
  );
}

function renderInline(nodes: Inline[], ctx: RenderCtx, key: string, link = true): React.ReactNode[] {
  return nodes.map((node, i) => {
    const k = `${key}.${i}`;
    switch (node.type) {
      case 'text':
        return <React.Fragment key={k}>{renderText(node.value, ctx, k, link)}</React.Fragment>;
      case 'bold':
        return (
          <strong key={k} className="text-white font-bold">
            {renderInline(node.children, ctx, k, link)}
          </strong>
        );
      case 'italic':
        return (
          <em key={k} className="italic text-slate-200">
            {renderInline(node.children, ctx, k, link)}
          </em>
        );
      case 'code':
        return (
          <code key={k} className="font-mono text-[0.85em] px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-cyan-300 break-words">
            {node.value}
          </code>
        );
    }
  });
}

const inline = (text: string, ctx: RenderCtx, key: string, link = true) => renderInline(parseInline(text), ctx, key, link);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* portapapeles no disponible (http, permisos): se ignora */
    }
  };
  return (
    <div className="group relative my-6">
      <pre
        data-hscroll
        className="font-mono text-[11px] md:text-xs leading-relaxed whitespace-pre overflow-x-auto overscroll-x-contain bg-black/60 p-5 pr-14 rounded-xl border border-cyan-500/30 text-cyan-400"
      >
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copiado' : 'Copiar al portapapeles'}
        title={copied ? 'Copiado' : 'Copiar'}
        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white md:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
      >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>
    </div>
  );
};

function renderBlock(block: Block, ctx: RenderCtx, key: string): React.ReactNode {
  switch (block.type) {
    case 'spacer':
      return <div key={key} className="h-2" aria-hidden="true" />;

    case 'heading':
      return block.level === 3 ? (
        <h3 key={key} className="mt-10 mb-4 text-lg md:text-xl font-bold text-white tracking-tight">
          {inline(block.text, ctx, key, false)}
        </h3>
      ) : (
        <h4 key={key} className="mt-8 mb-3 text-base md:text-lg font-bold text-white">
          {inline(block.text, ctx, key, false)}
        </h4>
      );

    case 'paragraph':
      return (
        <p key={key} className={`my-4 ${TEXT_CLASS}`} style={block.indent ? { paddingLeft: `${block.indent * 1.5}rem` } : undefined}>
          {inline(block.text, ctx, key)}
        </p>
      );

    case 'list':
      return (
        <ul key={key} className="my-4 space-y-2" role="list">
          {block.items.map((item, i) => (
            <li
              key={i}
              className={`flex gap-3 ${TEXT_CLASS}`}
              style={item.level ? { paddingLeft: `${item.level * 1.5}rem` } : undefined}
            >
              <span
                aria-hidden="true"
                className={`shrink-0 select-none ${item.marker === '•' ? (item.level ? 'text-slate-600' : 'text-cyan-500/80') : 'text-cyan-500/80 font-semibold tabular-nums'}`}
              >
                {item.marker === '•' && item.level ? '◦' : item.marker}
              </span>
              <span className="min-w-0 flex-1">{inline(item.text, ctx, `${key}.${i}`)}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div key={key} className="my-8 rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden">
          <div data-hscroll className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[34rem] text-sm text-left border-collapse">
              <thead className="bg-white/5 text-white uppercase text-[10px] tracking-widest">
                <tr>
                  {block.header.map((cell, i) => (
                    <th key={i} scope="col" className="px-5 py-4 font-bold border-b border-white/10 whitespace-nowrap">
                      {inline(cell, ctx, `${key}.h${i}`, false)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-white/[0.03] transition-colors">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-5 py-4 align-top ${ci === 0 ? 'text-white font-medium' : 'text-slate-300'}`}>
                        {inline(cell, ctx, `${key}.${ri}.${ci}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'code':
      return <CodeBlock key={key} code={block.code} />;
  }
}

const renderLines = (lines: string[], ctx: RenderCtx, key: string) =>
  parseBlocks(lines).map((block, i) => renderBlock(block, ctx, `${key}${i}`));

interface SectionBodyProps {
  section: ManualSection;
  /** null desactiva los enlaces al glosario (p. ej. en el propio glosario). */
  glossary: GlossaryMatcher | null;
  onTermClick: TermClickHandler;
}

/**
 * Renderiza el contenido de una sección y sus subsecciones.
 * El conjunto `seen` se crea en cada render para que el enlazado de términos sea
 * determinista (solo la primera mención de cada término en la sección).
 */
const SectionBody: React.FC<SectionBodyProps> = ({ section, glossary, onTermClick }) => {
  const ctx: RenderCtx = { glossary, seen: new Set(), onTermClick };
  return (
    <div className="text-slate-300">
      {renderLines(section.content, ctx, 'c')}
      {section.subsections?.map((sub, i) => (
        <section
          key={i}
          id={subsectionAnchor(section.id, i)}
          className="mt-20 space-y-8 border-t border-white/5 pt-20 scroll-mt-4"
        >
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-4">
            <span className="w-1.5 h-6 bg-cyan-500 rounded-full shrink-0" aria-hidden="true" />
            {sub.title}
          </h2>
          <div>{renderLines(sub.content, ctx, `s${i}.`)}</div>
        </section>
      ))}
    </div>
  );
};

export default SectionBody;
