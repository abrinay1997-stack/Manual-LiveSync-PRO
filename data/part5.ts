
import { ManualPart } from '../types';

export const part5: ManualPart = {
  id: "part-5",
  title: "REPORTES Y RESULTADOS DETALLADOS",
  sections: [
    {
      id: "eq-master-correction-full",
      title: "18. CORRECCIÓN EQ MASTER (INDOOR)",
      content: [
        "LiveSync Pro genera una lista de filtros EQ sugeridos para compensar los problemas acústicos de la sala.",
        "",
        "**18.1 Gráfica de Respuesta en Frecuencia**",
        "Muestra la curva de EQ correctiva (solo cortes, nunca boosts).",
        "**Filosofía:** Los cortes preservan el headroom del sistema. Los boosts consumen headroom y pueden causar feedback.",
        "",
        "**18.2 Severidad de la Sala**",
        "Badge con clasificación:",
        "• 🟢 **Problemas Menores:** RT60 < 0.8s, pocos modos críticos.",
        "• 🟠 **Problemas Moderados:** RT60 0.8-1.5s, varios modos conflictivos.",
        "• 🔴 **Problemas Graves:** RT60 > 1.5s, sala muy reverberante.",
        "",
        "**18.3 Mejora de Inteligibilidad (STI)**",
        "Muestra el antes/después de aplicar la EQ (ej: Sin EQ: 0.52 -> Con EQ: 0.64).",
        "",
        "**18.4 Lista de Filtros Sugeridos**",
        "Cada filtro indica Tipo (Bell, Notch, HPF, etc.), Frecuencia (Hz), Q (Factor de calidad), Gain (en dB, siempre negativo), Razón y Prioridad.",
        "• 🔴 **Critical:** Debe implementarse.",
        "• 🟠 **Important:** Recomendado.",
        "• 🟢 **Optional:** Mejora marginal.",
        "**Ejemplo:** Bell @ 125Hz Q=4.5 -6.2dB - Modo axial LxW (Critical).",
        "",
        "**18.5 Estrategia de Corrección**",
        "Descripción en lenguaje natural de la estrategia general (ej: \"Cortar graves excesivos por RT60 alto, atenuar modos axiales en 63Hz...\").",
        "**18.6 Botón 'Copiar Lista de Filtros':** Exporta la lista completa en formato texto."
      ]
    },
    {
      id: "alignment-table-full",
      title: "19. TABLA DE ALINEACIÓN (DELAYS)",
      content: [
        "La tabla central del reporte. Muestra todos los sistemas (Main PA + Torres) con sus parámetros de alineación temporal.",
        "",
        "**19.1 Columnas de la Tabla**",
        "• **ID:** Nombre del sistema (ej: \"Main PA L/R\", \"Torre Centro\").",
        "• **Dist. Real (Slant) [m]:** Distancia real tridimensional (hipotenusa) desde el PA principal considerando altura.",
        "• **Delay Time [ms]:** Tiempo de retardo requerido. **Color verde brillante:** Valor a programar en el DSP. Incluye el Precedence Effect (Haas) configurado.",
        "• **Predicción SPL [dB]:** Nivel esperado. 🟠 **Naranja (<85dB):** Sistema lejano o con bajo headroom. ⚠️ **Icono advertencia:** Headroom insuficiente.",
        "• **Gain Trim [dB]:** Ajuste sugerido para **Gain Shading**. Objetivo: La torre debe tener +3dB sobre el Main PA en zona de transición.",
        "• **Air Loss (12k) [dB]:** Pérdida atmosférica acumulada a 12 kHz (ISO 9613-1)."
      ]
    },
    {
      id: "atmo-comp-full",
      title: "20. COMPENSACIÓN ATMOSFÉRICA (Gráficas)",
      content: [
        "Este panel tiene dos pestañas: **EQ Correction (Per Tower)** e **Impulse (Time)**.",
        "",
        "**20.1 Pestaña 'EQ Correction (Per Tower)'**",
        "Gráfica de líneas que muestra cuánto boost de alta frecuencia necesita cada sistema para compensar la pérdida atmosférica.",
        "**Interpretación:** Torre @ 60m a 12kHz: +8.5dB. Necesitas aplicar un shelf de +8.5dB en 12kHz en el DSP de la torre para que suene \"igual de brillante\" que el Main PA.",
        "",
        "**20.2 Pestaña 'Impulse (Time)'**",
        "Gráfica de áreas que simula la respuesta impulso temporal del sistema. Muestra el arribo de energía:",
        "• **Main PA** (área cyan): Arribo principal.",
        "• **Subwoofers** (área púrpura): Arribo de graves.",
        "• **Delay Tower** (área naranja): Arribo de la torre de refuerzo.",
        "**Ideal:** Todos alineados temporalmente. Arrivals separados >10ms causan comb filtering."
      ]
    },
    {
      id: "array-health-full",
      title: "21. SALUD DEL ARREGLO (ARRAY FINGERPRINT)",
      content: [
        "Análisis de la configuración de splay angles del line array.",
        "",
        "**21.1 Score (%)**",
        "Puntuación 0-100%:",
        "• 🟢 **>80%:** Configuración óptima.",
        "• 🟠 **50-80%:** Aceptable pero mejorable.",
        "• 🔴 **<50%:** Configuración problemática.",
        "",
        "**21.2 Visualización de Segmentos**",
        "Cada caja se representa como un bloque coloreado:",
        "• 🟢 **Verde (Optimal):** Ángulo dentro del rango (0.5°-6°).",
        "• 🔴 **Rojo (Broken Line / Gap):** Ángulo 0° (gap en cobertura vertical).",
        "• 🟡 **Amarillo (Abrupt Change):** Cambio brusco (>4° de diferencia).",
        "**Ejemplo visual:** [2°][3°][4°][0°][5°] -> La caja #4 tiene gap.",
        "**21.3 Recomendación:** Texto descriptivo con sugerencias tácticas."
      ]
    },
    {
      id: "sub-design-full",
      title: "22. DISEÑO DE SUBGRAVES",
      content: [
        "Panel completo de análisis de subwoofers.",
        "",
        "**22.1 Métricas Superiores**",
        "• **Modo Array:** OMNI, CSA (Cardioide Invertido), End-Fire.",
        "• **Sub SPL (Max) [dB]:** SPL teórico en half-space @ 1 metro (125-140 dB típico).",
        "• **Power Alley [dB]:** SPL en el centro on-axis donde ambos stacks suman (+6dB típico).",
        "• **Rechazo Trasero [dB]:** Atenuación detrás del array (CSA: 10-15dB, End-Fire: 15-25dB).",
        "",
        "**22.2 Ground Effect (Ground Bounce)**",
        "Interferencia entre sonido directo y reflexión del suelo. **Tabla de Cortes (Notches):** Muestra las frecuencias donde el suelo genera nulls (ej: Corte #1: 85 Hz -12.3 dB).",
        "**Solución:** Usar arrays volados (flown) para minimizar el efecto.",
        "",
        "**22.3 Topología Requerida**",
        "• **Polar Plot:** Visualización gráfica del patrón de radiación.",
        "• **Separación Física [m]:** Calculado como λ/4 @ frecuencia objetivo (ej: 1.36m para 63Hz).",
        "• **Delay Electrónico [ms]:** Delay para la fuente trasera (ej: 3.97ms para CSA).",
        "",
        "**22.4 DSP Phase Shift [°]:** Desfase del filtro crossover (LR24 = 360°).",
        "**22.5 Sub Time Align [ms]:** Delay recomendado considerando offset físico, group delay y análisis de fase.",
        "**Badge 'Ø INVERT':** Aparece si se recomienda invertir polaridad para mejorar la suma."
      ]
    },
    {
      id: "elec-eng-full",
      title: "23. INGENIERÍA ELÉCTRICA (Columna Logística)",
      content: [
        "Panel lateral con análisis eléctrico, networking y rigging.",
        "",
        "**23.1 Alertas Críticas**",
        "Banner rojo si hay:",
        "• 🔴 **SOBRECARGA:** Peso array excede 90% SWL.",
        "• 🔴 **PELIGRO ELÉCTRICO:** Sin tierra física verificada.",
        "• 🔴 **DESBALANCE FASES:** Neutro > 20A.",
        "• 🔴 **RED SATURADA:** Dante/AVB > 1Gbps.",
        "• 🔴 **CABLEADO:** Damping Factor < 50.",
        "",
        "**23.2 Power Distribution**",
        "Visualización de Balance de Fases (L1, L2, L3). **Neutral Current:** 🟢 <5A (Ideal), 🔴 >20A (Riesgo).",
        "**Damping Factor:** 🟢 >200 (Excelente), 🟡 100-200 (Bueno), 🔴 <50 (Crítico).",
        "**Voltage Drop [%]:** 🟢 <2% (Aceptable), 🟡 2-5%, 🔴 >5% (Crítico).",
        "**23.3 Network Audio:** Ancho de banda Mbps. Status: \"100Mbps OK\" o \"1Gbps Required\".",
        "**23.4 Kg Total y Cajas:** Peso total del sistema completo."
      ]
    },
    {
      id: "thermo-dynamics-full",
      title: "24. DINÁMICA TÉRMICA & ELÉCTRICA",
      content: [
        "Modela el comportamiento bajo carga continua.",
        "",
        "**24.1 Temp. Bobina Estimada [°C]**",
        "Temperatura tras 2 horas a máxima potencia.",
        "• 🟢 **60-80°C:** Normal.",
        "• 🟡 **80-100°C:** Caliente (compresión moderada).",
        "• 🔴 **>100°C:** Crítico (riesgo de daño).",
        "",
        "**24.2 Compresión Térmica [dB]**",
        "Pérdida de SPL por calor (ej: -2.8 dB).",
        "**24.3 Corriente de Irrupción (Inrush Current) [A]**",
        "Pico al encender (5-10x corriente continua).",
        "⚠️ **IMPORTANTE:** No encender todo a la vez. Usar secuencias de 2-5 segundos."
      ]
    },
    {
      id: "system-architecture-full",
      title: "25. FLUJO DE SEÑAL & ARQUITECTURA DEL SISTEMA",
      content: [
        "Diagramas técnicos en formato ASCII.",
        "",
        "**25.1 Power Flow (Suministro Eléctrico)**",
        "CODE:GENERADOR / ACOMETIDA (45kVA)\n│\n├─ Voltage: 208V\n├─ Phase: 3-Phase\n├─ Total Power: 28.5kW\n↓\nDISTRIBUCIÓN DE FASES\n├─ L1: 45A\n├─ L2: 47A\n├─ L3: 44A\n↓\nAMPLIFIER RACKS (Lab.gruppen PLM 20000Q)",
        "",
        "**25.2 Signal Flow (Cadena de Audio)**",
        "CODE:CONSOLE (DiGiCo Quantum 338)\n↓\nDRIVE PROCESSOR (Lake LM44)\n│\n├─ Matrix Out 1-2 → Main L/R\n├─ Matrix Out 3-4 → Sub L/R\n├─ Matrix Out 5-6 → Frontfills\n├─ Matrix Out 7-8 → Delay Tower L/R\n↓\nDANTE NETWORK (48kHz / 24-bit)\n↓\nAMPLIFIERS → SPEAKERS",
        "",
        "**25.3 Processing Chain (DSP)**",
        "INPUT (Console Main Mix) -> 1. CROSSOVER (80Hz LR24) -> 2. DELAY ALIGNMENT (Main 0ms, Subs +5.32ms, Torre +175ms) -> 3. EQ CORRECTION (Room/Atmospheric) -> 4. GAIN STRUCTURE (Main 0dB, Subs -3dB) -> 5. LIMITERS & SAFETY."
      ]
    }
  ]
};
