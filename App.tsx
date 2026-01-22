import React, { useState, useMemo, useEffect, useRef } from 'react';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import { MANUAL_DATA } from './constants';
import { SearchResult } from './types';
import { part7 } from './data/part7';
import { 
  Search, Menu, X, ArrowUpCircle, ChevronRight, ChevronLeft, 
  Book, CheckCircle2, Copy, Info, List, Monitor, LifeBuoy, MessageSquareDot, ExternalLink, LayoutGrid
} from 'lucide-react';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState('welcome');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('livesync_progress');
    return saved ? JSON.parse(saved) : [];
  });
  const [tooltip, setTooltip] = useState<{ text: string, term: string, x: number, y: number } | null>(null);
  
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const target = scrollContainerRef.current;
      if (!target) return;

      if (target.scrollTop > 400) setShowScrollTop(true);
      else setShowScrollTop(false);

      const winScroll = target.scrollTop;
      const height = target.scrollHeight - target.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll, { passive: true });
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('livesync_progress', JSON.stringify(completedSections));
  }, [completedSections]);

  const allSections = useMemo(() => MANUAL_DATA.flatMap(part => part.sections), []);
  const currentSectionIndex = useMemo(() => allSections.findIndex(s => s.id === activeSectionId), [activeSectionId, allSections]);
  const activeSection = useMemo(() => allSections[currentSectionIndex] || allSections[0], [currentSectionIndex, allSections]);

  const activePart = useMemo(() => {
    return MANUAL_DATA.find(part => part.sections.some(section => section.id === activeSectionId));
  }, [activeSectionId]);

  const glossaryTerms = useMemo(() => {
    const terms: Record<string, string> = {};
    part7.sections[0].content.forEach(line => {
      const match = line.match(/• \*\*(.*?)\*\*:(.*)/);
      if (match) terms[match[1].toLowerCase()] = match[2].trim();
    });
    return terms;
  }, []);

  const handleSectionSelect = (id: string) => {
    setActiveSectionId(id);
    setIsSidebarOpen(false);
    setIsRightSidebarOpen(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    setTooltip(null);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (direction: 'next' | 'prev') => {
    const nextIdx = direction === 'next' ? currentSectionIndex + 1 : currentSectionIndex - 1;
    if (nextIdx >= 0 && nextIdx < allSections.length) {
      handleSectionSelect(allSections[nextIdx].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => { 
    touchStartX.current = e.touches[0].clientX; 
    touchStartY.current = e.touches[0].clientY; 
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
      if (diffX > 0) navigate('next');
      else navigate('prev');
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    MANUAL_DATA.forEach(part => {
      part.sections.forEach(section => {
        if (section.title.toLowerCase().includes(q) || section.content.some(c => c.toLowerCase().includes(q))) {
          results.push({ partTitle: part.title, section, matchType: section.title.toLowerCase().includes(q) ? 'title' : 'content' });
        }
      });
    });
    return results.slice(0, 10);
  }, [searchQuery]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTermClick = (e: React.MouseEvent, term: string) => {
    e.preventDefault();
    const cleanTerm = term.toLowerCase().replace(/[.,]/g, '');
    const definition = glossaryTerms[cleanTerm];
    if (definition) {
      setTooltip({ text: definition, term: term, x: e.clientX, y: e.clientY });
    }
  };

  const renderUiLine = (line: string, idx: number) => {
    if (line.startsWith('TABLE:')) {
      const rows = line.replace('TABLE:', '').split('\n').filter(r => r.trim());
      const data = rows.map(r => r.split('|').map(c => c.trim()));
      return (
        <div key={idx} className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01]">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-white uppercase text-[10px] tracking-widest">
                <tr>{data[0].map((cell, i) => <th key={i} className="px-5 py-4 font-bold border-b border-white/10">{cell}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.slice(1).map((row, ri) => (
                  <tr key={ri} className="hover:bg-white/[0.03] transition-colors">
                    {row.map((cell, ci) => <td key={ci} className="px-5 py-4 text-slate-300">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-white/5">
            {data.slice(1).map((row, ri) => (
              <div key={ri} className="p-5 space-y-3 bg-white/[0.02]">
                {row.map((cell, ci) => (
                  <div key={ci} className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{data[0][ci]}</span>
                    <span className="text-white text-sm font-medium">{cell}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (line.startsWith('CODE:')) {
      const codeText = line.replace('CODE:', '');
      return (
        <div key={idx} className="group relative my-6 font-mono text-[11px] md:text-xs bg-black/60 p-5 rounded-xl border border-cyan-500/30 text-cyan-400 overflow-x-auto">
          <button onClick={() => copyToClipboard(codeText)} className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white md:opacity-0 group-hover:opacity-100 transition-opacity">
            <Copy size={14} />
          </button>
          {codeText}
        </div>
      );
    }
    
    const parts = line.split(' ');
    return (
      <p key={idx} className="my-4 leading-[1.8] text-slate-300 text-base md:text-lg">
        {parts.map((word, i) => {
          const cleanWord = word.replace(/[**.,()]/g, '').toLowerCase();
          const hasDefinition = glossaryTerms[cleanWord];
          const isBold = word.startsWith('**') && word.endsWith('**');
          const text = word.replace(/\*\*/g, '');

          if (hasDefinition) {
            return (
              <button 
                key={i} 
                onClick={(e) => handleTermClick(e, cleanWord)}
                className="inline border-b border-dotted border-cyan-500/60 text-cyan-200/90 hover:text-cyan-400 hover:border-solid transition-all text-left font-inherit p-0 m-0 cursor-help"
              >
                {text}{' '}
              </button>
            );
          }
          return isBold ? <strong key={i} className="text-white font-bold">{text} </strong> : text + ' ';
        })}
      </p>
    );
  };

  return (
    <div 
      className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-slate-400 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden"
    >
      {/* Sidebars Backdrop */}
      {(isSidebarOpen || isRightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[55] md:hidden animate-fade-in" 
          onClick={() => {
            setIsSidebarOpen(false);
            setIsRightSidebarOpen(false);
          }}
        />
      )}

      {/* Glosario Overlay */}
      {tooltip && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-start md:pointer-events-none">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setTooltip(null)} />
          <div 
            className={`
              w-full md:w-80 bg-[#121212] border-t md:border border-white/10 p-6 shadow-2xl animate-slide-up md:animate-fade-in
              rounded-t-[32px] md:rounded-2xl md:fixed md:pointer-events-auto
            `}
            style={window.innerWidth >= 768 ? { left: Math.min(tooltip.x + 20, window.innerWidth - 340), top: tooltip.y + 20 } : {}}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                <Info size={14} /> {tooltip.term}
              </div>
              <button onClick={() => setTooltip(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-500">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm leading-relaxed text-slate-200">{tooltip.text}</p>
          </div>
        </div>
      )}

      {/* Búsqueda Pantalla Completa Móvil */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-[110] bg-[#050505] animate-fade-in flex flex-col p-6">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setIsMobileSearchOpen(false)} className="text-slate-400"><ChevronLeft size={24} /></button>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
              <input 
                autoFocus
                type="text" 
                placeholder="Buscar..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            {filteredResults.map((result, idx) => (
              <button key={idx} onClick={() => handleSectionSelect(result.section.id)} className="w-full text-left p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-cyan-400 text-[10px] font-bold uppercase mb-1">{result.partTitle}</div>
                <div className="text-white font-bold">{result.section.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar Navigation (Left) */}
      <aside className={`fixed inset-y-0 left-0 z-[60] w-80 bg-[#080808] border-r border-white/5 transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6 md:block">
              <Logo size="md" />
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if(window.innerWidth < 768) setIsMobileSearchOpen(true); }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pr-2 custom-scrollbar">
            <Navigation activeId={activeSectionId} onSelect={handleSectionSelect} completedIds={completedSections} />
          </div>
        </div>
      </aside>

      {/* Right Sidebar (Accesos Directos) */}
      <aside className={`fixed inset-y-0 right-0 z-[60] w-72 bg-[#080808] border-l border-white/5 transform transition-transform duration-500 ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Utilidades</span>
            <button onClick={() => setIsRightSidebarOpen(false)} className="text-slate-500 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-600 px-3 mb-2">Accesos Directos</p>
            <a href="https://livesyncpro.com/" className="flex items-center justify-between group w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                  <Monitor size={16} />
                </div>
                <span className="text-sm font-bold text-slate-300">Aplicación</span>
              </div>
              <ExternalLink size={12} className="text-slate-500" />
            </a>
            <a href="https://support.livesyncpro.com/#chat" className="flex items-center justify-between group w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                  <MessageSquareDot size={16} />
                </div>
                <span className="text-sm font-bold text-slate-300">Chat Soporte</span>
              </div>
              <ExternalLink size={12} className="text-slate-500" />
            </a>
            <a href="https://support.livesyncpro.com/#inicio" className="flex items-center justify-between group w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-500/10 text-slate-400 rounded-lg">
                  <LifeBuoy size={16} />
                </div>
                <span className="text-sm font-bold text-slate-300">Base Conocimiento</span>
              </div>
              <ExternalLink size={12} className="text-slate-500" />
            </a>
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5">
             <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-2">LiveSync Cloud</div>
             <p className="text-[10px] text-slate-500 leading-relaxed">Sincronización en tiempo real activa para usar en todos tus dispositivos.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 md:left-80 right-0 h-1 bg-white/5 z-[60]">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-12 py-5 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 shrink-0 z-40">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-white hover:text-cyan-400 transition-colors">
               <Menu size={24} />
             </button>
             <div className="hidden md:flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
               <Book size={14} className="text-cyan-500" />
               <span>Manual</span>
               <ChevronRight size={12} className="text-slate-800" />
               <span className="text-slate-400 truncate max-w-[150px]">{activePart?.title}</span>
             </div>
             <div className="md:hidden">
               <Logo size="sm" />
             </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-3 mr-4 p-1.5 px-3 bg-white/[0.03] border border-white/5 rounded-2xl">
              <a href="https://livesyncpro.com/" className="text-slate-500 hover:text-cyan-400 transition-colors" title="Aplicación"><Monitor size={16} /></a>
              <div className="w-px h-3 bg-white/10" />
              <a href="https://support.livesyncpro.com/#chat" className="text-slate-500 hover:text-cyan-400 transition-colors" title="Chat Soporte"><MessageSquareDot size={16} /></a>
            </div>

            <button 
              onClick={() => {
                const prev = completedSections.includes(activeSectionId);
                setCompletedSections(prev ? completedSections.filter(s => s !== activeSectionId) : [...completedSections, activeSectionId]);
              }}
              className={`p-2.5 rounded-xl transition-all ${completedSections.includes(activeSectionId) ? 'text-green-500 bg-green-500/10' : 'text-slate-600 bg-white/5 hover:text-white'}`}
            >
              <CheckCircle2 size={18} />
            </button>
            
            {/* Shortcut Button for Mobile */}
            <button 
              onClick={() => setIsRightSidebarOpen(true)}
              className="md:hidden p-2.5 rounded-xl text-slate-600 bg-white/5 hover:text-cyan-400 transition-all"
            >
              <LayoutGrid size={20} />
            </button>

            <div className="hidden lg:flex items-center gap-3">
               <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-cyan-500 transition-all duration-700" style={{ width: `${(completedSections.length / allSections.length) * 100}%` }}></div>
               </div>
               <span className="text-[10px] font-mono text-slate-600">{Math.round((completedSections.length / allSections.length) * 100)}%</span>
            </div>
          </div>
        </header>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="p-6 md:p-12 lg:px-24 w-full pb-40">
            <div className="max-w-4xl mx-auto animate-fade-in space-y-12">
              <div className="md:hidden text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em]">
                 {activePart?.id.replace('part-', 'P')} • {activePart?.title}
              </div>
              
              <div className="space-y-6">
                <h1 className="text-xl md:text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                  {activeSection.title}
                </h1>
              </div>

              {activeSection.subsections && activeSection.subsections.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    <List size={14} className="text-cyan-500" /> En esta página
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeSection.subsections.map((sub, i) => (
                      <a key={i} href={`#sub-${i}`} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                        <ChevronRight size={14} className="text-slate-800" /> {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-slate-300">
                {activeSection.content.map((line, idx) => renderUiLine(line, idx))}
                {activeSection.subsections?.map((sub, sidx) => (
                  <div key={sidx} id={`sub-${sidx}`} className="mt-20 space-y-8 border-t border-white/5 pt-20">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-4">
                      <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                      {sub.title}
                    </h3>
                    <div>{sub.content.map((line, lidx) => renderUiLine(line, lidx + 5000))}</div>
                  </div>
                ))}
              </div>

              <div className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSectionIndex > 0 ? (
                  <button onClick={() => navigate('prev')} className="flex items-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                      <ChevronLeft size={24} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Anterior</span>
                      <span className="text-white font-bold block truncate">{allSections[currentSectionIndex - 1].title.split('. ')[1] || 'Atrás'}</span>
                    </div>
                  </button>
                ) : <div />}
                
                {currentSectionIndex < allSections.length - 1 ? (
                  <button onClick={() => navigate('next')} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-right group">
                    <div className="flex-1 overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Siguiente</span>
                      <span className="text-white font-bold block truncate">{allSections[currentSectionIndex + 1].title.split('. ')[1] || 'Continuar'}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-all ml-4">
                      <ChevronRight size={24} />
                    </div>
                  </button>
                ) : <div />}
              </div>
            </div>
          </div>
        </div>

        {showScrollTop && (
          <button 
            onClick={() => scrollContainerRef.current?.scrollTo({top:0, behavior:'smooth'})} 
            className="fixed bottom-8 right-8 w-14 h-14 bg-cyan-500 text-black rounded-2xl flex items-center justify-center z-[50] shadow-2xl hover:scale-110 active:scale-90 transition-all md:bottom-12 md:right-12"
          >
            <ArrowUpCircle size={24} />
          </button>
        )}
      </main>
    </div>
  );
};

export default App;