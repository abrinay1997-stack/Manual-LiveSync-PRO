import React, { useState, useEffect } from 'react';
import { MANUAL_DATA } from '../constants';
import { ChevronDown, Layers, CheckCircle2 } from 'lucide-react';

interface NavigationProps {
  activeId: string;
  onSelect: (id: string) => void;
  completedIds: string[];
}

const Navigation: React.FC<NavigationProps> = ({ activeId, onSelect, completedIds }) => {
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const activePart = MANUAL_DATA.find(part => 
      part.sections.some(section => section.id === activeId)
    );
    if (activePart) {
      setExpandedParts(prev => ({
        ...prev,
        [activePart.id]: true
      }));
    }
  }, [activeId]);

  const togglePart = (partId: string) => {
    setExpandedParts(prev => ({
      ...prev,
      [partId]: !prev[partId]
    }));
  };

  return (
    <nav className="space-y-4 pb-12">
      {MANUAL_DATA.map((part) => {
        const isExpanded = expandedParts[part.id];
        const hasActiveSection = part.sections.some(s => s.id === activeId);
        const completedInSectionCount = part.sections.filter(s => completedIds.includes(s.id)).length;
        const totalSectionCount = part.sections.length;

        return (
          <div key={part.id} className="group/part">
            <button
              onClick={() => togglePart(part.id)}
              className={`w-full flex items-center justify-between py-3 px-4 rounded-2xl transition-all duration-300 ${
                hasActiveSection ? 'bg-white/[0.03] text-white' : 'hover:bg-white/[0.02] text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all duration-300 relative ${
                  hasActiveSection ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/5 text-slate-600 group-hover/part:text-slate-400'
                }`}>
                  <Layers size={14} strokeWidth={3} />
                  {completedInSectionCount === totalSectionCount && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#080808]"></div>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className={`text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${
                    hasActiveSection ? 'text-cyan-500' : 'text-slate-700'
                  }`}>
                    {part.id.replace('part-', 'PARTE ')}
                  </span>
                  <h4 className={`text-[11px] uppercase tracking-wider font-bold text-left transition-colors truncate max-w-[160px] ${
                    hasActiveSection ? 'text-white' : 'text-slate-500 group-hover/part:text-slate-300'
                  }`}>
                    {part.title}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-700">{completedInSectionCount}/{totalSectionCount}</span>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <ChevronDown size={14} className={hasActiveSection ? 'text-cyan-500' : 'text-slate-700'} />
                </div>
              </div>
            </button>

            <div className={`mt-2 ml-4 space-y-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
              <div className="pl-6 border-l-2 border-white/5 py-1 space-y-1">
                {part.sections.map((section) => {
                  const isActive = activeId === section.id;
                  const isCompleted = completedIds.includes(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => onSelect(section.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group/item relative ${
                        isActive
                          ? 'text-white font-bold bg-white/[0.05]'
                          : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 w-1 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
                      )}
                      <span className="truncate mr-2">
                        {section.title.split('. ')[1] || section.title}
                      </span>
                      {isCompleted && <CheckCircle2 size={12} className="text-green-500/60 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;