
import React, { useState, useMemo, useEffect } from 'react';
import Logo from './components/Logo';
import Card from './components/Card';
import Navigation from './components/Navigation';
import { MANUAL_DATA } from './constants';
import { ManualSection, SearchResult } from './types';
import { Search, Download, ExternalLink, Menu, X, ArrowUpCircle, ChevronRight, ChevronLeft, BookOpen, AlertCircle, Table as TableIcon, FileText } from 'lucide-react';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allSections = useMemo(() => {
    return MANUAL_DATA.flatMap(part => part.sections);
  }, []);

  const currentSectionIndex = useMemo(() => {
    return allSections.findIndex(s => s.id === activeSectionId);
  }, [activeSectionId, allSections]);

  const activeSection = useMemo(() => {
    return allSections[currentSectionIndex] || allSections[0];
  }, [currentSectionIndex, allSections]);

  const navigate = (direction: 'next' | 'prev') => {
    const nextIdx = direction === 'next' ? currentSectionIndex + 1 : currentSectionIndex - 1;
    if (nextIdx >= 0 && nextIdx < allSections.length) {
      handleSectionSelect(allSections[nextIdx].id);
    }
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return null;
    const q = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    
    MANUAL_DATA.forEach(part => {
      part.sections.forEach(section => {
        const titleMatch = section.title.toLowerCase().includes(q);
        const contentMatch = section.content.some(c => c.toLowerCase().includes(q));
        const subMatch = section.subsections?.some(sub => 
          sub.title.toLowerCase().includes(q) || sub.content.some(sc => sc.toLowerCase().includes(q))
        );
        
        if (titleMatch || contentMatch || subMatch) {
          results.push({
            partTitle: part.title,
            section,
            matchType: titleMatch ? 'title' : 'content'
          });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const handleSectionSelect = (id: string) => {
    setActiveSectionId(id);
    setIsSidebarOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Helper to render complex content lines
  const renderLine = (line: string, idx: number) => {
    if (line.startsWith('TABLE:')) {
      const rows = line.replace('TABLE:', '').split('\n').filter(r => r.trim());
      const data = rows.map(r => r.split('|').map(c => c.trim()));
      return (
        <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white uppercase text-xs">
              <tr>
                {data[0].map((cell, i) => <th key={i} className="px-4 py-3 font-bold border-b border-white/10">{cell}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.slice(1).map((row, ri) => (
                <tr key={ri} className="hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-slate-400">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (line.startsWith('CODE:')) {
      return (
        <pre key={idx} className="my-4 font-mono text-[11px] md:text-xs bg-black p-4 rounded-lg border border-cyan-500/20 text-cyan-400 overflow-x-auto leading-tight shadow-inner">
          {line.replace('CODE:', '')}
        </pre>
      );
    }

    const isCheck = line.startsWith('•');
    const isImportant = line.includes('⚠️') || line.includes('🔴') || line.includes('✅') || line.includes('🟢');
    const isFormula = line.includes('≈') || line.includes('c =') || line.includes('λ') || line.includes('√');
    const isBold = line.includes('**');

    let processedText: React.ReactNode = line;
    if (isBold) {
      const parts = line.split('**');
      processedText = parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part);
    }

    return (
      <p 
        key={idx} 
        className={`
          ${isCheck ? 'pl-6 relative border-l border-cyan-500/20 py-1.5 bg-white/[0.02] rounded-r-lg' : ''}
          ${isImportant ? 'text-white font-medium' : ''}
          ${isFormula ? 'font-mono bg-[#1a1a1a] p-3 rounded-lg border border-white/5 text-cyan-300 overflow-x-auto my-2' : ''}
          ${!isCheck && !isFormula ? 'my-2' : ''}
        `}
      >
        {processedText}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-400 flex flex-col md:flex-row font-sans selection:bg-cyan-500/30">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] -z-10 rounded-full animate-pulse-slow"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] -z-10 rounded-full"></div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Menu className="text-white cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
          <h2 className="text-white font-bold text-xs tracking-widest uppercase">LiveSync Pro</h2>
        </div>
        <Logo size="sm" />
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-[60] w-80 bg-[#06010f] border-r border-white/5 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6 overflow-hidden">
          <div className="mb-8 flex justify-between items-start">
            <Logo size="md" />
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="relative mb-6 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Buscar en el manual..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-white placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <Navigation activeId={activeSectionId} onSelect={handleSectionSelect} />
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Documentación</p>
                <span className="text-white font-bold text-xs flex items-center gap-1.5">v1.0 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Stable</span>
              </div>
              <BookOpen size={16} className="text-cyan-500" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-[#050505] flex flex-col h-screen overflow-y-auto custom-scrollbar">
        <header className="hidden md:flex items-center justify-between px-12 py-6 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
          <div className="animate-fade-in">
            <h2 className="text-white font-bold text-lg tracking-tight">Manual del Ingeniero</h2>
            <p className="text-cyan-400 text-[10px] uppercase tracking-[0.4em] font-bold mt-1">LIVESYNC PRO TECHNICAL RIDER</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-extrabold hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5">
              <Download size={14} /> Full Manual PDF
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-12 lg:px-24 max-w-5xl mx-auto w-full pb-32">
          {searchQuery ? (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Search size={24} className="text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Resultados: <span className="text-cyan-400">"{searchQuery}"</span></h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResults?.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => handleSectionSelect(res.section.id)}
                    className="text-left p-6 bg-[#0f0f0f] border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/[0.02] transition-all group relative"
                  >
                    <p className="text-[10px] text-cyan-400 uppercase tracking-widest mb-2 font-bold opacity-60">{res.partTitle}</p>
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors leading-tight">{res.section.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{res.section.content[0]}</p>
                  </button>
                ))}
              </div>

              {filteredResults?.length === 0 && (
                <div className="p-20 text-center bg-[#0f0f0f] rounded-3xl border border-dashed border-white/10">
                  <AlertCircle size={32} className="text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500">No encontramos coincidencias para esta búsqueda técnica.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-in space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-12 bg-cyan-500/50"></span>
                  <span className="text-cyan-400 text-[10px] uppercase font-bold tracking-[0.4em]">Sección {activeSection.id.toUpperCase()}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-tight">
                  {activeSection.title}
                </h1>
              </div>

              <Card className="animate-slide-up">
                <div className="space-y-4 text-slate-400 leading-relaxed text-lg font-light">
                  {activeSection.content.map((line, idx) => {
                    // Logic to aggregate subsequent table lines
                    if (line.startsWith('TABLE:')) {
                      let tableLines = line;
                      let k = idx + 1;
                      while (k < activeSection.content.length && (activeSection.content[k].includes('|') || activeSection.content[k].trim() === "")) {
                        tableLines += '\n' + activeSection.content[k];
                        k++;
                      }
                      // We hackily skip aggregated lines by checking idx later or using a loop. 
                      // For simplicity, we assume tables are single strings for now as provided in constants.
                    }
                    return renderLine(line, idx);
                  })}
                </div>

                {activeSection.subsections && activeSection.subsections.length > 0 && (
                  <div className="mt-12 space-y-12 border-t border-white/5 pt-12">
                    {activeSection.subsections.map((sub, sidx) => (
                      <div key={sidx} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                          <h3 className="text-2xl font-bold text-white tracking-tight">{sub.title}</h3>
                        </div>
                        <div className="space-y-4 pl-5">
                          {sub.content.map((line, lidx) => renderLine(line, lidx + 1000))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <div className="pt-24 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
                <button 
                  onClick={() => navigate('prev')}
                  disabled={currentSectionIndex === 0}
                  className={`flex flex-col items-start gap-1 group transition-all w-full md:w-auto ${currentSectionIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:-translate-x-2'}`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold group-hover:text-cyan-400 transition-colors">Tema Anterior</span>
                  <div className="flex items-center gap-2 text-white font-bold text-xl">
                    <ChevronLeft size={20} className="text-cyan-500" />
                    <span>Atrás</span>
                  </div>
                </button>
                
                <div className="hidden md:flex flex-col items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)] animate-pulse mb-2"></div>
                   <span className="text-[8px] text-slate-700 uppercase tracking-[0.4em] font-bold">LIVESYNC DATA ENGINE</span>
                </div>

                <button 
                  onClick={() => navigate('next')}
                  disabled={currentSectionIndex === allSections.length - 1}
                  className={`flex flex-col items-end gap-1 group transition-all w-full md:w-auto ${currentSectionIndex === allSections.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:translate-x-2'}`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold group-hover:text-purple-500 transition-colors">Siguiente Capítulo</span>
                  <div className="flex items-center gap-2 text-white font-bold text-xl text-right">
                    <span>Continuar</span>
                    <ChevronRight size={20} className="text-purple-500" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-24 right-8 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all z-40 shadow-2xl animate-fade-in"
          >
            <ArrowUpCircle size={24} />
          </button>
        )}

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-cyan-500 text-black rounded-2xl shadow-[0_8px_32px_rgba(6,182,212,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 md:hidden"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </main>
    </div>
  );
};

export default App;
