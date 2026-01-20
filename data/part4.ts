
import { ManualPart } from '../types';

export const part4: ManualPart = {
  id: "part-4",
  title: "PARTE 4: CÁLCULOS Y ANÁLISIS CIENTÍFICO",
  sections: [
    {
      id: "calibration-objectives",
      title: "10. OBJETIVOS DE CALIBRACIÓN",
      content: [
        "Define las metas acústicas y alineación temporal del sistema.",
        "**10.1 Asistente de Objetivos (Presets)**",
        "• Corporativo (95dB@25m), Concierto (102dB@35m), Festival (105dB@50m).",
        "**10.2 Offset Físico Subs (m)**",
        "Distancia entre Tops y Subs. Crítico para alineación de fase.",
        "**10.3 Frecuencia de Crossover (Hz)**",
        "Típicamente 80-100 Hz.",
        "**10.4 Tipo de Filtro DSP**",
        "• LR24 (Estándar), BW24 (Pronunciado), BW12 (Suave). LiveSync compensa automáticamente el group delay del filtro.",
        "**10.5 SPL Objetivo (dB LEQ)**",
        "85-90 (Speech), 100-105 (Rock), 105-110+ (EDM).",
        "**10.6 Distancia FOH:** Regla FOH = 1.5 × Ancho Escenario."
      ]
    },
    {
      id: "delay-towers-details",
      title: "11. TORRES DE DELAY",
      content: [
        "Sistemas de refuerzo distribuido.",
        "**11.2 Parámetros:** Nombre, Distancia horizontal, Altura Relativa.",
        "• **Slant Distance:** Pitágoras para calcular delay real.",
        "**11.3 Cálculos Automáticos:** Delay Time (ms), SPL en Objetivo, Gain Trim (Gain Shading), Atmospheric Loss ISO 9613-1.",
        "• Delay = (Slant Distance / Speed of Sound) × 1000 ms."
      ]
    },
    {
      id: "infra-network-safety",
      title: "12. INFRAESTRUCTURA, RED Y SEGURIDAD",
      content: [
        "**12.1 Energía:** Voltaje (110V/230V/208V), Fases (Monofásico/Trifásico), Marca/Modelo Amp (datos PF reales).",
        "**12.1.5 Calibre Cable:** 12 AWG (Estándar Pro), 10 AWG (Heavy Duty). Calibre insuficiente degrada damping factor (bajos 'muddy').",
        "**12.2 Red Digital:** Dante/AVB. Calcula Mbps necesarios. Alerta si >1Gbps.",
        "**12.3 Rigging y Carga:** SWL (Safe Working Load). Safety factor (5:1 o 7:1). Alertas: Verde (<60%), Amarillo (60-80%), Rojo (>80% NO VOLAR)."
      ]
    },
    {
      id: "calculate-engine",
      title: "13. MOTOR DE CÁLCULO 'CALCULAR SISTEMA'",
      content: [
        "Ejecuta más de **40 algoritmos científicos** en secuencia:",
        "1. **Física Atmosférica:** Cramer, Presión barométrica, Atenuación.",
        "2. **Acústica de Sala:** RT60, Modos axiales/tangenciales/oblicuos, Reflexiones.",
        "3. **Física Line Array:** Coupling gain, Near/Far field transition, Olson directivity.",
        "4. **Alineación Temporal:** Delays Haas, Fase Sub/Main, Group delay.",
        "5. **Electricidad:** Balance de fases, Caída voltaje, Power compression.",
        "6. **Rigging:** Safety margin, Tensiones vectoriales.",
        "7. **Networking:** Bandwidth Dante/AVB.",
        "8. **Logística:** BOM, Patch list, Crew sizing.",
        "**Validaciones Pre-Cálculo:** Splay mismatch, campos incompletos."
      ]
    },
    {
      id: "scientific-analysis",
      title: "14. PANELES DE ANÁLISIS ESPECÍFICO",
      content: [
        "**14.1 Análisis de Drift Térmico**",
        "Muestra impacto de Temp Setup vs Temp Showtime. Estado Crítico si Drift > 0.5ms. Sugiere ajustes de EQ @ 12kHz.",
        "",
        "**15. Acústica de Sala (Indoor)**",
        "• RT60 (Ideal 0.3-0.5s). Distancia Crítica (Dc): si FOH > Dc necesitas Delays. STI (0.0 a 1.0) para inteligibilidad.",
        "",
        "**16. Física Avanzada (WST & Olson)**",
        "• Criterio Heil: verifica acoplamiento coherente (Compliant: Verde/Rojo).",
        "• Grating Lobes: Freq de lóbulos espurios (4-8kHz).",
        "• Olson Penalty: Pérdida dB @ 8kHz fuera del eje vertical. >6dB indica mala ubicación FOH.",
        "• Refracción Atmosférica: Radio de curvatura (km).",
        "",
        "**17. Modos de Sala (Room Modes)**",
        "Identifica resonancias. Fondo rojo si modo coincide con Crossover (±5Hz), causando 'boominess'. Solución: Notch @ Freq."
      ]
    }
  ]
};
