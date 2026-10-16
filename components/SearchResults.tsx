import React from 'react';
import { CornerDownRight, SearchX } from 'lucide-react';
import type { SearchResult } from '../lib/search';

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  /** Variante compacta para la barra lateral de escritorio. */
  compact?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onSelect, compact = false }) => {
  if (query.trim().length < 2) {
    return <p className="px-2 py-6 text-xs text-slate-600">Escribe al menos 2 caracteres para buscar.</p>;
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 px-2 py-10 text-center text-slate-600">
        <SearchX size={22} />
        <p className="text-xs">Sin resultados para «{query.trim()}».</p>
      </div>
    );
  }

  return (
    <div className={compact ? 'space-y-2 pb-12' : 'space-y-4'}>
      <p className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-600" aria-live="polite">
        {results.length} resultado{results.length === 1 ? '' : 's'}
      </p>
      <ul className={compact ? 'space-y-2' : 'space-y-3'} role="list">
        {results.map((r, idx) => (
          <li key={`${r.section.id}-${r.subIndex ?? 's'}-${idx}`}>
            <button
              type="button"
              onClick={() => onSelect(r)}
              className={`w-full text-left rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-colors ${compact ? 'p-3' : 'p-4'}`}
            >
              <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-1 truncate">
                {r.partLabel} · {r.partTitle}
              </div>
              {r.subIndex !== undefined && (
                <div className="text-slate-500 text-[11px] truncate">{r.section.title}</div>
              )}
              <div className={`text-white font-bold flex items-start gap-1.5 ${compact ? 'text-xs' : 'text-sm'}`}>
                {r.subIndex !== undefined && <CornerDownRight size={12} className="mt-0.5 shrink-0 text-slate-600" />}
                <span>{r.title}</span>
              </div>
              {r.snippet && (
                <p className={`mt-1.5 text-slate-500 leading-relaxed ${compact ? 'text-[11px] line-clamp-2' : 'text-xs line-clamp-3'}`}>
                  {r.snippet.before}
                  {r.snippet.match && <mark className="bg-cyan-500/20 text-cyan-200 rounded px-0.5">{r.snippet.match}</mark>}
                  {r.snippet.after}
                </p>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
