import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import SearchResults from './components/SearchResults';
import SectionBody, { TermClickHandler } from './components/SectionBody';
import { MANUAL_DATA } from './constants';
import { part7 } from './data/part7';
import { buildGlossaryMatcher, extractGlossary } from './lib/glossary';
import { type ManualTarget, anchorFor, findPart, parseAnchor, stripNumber, subsectionAnchor } from './lib/manual';
import { loadProgress, saveProgress } from './lib/progress';
import { type SearchResult, buildSearchIndex, searchManual } from './lib/search';
import {
  Search, Menu, X, ArrowUpCircle, ChevronRight, ChevronLeft,
  Book, CheckCircle2, Info, List, Monitor, LifeBuoy, MessageSquareDot, ExternalLink, LayoutGrid
} from 'lucide-react';

const GLOSSARY_SECTION_ID = part7.sections[0].id;
const GLOSSARY = buildGlossaryMatcher(extractGlossary(part7.sections[0].content));
const SEARCH_INDEX = buildSearchIndex(MANUAL_DATA);
const ALL_SECTIONS = MANUAL_DATA.flatMap(part => part.sections);
const SECTION_IDS: ReadonlySet<string> = new Set(ALL_SECTIONS.map(s => s.id));
const DEFAULT_SECTION_ID = ALL_SECTIONS[0].id;
const SITE_TITLE = 'Manual LiveSync Pro';

