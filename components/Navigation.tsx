
import React from 'react';
import { MANUAL_DATA } from '../constants';
import { ChevronRight, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeId, onSelect }) => {
  return (
    <nav className="space-y-6">
      {MANUAL_DATA.map((part) => (
        <div key={part.id} className="space-y-2">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#666] px-4 font-bold">
            {part.title}
          </h4>
          <div className="space-y-1">
            {part.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSelect(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                  activeId === section.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={14} className={activeId === section.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} />
                  <span>{section.title.split('. ')[1] || section.title}</span>
                </div>
                {activeId === section.id && (
                  <ChevronRight size={14} className="animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
