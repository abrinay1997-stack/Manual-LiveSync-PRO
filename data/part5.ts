
import { ManualPart } from '../types';

export const part5: ManualPart = {
  id: "part-5",
  title: "PARTE 5: REPORTES Y RESULTADOS DETALLADOS",
  sections: [
    {
      id: "eq-master-correction",
      title: "18. CORRECCIÓN EQ MASTER (INDOOR)",
      content: [
        "Genera filtros sugeridos para compensar la sala.",
        "• **Filosofía:** Solo cortes (preserva headroom).",
        "• **Severidad:** Badge con clasificación (Menores/Moderados/Graves).",
        "• **Mejora STI:** Muestra % de mejora tras aplicar EQ.",
        "• **Lista de Filtros:** Tipo (Bell, Notch, HPF), Freq, Q, Gain, Razón y Prioridad.",
        "Ejemplo: Bell @ 125Hz Q=4.5 -6.2dB (Modo axial L×W - Critical)."
      ]
    },
    {
      id: "alignment-table-delays",
      title: "19. TABLA DE ALINEACIÓN (DELAYS)",
      content: [
        "La tabla central del reporte técnico.",
        "• **ID:** Nombre del sistema.",
        "• **Dist Real (Slant):** Hipotenusa 3D.",
        "• **Delay Time [ms]:** En **verde brillante**, valor exacto a programar (incluye Haas).",
        "• **Predicción SPL:** SPL esperado. Alerta naranja si < 85dB.",
        "• **Gain Trim:** Ajuste para Gain Shading (+3dB en zona transición).",
        "• **Air Loss (12k):** Pérdida atmosférica acumulada específica."
      ]
    },
    {
      id: "graphs-viz",
      title: "20. COMPENSACIÓN ATMOSFÉRICA (GRÁFICAS)",
      content: [
        "• **EQ Correction (Per Tower):** Boost HF necesario para sonar igual al Main PA.",
        "• **Impulse (Time):** Simulación de arribo de energía. Ideal: arrivals alineados. Arrivals >10ms causan comb filtering."
      ]
    },
    {
      id: "array-health-fingerprint",
      title: "21. SALUD DEL ARREGLO (ARRAY FINGERPRINT)",
      content: [
        "Puntuación 0-100% sobre la salud splay.",
        "• **Verde (Optimal):** 0.5°-6°.",
        "• **Rojo (Gap):** 0° de ángulo (Broken Line).",
        "• **Amarillo (Abrupt):** Cambio brusco >4° entre cajas.",
        "Recomendación: Distribución progresiva para evitar zonas de cancelación."
      ]
    },
    {
      id: "sub-design-analysis",
      title: "22. DISEÑO DE SUBGRAVES",
      content: [
        "• **Métricas Superiores:** Modo Array (Omni/CSA/End-fire), Sub SPL Max, Power Alley (+6dB en centro).",
        "• **Ground Effect:** Tabla de cortes (Notches) por interferencia de suelo. Corte típico #1 @ 85Hz.",
        "• **Topología Requerida:** Polar Plot, Separación Física (m), Delay Electrónico (ms).",
        "• **Sub Time Align:** Delay recomendado para alinear subs con Main PA considerando desfase de filtro DSP (LR24=360°)."
      ]
    },
    {
      id: "electrical-engineering-logistics",
      title: "23. INGENIERÍA ELÉCTRICA Y LOGÍSTICA",
      content: [
        "**23.1 Alertas Críticas:** Sobrecarga, Peligro Eléctrico (Sin tierra), Desbalance Fases, Red Saturada.",
        "**23.2 Power Distribution:** Barras de balance (L1, L2, L3). Corriente de Neutro (<5A Ideal, >20A Peligro).",
        "**Damping Factor:** >200 (Excelente), <50 (Crítico - pérdida punch).",
        "**Voltage Drop:** <2% Aceptable, >5% Crítico.",
        "**24. Dinámica Térmica:** Temp Bobina Estimada tras 2h (Ideal 60-80°C). Compresión Térmica (dB).",
        "**Corriente de Irrupción:** Pico al encender. IMPORTANTE: Usar secuencias de encendido (2-5s)."
      ]
    },
    {
      id: "signal-flow-diagram",
      title: "25. FLUJO DE SEÑAL & ARQUITECTURA",
      content: [
        "Diagrama ASCII detallado que muestra:",
        "• **Power Flow:** Generador → Fase L1/L2/L3 → Amp Racks.",
        "• **Signal Flow:** Console → Drive Processor → Dante Network → Amps → Speakers.",
        "• **Processing Chain:** Crossover (HPF/LPF) → Delay Alignment → EQ Correction → Gain Structure."
      ]
    }
  ]
};