/** Destino inicial según el hash de la URL (#seccion o #seccion-sub-N). */
const INITIAL_TARGET: ManualTarget | null = parseAnchor(window.location.hash, ALL_SECTIONS);
if (!INITIAL_TARGET && window.location.hash) {
  // Enlace roto o antiguo: se limpia el hash para no arrastrarlo.
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

/**
 * ¿El gesto empezó dentro de un elemento con scroll horizontal (tabla, bloque
 * de código…)? En ese caso el deslizamiento es para desplazar ese elemento,
 * no para cambiar de sección.
 */
function startsInHorizontalScroller(target: EventTarget | null, boundary: Element | null): boolean {
  let el = target instanceof Element ? target : null;
  while (el && el !== boundary) {
    if (el.scrollWidth > el.clientWidth + 1) {
      const overflowX = window.getComputedStyle(el).overflowX;
      if (overflowX === 'auto' || overflowX === 'scroll') return true;
    }
    el = el.parentElement;
  }
  return false;
}

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState(INITIAL_TARGET?.sectionId ?? DEFAULT_SECTION_ID);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>(() => loadProgress(SECTION_IDS));
  const [tooltip, setTooltip] = useState<{ text: string, term: string, x: number, y: number } | null>(null);
  
  /** Petición de desplazamiento tras cambiar de sección: ancla de subsección o null = inicio. */
  const [scrollRequest, setScrollRequest] = useState<{ anchor: string | null; seq: number }>(() =>
    INITIAL_TARGET?.subIndex !== undefined
      ? { anchor: subsectionAnchor(INITIAL_TARGET.sectionId, INITIAL_TARGET.subIndex), seq: 1 }
      : { anchor: null, seq: 0 }
  );

  /** Inicio del gesto táctil; null si no hay gesto o si no debe cambiar de sección. */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
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
    saveProgress(completedSections);
  }, [completedSections]);

  const allSections = ALL_SECTIONS;
  const currentSectionIndex = useMemo(() => Math.max(0, allSections.findIndex(s => s.id === activeSectionId)), [activeSectionId, allSections]);
  const activeSection = allSections[currentSectionIndex];

  useEffect(() => {
    document.title = `${stripNumber(activeSection.title)} · ${SITE_TITLE}`;
  }, [activeSection]);

  const activePart = useMemo(() => findPart(MANUAL_DATA, activeSection.id), [activeSection]);

  // Desplaza al inicio o a la subsección pedida una vez renderizada la sección.
  useEffect(() => {
    if (scrollRequest.seq === 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const el = scrollRequest.anchor ? document.getElementById(scrollRequest.anchor) : null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else container.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scrollRequest]);

  /**
   * Abre una sección (y opcionalmente una subsección). Salvo que la navegación
   * venga del propio hash, añade una entrada al historial con `#ancla` para que
   * el enlace sea compartible y el botón «atrás» funcione.
   */
  const goTo = useCallback((target: ManualTarget, fromHash = false) => {
    if (!fromHash) {
      const hash = `#${anchorFor(target)}`;
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    }
    setActiveSectionId(target.sectionId);
    setIsSidebarOpen(false);
    setIsRightSidebarOpen(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    setTooltip(null);
    setScrollRequest(prev => ({
      anchor: target.subIndex === undefined ? null : subsectionAnchor(target.sectionId, target.subIndex),
      seq: prev.seq + 1
    }));
  }, []);

  // Atrás/adelante del navegador, enlaces "#ancla" internos o hash editado a mano.
  useEffect(() => {
    const onHashChange = () => {
      const target = parseAnchor(window.location.hash, ALL_SECTIONS);
      if (target) goTo(target, true);
      else if (!window.location.hash) goTo({ sectionId: DEFAULT_SECTION_ID }, true);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [goTo]);

  const handleSectionSelect = (id: string) => goTo({ sectionId: id });

  const handleResultSelect = (result: SearchResult) => goTo({ sectionId: result.section.id, subIndex: result.subIndex });

  const navigate = (direction: 'next' | 'prev') => {
    const nextIdx = direction === 'next' ? currentSectionIndex + 1 : currentSectionIndex - 1;
    if (nextIdx >= 0 && nextIdx < allSections.length) {
      handleSectionSelect(allSections[nextIdx].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Solo gestos de un dedo que no empiecen sobre una tabla/código desplazable.
    if (e.touches.length !== 1 || startsInHorizontalScroller(e.target, e.currentTarget)) {
      touchStart.current = null;
      return;
    }
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const diffX = start.x - e.changedTouches[0].clientX;
    const diffY = start.y - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
      if (diffX > 0) navigate('next');
      else navigate('prev');
    }
  };

  const isActiveCompleted = completedSections.includes(activeSection.id);

  const searchResults = useMemo(() => searchManual(SEARCH_INDEX, searchQuery), [searchQuery]);
  const isSearching = searchQuery.trim() !== '';

  const handleTermClick: TermClickHandler = (e, entry) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ text: entry.definition, term: entry.term, x: rect.left, y: rect.bottom });
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
            style={window.innerWidth >= 768 ? { left: Math.max(16, Math.min(tooltip.x, window.innerWidth - 340)), top: Math.min(tooltip.y + 8, window.innerHeight - 240) } : {}}
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
            <button onClick={() => setIsMobileSearchOpen(false)} className="text-slate-400" aria-label="Cerrar búsqueda"><ChevronLeft size={24} /></button>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
              <input 
                autoFocus
                type="search"
                enterKeyHint="search"
                aria-label="Buscar en el manual"
                placeholder="Buscar en el manual..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setIsMobileSearchOpen(false); }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SearchResults query={searchQuery} results={searchResults} onSelect={handleResultSelect} />
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
                type="search"
                aria-label="Buscar en el manual"
                placeholder="Buscar..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all [&::-webkit-search-cancel-button]:hidden"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setSearchQuery(''); }}
                onFocus={() => { if (window.innerWidth < 768) setIsMobileSearchOpen(true); }}
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pr-2 custom-scrollbar">
            {isSearching ? (
              <SearchResults query={searchQuery} results={searchResults} onSelect={handleResultSelect} compact />
            ) : (
              <Navigation activeId={activeSection.id} onSelect={handleSectionSelect} completedIds={completedSections} />
            )}
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
                const id = activeSection.id;
                setCompletedSections(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));
              }}
              aria-pressed={isActiveCompleted}
              aria-label={isActiveCompleted ? 'Marcar sección como pendiente' : 'Marcar sección como leída'}
              title={isActiveCompleted ? 'Leída' : 'Marcar como leída'}
              className={`p-2.5 rounded-xl transition-all ${isActiveCompleted ? 'text-green-500 bg-green-500/10' : 'text-slate-600 bg-white/5 hover:text-white'}`}
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
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <div className="p-6 md:p-12 lg:px-24 w-full pb-40">
            <div className="max-w-4xl mx-auto animate-fade-in space-y-12">
              <div className="md:hidden text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em]">
                 {activePart?.label} • {activePart?.title}
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
                      <a key={i} href={`#${subsectionAnchor(activeSection.id, i)}`} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                        <ChevronRight size={14} className="text-slate-800" /> {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <SectionBody
                section={activeSection}
                glossary={activeSection.id === GLOSSARY_SECTION_ID ? null : GLOSSARY}
                onTermClick={handleTermClick}
              />

              <div className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSectionIndex > 0 ? (
                  <button onClick={() => navigate('prev')} className="flex items-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                      <ChevronLeft size={24} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Anterior</span>
                      <span className="text-white font-bold block truncate">{stripNumber(allSections[currentSectionIndex - 1].title)}</span>
                    </div>
                  </button>
                ) : <div />}
                
                {currentSectionIndex < allSections.length - 1 ? (
                  <button onClick={() => navigate('next')} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-right group">
                    <div className="flex-1 overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Siguiente</span>
                      <span className="text-white font-bold block truncate">{stripNumber(allSections[currentSectionIndex + 1].title)}</span>
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