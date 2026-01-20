
import { ManualPart } from '../types';

export const part3: ManualPart = {
  id: "part-3",
  title: "PARTE 3: DISEÑO DE SISTEMAS Y CONTROL",
  sections: [
    {
      id: "pa-system",
      title: "7. SISTEMA PRINCIPAL (PA)",
      content: [
        "Configura el arreglo principal de altavoces.",
        "**7.1 Configuración Básica**",
        "• **A. L/R:** Stereo o Mono/Center Array.",
        "• **B. Modelo Main (Top):** Catálogo de 200+ modelos (L-Acoustics, d&b, Meyer, JBL, Adamson, RCF). Incluye SPL máx, dispersión, sensibilidad y peso.",
        "• **C. Cajas por Lado:** 1 a 24. Estándar 8-12. Festivales 14-18. Warning si >16 cajas (Verifique rigging).",
        "• **D. Altura del Array (m):** Centro acústico. Típico 8-12m. Afecta ground effect y slant distance.",
        "• **E. Ancho Escenario:** Distancia entre arreglos L/R. Fórmula óptima: FOH Dist ≈ 1.5 × Stage Width.",
        "",
        "**7.2 Subwoofer Array Designer**",
        "**F. Modelo Sub:** KS28, 1100-LFC, SL-SUB, B28, etc.",
        "**G. Topología / Modo:**",
        "1. **Omnidireccional:** Radiación 360°. Problema: Spill masivo al escenario.",
        "2. **Cardioide Invertido (CSA):** 2 frente + 1 atrás invertido (ratio 2:1). Rechazo trasero ~15dB. Uso: Orquestas, Pop.",
        "3. **End-Fire Line:** Fila india con delays progresivos. Máximo throw y rechazo ~12-20dB. Uso: EDM/Festivales.",
        "**H. Cantidad Total:** Típico 8-16 (Small/Medium), 24-48 (Festivales). LiveSync calcula espaciado λ/4 y delays.",
        "",
        "**7.3 Frontfills & Outfills**",
        "• **Frontfills:** Speakers en el lip del escenario para primeras filas (0-5m).",
        "• **Outfills:** Arreglos laterales para cobertura exterior (>30m ancho)."
      ],
      subsections: [
        {
          title: "7.4 Ángulos de Separación (Splay Angles)",
          content: [
            "**K. Editor de Splay:** Campo CSV. El número de ángulos debe ser **1 menos** que el número de cajas.",
            "**L. Presets Rápidos:**",
            "1. **0° (Tiro Largo):** Array recto. Uso throw extremo >80m.",
            "2. **J-Shape:** Progresión logarítmica. Cobertura uniforme.",
            "3. **Arco Constante:** Ángulos iguales (2-3°). Cobertura corta."
          ]
        }
      ]
    },
    {
      id: "stage-world",
      title: "8. MONITORES Y ESCENARIO (STAGE WORLD)",
      content: [
        "**8.1 Pisos (Wedges)**",
        "• Modelo: X15 HiQ, M2, MJF-212A, VTX M22. Qty típica: 6-10 wedges. Mezclas: 6-8 (Estándar), 12-16 (Grandes).",
        "",
        "**8.2 Sidefills**",
        "• Altavoces potentes laterales. Cobertura general para toda la banda. Qty: 2-4 cajas.",
        "",
        "**8.3 IEMs (In-Ears)**",
        "• Cantidad de sistemas (5-10). Tipo: Stereo (Inmersivo) o Mono (Bajo bandwidth RF)."
      ]
    },
    {
      id: "foh-control",
      title: "9. CONTROL FOH & DRIVE",
      content: [
        "**9.1 Consola FOH**",
        "• Qty: 1 o 2 (Redundante). Modelos: DiGiCo, Avid, Yamaha, Allen & Heath.",
        "",
        "**9.2 Drive Processor**",
        "• El 'cerebro' PA: Lake LM44, Meyer Galaxy, Outline Newton, Prodigy.MP.",
        "",
        "**9.3 Modo de Operación**",
        "• Main Only, Main+Backup, FOH+Monitors (Separados), Split A/B (Festivales), Broadcast Feed.",
        "",
        "**9.4 Transporte / Snake**",
        "1. **Fibra:** Distancias ilimitadas, inmune EMI/RFI. Path A/B.",
        "2. **Digital CAT6:** Límite 100m. Dante/AES50.",
        "3. **Analógico:** Multicore cobre. Pérdida HF >50m.",
        "4. **Híbrido:** Digital + Respaldo Analógico."
      ]
    }
  ]
};
