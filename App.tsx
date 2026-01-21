import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const handleOpenManual = () => {
    // Redirigir en la misma pestaña
    window.location.href = 'https://manual.livesyncpro.com';
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo y Título */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

              {/* Logo Image */}
              <img
                src="https://hostedimages-cdn.aweber-static.com/MjM0MTQ0NQ==/optimized/20657f92efa544489526caee3beef9d2.png"
                alt="LiveSync PRO"
                className="relative w-full h-full object-contain opacity-90"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
            LIVESYNC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">PRO</span>
          </h1>

          <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
            System Engineering Suite
          </p>
        </div>

        {/* Descripción */}
        <div className="space-y-4 animate-slide-up">
          <p className="text-slate-400 text-lg leading-relaxed">
            Accede al manual técnico oficial de LiveSync PRO con toda la documentación,
            guías de configuración y mejores prácticas.
          </p>
        </div>

        {/* Botón Principal */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <button
            onClick={handleOpenManual}
            className="group relative px-8 py-4 bg-cyan-500 text-black rounded-xl font-bold text-lg
                     shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]
                     transition-all duration-150 flex items-center gap-3"
          >
            <BookOpen size={24} />
            <span>Abrir Manual Técnico</span>
            <ExternalLink size={18} className="opacity-60" />
          </button>
        </div>

        {/* Info adicional */}
        <div className="mt-12 pt-8 border-t border-white/5 animate-fade-in">
          <p className="text-slate-600 text-sm">
            Manual del Ingeniero - Versión 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
