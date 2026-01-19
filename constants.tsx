
import { ManualPart } from './types';

export const MANUAL_DATA: ManualPart[] = [
  {
    id: "part-1",
    title: "I. Introducción y Hub",
    sections: [
      {
        id: "intro",
        title: "1. Bienvenida a LiveSync Pro",
        content: [
          "LiveSync Pro es una plataforma web profesional que permite a ingenieros de audio diseñar, calcular y optimizar sistemas completos de sonido para eventos en vivo.",
          "La aplicación combina física acústica avanzada, modelado atmosférico y cálculos de ingeniería para generar reportes técnicos profesionales (Technical Riders) con precisión científica.",
          "**¿Qué puedes hacer con LiveSync Pro?**",
          "• ✅ Diseñar sistemas PA completos (Line Arrays, Subwoofers, Delay Towers)",
          "• ✅ Calcular delays geométricos con compensación atmosférica (ISO 9613-1)",
          "• ✅ Optimizar alineación de fase PA-Subwoofer",
          "• ✅ Generar curvas de EQ correctivas automáticas para torres de delay",
          "• ✅ Calcular infraestructura eléctrica trifásica y rigging",
          "• ✅ Exportar reportes técnicos en PDF y archivos CAD (DXF)",
          "• ✅ Colaborar con equipos de hasta 5 personas (Plan Corporativo)"
        ]
      },
      {
        id: "access",
        title: "2. Acceso a la Plataforma",
        content: [
          "2.1 Registro e Inicio de Sesión",
          "Al ingresar a https://livesyncpro.com verás la Landing Page con información sobre las características de la plataforma.",
          "Para comenzar: 1. Haz clic en el botón 'Iniciar Sesión'. 2. Selecciona Google OAuth (Recomendado) o Email/Password."
        ],
        subsections: [
          {
            title: "2.2 Planes de Suscripción",
            content: [
              "TABLE:Plan | Precio | Características",
              "Trial | Gratis | 0 Proyectos, solo añadido a la base de datos",
              "Standard | $99/año | Proyectos ilimitados, exportación PDF/CAD",
              "Corporate | $499/año | Gestión de equipos (5 licencias), proyectos compartidos",
              "Partner | Personalizado | Licencias custom para empresas",
              "",
              "**Estado de Suscripción:**",
              "• 🟢 Activo: Acceso completo a todas las funciones",
              "• 🔴 Expirado: Requiere renovación (solo lectura de proyectos)"
            ]
          }
        ]
      },
      {
        id: "hub",
        title: "3. Hub de Proyectos",
        content: [
          "Centro de comando donde gestionas todos tus proyectos.",
          "3.1 Interfaz del Hub:",
          "A. Encabezado Superior: Título, Widget de Equipo, Barra de búsqueda, Botón de sincronización ⟳ y Nuevo Proyecto.",
          "B. Grilla de Proyectos: Tarjetas con Nombre, Cliente, Tipo (PRIV/TEAM), Sistema PA y Fecha de modificación."
        ],
        subsections: [
          {
            title: "3.2 Crear y Gestionar Proyectos",
            content: [
              "1. Haz clic en 'Nuevo Proyecto'.",
              "2. Formulario: Nombre (Obligatorio), Cliente (Opcional), Compartir (Solo TEAM).",
              "Menú Contextual (⋮): Renombrar, Compartir/Hacer Privado, Duplicar (genera copia con cálculos) y Eliminar (Irreversible).",
              "Sincronización en la Nube: Auto-guardado cada 2 segundos vía Supabase."
            ]
          }
        ]
      },
      {
        id: "teams",
        title: "4. Gestión de Equipos (Plan Corporativo)",
        content: [
          "Permite colaboración entre múltiples ingenieros bajo una misma licencia ($499/año).",
          "Beneficios: Comparte proyectos con hasta 5 personas, visibilidad en tiempo real, gestión centralizada."
        ],
        subsections: [
          {
            title: "4.2 Operaciones de Equipo",
            content: [
              "• Crear Equipo: Genera código único (team_abc123xyz).",
              "• Invitar Miembros: El invitado ingresa el código y hereda la licencia Corporate.",
              "• Gestión (Owner): Expulsar miembros 🚫 o Disolver equipo (Irreversible).",
              "• Privacidad: Badge 🔒 PRIV (Solo creador) o 👥 TEAM (Todo el equipo)."
            ]
          }
        ]
      },
      {
        id: "interface-struct",
        title: "5. Interfaz Principal y Navegación",
        content: [
          "A. Barra Superior (Header): Logo, Nombre editable, Botón Ayuda (?), Calcular Sistema, Cerrar (✖).",
          "B. Panel Izquierdo: Pestañas BASIC, ADVANCED, VENUE.",
          "C. Panel Derecho: Resultados post-cálculo y botones de exportación (PDF, CAD, 3D)."
        ],
        subsections: [
          {
            title: "5.2 Sistema de Ayuda y Referencias",
            content: [
              "• Panel de Conocimiento: Concepto Básico (Esmeralda), Ingeniería Avanzada (Morado) y Pro Tips (Cyan).",
              "• Referencias Científicas (⚛️): Estándares ISO 9613-1, ISO 3382, IEC 60268-16 y bibliografía de Heil, Beranek y McCarthy.",
              "• Soporte Técnico (🛟): Enlace directo a support.livesyncpro.com."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "part-2",
    title: "II. Configuración de Proyectos",
    sections: [
      {
        id: "env-full",
        title: "6. Entorno y Atmósfera",
        content: [
          "6.1 Condiciones Básicas (Tab BASIC):",
          "• Temperatura Ambiente: c ≈ 331.3 + (0.6 × T). Determina tiempos de delay.",
          "• Humedad Relativa: Afecta la absorción de HF. Crítico en aire seco (<30%).",
          "• Altitud: 0m a 5000m. Modifica absorción atmosférica según ISO 9613-1.",
          "• Viento: Velocidad y Dirección (0°=Tailwind, 180°=Headwind). Genera alertas: 10-15m/s (Peligro), >15m/s (CRÍTICO - BAJAR PA)."
        ],
        subsections: [
          {
            title: "6.2 Condiciones Avanzadas y Venue",
            content: [
              "• Ocupación (%): Corrige calor corporal (+1°C cada 20% ocupación) y humedad (+20% indoor lleno).",
              "• Drift Térmico: Predice cambios de delay entre Soundcheck y Show.",
              "• Venue Type: Indoor (RT60 calculado) vs Outdoor (Campo libre).",
              "• Layout: Proscenium, Arena 360°, Teatro Circular, Thrust, Traverse.",
              "• Acústica (Indoor): Dimensiones, Material de paredes/techo y RT60 medido en campo."
            ]
          }
        ]
      },
      {
        id: "pa-system-full",
        title: "7. Sistema Principal (PA)",
        content: [
          "Configuración del arreglo principal (Line Array o Point Source).",
          "• Configuración: Stereo L/R o Mono Center.",
          "• Catálogo: L-Acoustics (K1, K2, Kara), d&b (GSL, J, V), Meyer (Panther, LEO), JBL, Adamson, RCF.",
          "• Parámetros: Cajas por lado (1-24), Altura (centro acústico), Ancho escenario."
        ],
        subsections: [
          {
            title: "7.2 Subwoofer Array Designer",
            content: [
              "• Topologías: Omnidireccional, Cardioide Invertido (CSA - Ratio 2:1), End-Fire Line.",
              "• Cálculos: SPL Max coherente, Spacing requerido y Delays electrónicos.",
              "• Frontfills/Outfills: Habilitación por checkbox, cantidad y modelo."
            ]
          },
          {
            title: "7.4 Ángulos de Separación (Splay)",
            content: [
              "• Editor CSV: Formato 0, 0.5, 1, 2... (Unidad: Grados °).",
              "• Presets: 0° (Tiro Largo), J-Shape (Logarítmica), Arco Constante (Uniforme)."
            ]
          }
        ]
      },
      {
        id: "monitors-full",
        title: "8. Monitores y Escenario (Stage World)",
        content: [
          "• Wedges (Pisos): Modelos (X15 HiQ, M4, MJF-212A). Mezclas independientes.",
          "• Sidefills: Cobertura general de banda lateral.",
          "• IEMs: Cantidad de sistemas y modo (Mono/Stereo)."
        ]
      },
      {
        id: "control-full",
        title: "9. Control FOH & Drive",
        content: [
          "• Consola FOH: DiGiCo (Quantum 338, SD12), Avid S6L, Yamaha (Rivage, CL5), Allen & Heath dLive.",
          "• Drive Processor: Lake LM, Meyer Galaxy, Outline Newton, Prodigy.MP.",
          "• Arquitectura: Main Only, Redundante (Backup), FOH+Monitors, Split A/B (Festivales).",
          "• Transporte/Snake: Fibra Optocore, Digital CAT6 (Dante), Analógico (Cobre), Híbrido."
        ]
      },
      {
        id: "goals-full",
        title: "10. Objetivos de Calibración",
        content: [
          "• Asistente: Corporativo (95dB @ 25m), Concierto (102dB @ 35m), Festival (105dB @ 50m).",
          "• Offset Subs: Distancia física PA-Subs para alineación de fase.",
          "• Crossover: Frecuencia (80-100Hz) y Tipo de Filtro (LR24, BW24, BW12).",
          "• Target SPL: LEQ promedio (promedio continuo, no peaks).",
          "• Distancia FOH: Típicamente 1.5 × Ancho escenario."
        ]
      },
      {
        id: "delays-towers-full",
        title: "11. Torres de Delay",
        content: [
          "Sistemas de refuerzo distribuido.",
          "• Parámetros: Distancia horizontal, Altura relativa (Δh).",
          "• Slant Distance = √(Distancia² + Altura²). Usada para delay real.",
          "• Gain Trim: Objetivo +3dB sobre Main PA en zona de transición."
        ]
      },
      {
        id: "infra-full",
        title: "12. Infraestructura, Red y Seguridad",
        content: [
          "12.1 Energía y Potencia:",
          "• Voltaje: 110V, 120V, 208V (US) / 220V, 230V, 240V (EU/LATAM).",
          "• Fases: Monofásico vs Trifásico (Carga L1, L2, L3).",
          "• Cables: Calibre (16 a 4 AWG). Afecta Damping Factor y Caída de Voltaje.",
          "12.2 Red Digital: Dante vs AVB/Milan. Cálculo de ancho de banda (Mbps) según Sample Rate y Canales.",
          "12.3 Rigging: Capacidad SWL (250-2000kg). Alertas: <60% (Safe), 60-80% (Warning), >80% (CRÍTICO)."
        ]
      }
    ]
  },
  {
    id: "part-3",
    title: "III. Resultados e Ingeniería",
    sections: [
      {
        id: "engine-full",
        title: "13. Botón 'Calcular Sistema'",
        content: [
          "Ejecuta más de 40 algoritmos: Física Atmosférica (Cramer, ISO 9613), Acústica (Eyring, Modos), Line Array Physics (WST, Near field), Alineación (Haas, Fase), Electricidad (Damping, Voltage Drop) y Rigging (Safety Margin).",
          "Tiempo de cálculo: 1-3 segundos."
        ]
      },
      {
        id: "thermal-drift-analysis",
        title: "14. Análisis de Drift Térmico",
        content: [
          "Métricas: Velocidad sonido (Check vs Show), Delta Speed.",
          "• 🟢 Normal: <0.5ms drift.",
          "• 🔴 Crítico: >0.5ms (REAJUSTAR DELAYS).",
          "• Sugerencia EQ (12kHz): Compensación por humedad de aire."
        ]
      },
      {
        id: "room-acoustics-full",
        title: "15. Acústica de Sala (Indoor)",
        content: [
          "• RT60 (Reverberation): 0.3-0.6s (Ideal), 0.8-1.2s (Bueno), >3s (Ininteligible).",
          "• Distancia Crítica (Dc): Límite donde campo directo = reverberante.",
          "• STI (Speech Transmission Index): 0.00-1.00. Objetivo > 0.60."
        ]
      },
      {
        id: "physics-full",
        title: "16. Física Avanzada (WST & Olson)",
        content: [
          "• Criterio Heil (WST): Frecuencia max acoplamiento. Valida si es fuente continua.",
          "• Grating Lobes: Identificación de lóbulos espurios.",
          "• Penalización Olson: Pérdida dB @ 8kHz fuera de eje vertical. >6dB indica mala ubicación FOH.",
          "• Refracción: Rayos curvos por gradiente térmico (Shadow zones)."
        ]
      },
      {
        id: "room-modes-full",
        title: "17. Modos Propios (Room Modes)",
        content: [
          "Tabla de resonancias axiales, tangenciales y oblicuas.",
          "⚠️ Modos Críticos: Si la frecuencia coincide con el Crossover (±5Hz), se genera 'boominess' excesivo."
        ]
      },
      {
        id: "eq-correction-full",
        title: "18. Corrección EQ Master",
        content: [
          "Generación de filtros (Solo cortes).",
          "• Severidad: Menor (RT60<0.8s), Moderada, Grave.",
          "• Mejora STI: Comparativa antes/después de filtros.",
          "• Lista de Filtros: Frecuencia, Q, Gain (dB) y Razón (ej: Modo Axial 63Hz)."
        ]
      },
      {
        id: "delay-table-full",
        title: "19. Tabla de Alineación (Delays)",
        content: [
          "• Delay Time [ms]: Valor con Precedence Effect (Haas) incluido.",
          "• Gain Trim [dB]: Ajuste para handoff suave.",
          "• Air Loss (12k) [dB]: Pérdida predicha por distancia."
        ]
      },
      {
        id: "sub-design-full",
        title: "22. Diseño de Subgraves",
        content: [
          "• Sub SPL Max: SPL en half-space.",
          "• Power Alley: SPL en centro on-axis.",
          "• Ground Effect: Tabla de Notches (Frecuencias de cancelación geométrica).",
          "• Alineación: Delay de fase y recomendación Ø INVERT."
        ]
      },
      {
        id: "electrical-log-full",
        title: "23. Ingeniería Eléctrica (Logística)",
        content: [
          "Alertas Críticas: 🔴 SOBRECARGA, 🔴 PELIGRO ELÉCTRICO (Tierra), 🔴 RED SATURADA (>1Gbps), 🔴 CABLEADO (Damping <50).",
          "Visualización: Balance de fases L1/L2/L3, Neutral Current y Caída Voltaje %."
        ]
      },
      {
        id: "dynamics-full",
        title: "24. Dinámica Térmica & Eléctrica",
        content: [
          "• Temp. Bobina: Estimación tras 2h a max potencia.",
          "• Compresión Térmica [dB]: Pérdida SPL por calor.",
          "• Inrush Current [A]: Pico al encendido (5-10x corriente continua)."
        ]
      },
      {
        id: "signal-flow-full",
        title: "25. Flujo de Señal y Arquitectura",
        content: [
          "CODE:25.1 Power Flow (Suministro)",
          "GENERADOR / ACOMETIDA (45kVA)",
          "│",
          "├─ Voltage: 208V",
          "├─ Phase: 3-Phase",
          "↓",
          "AMPLIFIER RACKS (Lab.gruppen)",
          "",
          "25.2 Signal Flow (Audio)",
          "CONSOLE (DiGiCo Quantum 338)",
          "↓",
          "DRIVE PROCESSOR (Lake LM44)",
          "│",
          "├─ Matrix Out 1-2 → Main L/R",
          "├─ Matrix Out 3-4 → Sub L/R",
          "↓",
          "DANTE NETWORK → AMPLIFIERS"
        ]
      }
    ]
  },
  {
    id: "part-4",
    title: "IV. Exportación y Visualización",
    sections: [
      {
        id: "export-3d-full",
        title: "26. Visualización 3D",
        content: [
          "Renderizado geométrico interactivo.",
          "• Colores: Cyan (Main), Púrpura (Subs), Naranja (Delays), Gris (Venue/FOH).",
          "• Utilidad: Validar separaciones, ángulos de tiro y presentar a producción."
        ]
      },
      {
        id: "export-copy-full",
        title: "27. Copiar Reporte",
        content: [
          "Copia al portapapeles en formato texto plano.",
          "Incluye: Specs Sistema, Condiciones Ambientales, Tabla Delays y Análisis Eléctrico."
        ]
      },
      {
        id: "export-pdf-full",
        title: "28. Reporte Técnico PDF",
        content: [
          "Documento profesional de 10 páginas.",
          "Contenido: Portada, Specs, Tabla Delays, Análisis Acústico, Sub Design, Eléctrica, BOM (Bill of Materials), Patch List y Gráficas de respuesta e impulso."
        ]
      },
      {
        id: "export-cad-full",
        title: "29. Exportación CAD (DXF)",
        content: [
          "Archivo geométrico escala 1:1 compatible con AutoCAD/Vectorworks.",
          "Layers: STAGE, MAIN_PA, SUBWOOFERS, DELAY_TOWERS, FOH_POSITION, DIMENSIONS."
        ]
      }
    ]
  },
  {
    id: "part-5",
    title: "V. Flujo de Trabajo y Resumen",
    sections: [
      {
        id: "workflow-full",
        title: "31. Flujo Típico de Uso",
        content: [
          "1. Acceso y Hub.",
          "2. Crear Proyecto.",
          "3. Configuración (Entorno -> PA -> Monitores -> FOH -> Objetivos -> Torres -> Infra).",
          "4. Calcular Sistema.",
          "5. Revisar Resultados y Alertas.",
          "6. Exportar (Copy, PDF, CAD, 3D).",
          "7. Iterar y Ajustar en campo."
        ]
      },
      {
        id: "tips-full",
        title: "32. Consejos Avanzados",
        content: [
          "• Precisión: Usa RT60 medido con globo o SMAART.",
          "• Eventos complejos: Arena 360° requiere 4 torres delay.",
          "• Outdoor: Monitorea el viento >20km/h para seguridad estructural.",
          "• Colaboración: Marca proyectos como Shared para el crew."
        ]
      },
      {
        id: "support-full",
        title: "33. Soporte y Recursos",
        content: [
          "• Guías rápidas por tema.",
          "• Chat en vivo en support.livesyncpro.com.",
          "• Base de datos de FAQ y tutoriales en video.",
          "• Referencias Científicas (Normas ISO/IEC)."
        ]
      }
    ]
  }
];
