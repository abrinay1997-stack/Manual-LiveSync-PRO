
import { ManualPart } from '../types';

export const part6: ManualPart = {
  id: "part-6",
  title: "PARTE 6: EXPORTACIÓN Y FLUJO FINAL",
  sections: [
    {
      id: "export-buttons",
      title: "26. BOTONES DE EXPORTACIÓN Y VISUALIZACIÓN",
      content: [
        "Ubicados en la parte superior del Reporte Técnico:",
        "**26. Botón '3D'**",
        "Activa visualización tridimensional geométrica. Colores: Cyan (Main), Púrpura (Subs), Naranja (Delays). Útil para validar geometría y separaciones L/R.",
        "",
        "**27. Botón 'COPY'**",
        "Copia el reporte en texto plano al portapapeles. Incluye Specs, Ambiente, Delays, Eléctrica y Logística. Uso: Email, Slack, Notion.",
        "",
        "**28. Botón 'PDF'**",
        "Genera Technical Rider de 10 páginas con diseño completo y gráficas. Tiempo gen: 3-8s. Nombre: LiveSync_Pro_Report_[Nombre]_[Fecha].pdf.",
        "",
        "**29. Botón 'CAD' (DXF)**",
        "Descarga planta geométrica compatible con AutoCAD, SketchUp. Escala 1:1. Capas: STAGE, MAIN_PA, SUBWOOFERS, DELAY_TOWERS, DIMENSIONS.",
        "",
        "**30. Botón 'Volver a Configuración'**",
        "Regresa a la vista anterior para iterar. Los resultados se mantienen guardados."
      ]
    },
    {
      id: "workflow-summary",
      title: "31. FLUJO TÍPICO DE USO (RESUMEN)",
      content: [
        "1. **Acceso:** Inicia sesión y ve al Hub.",
        "2. **Crear:** Proyecto nuevo (Nombre/Cliente).",
        "3. **Configuración:** Entorno, PA, Subs, Monitores, Control, Objetivos, Infra.",
        "4. **Calcular:** Clic en 'CALCULAR SISTEMA'.",
        "5. **Revisar:** Analiza Reporte, alertas y gráficas.",
        "6. **Exportar:** PDF (Rider), CAD (Plano), Copy (Specs).",
        "7. **Iterar:** Volver a configuración si hay alertas (ej: damping bajo).",
        "8. **Implementación:** Programar Delay Time y Gain Trim en el DSP real.",
        "9. **Validación:** Verifica en campo con SMAART/REW."
      ]
    },
    {
      id: "advanced-tips",
      title: "32. CONSEJOS AVANZADOS",
      content: [
        "**32.1 Mejorar Precisión:**",
        "• Usa RT60 medido (Método globo ISO 3382).",
        "• Valida SWL real con el rigger.",
        "• Usa amps de catálogo para Power Factor preciso.",
        "**32.2 Eventos Complejos:**",
        "• Arena 360°: 4 torres equidistantes.",
        "• Viento >20km/h: Activa cálculo de refracción.",
        "• Indoor Reverberante: Prioriza torres delay sobre subir SPL Main PA.",
        "• Multi-stage: Crea proyecto por escenario y coordina delays para bleed control."
      ]
    },
    {
      id: "support-resources",
      title: "33. SOPORTE Y RECURSOS",
      content: [
        "• **? Ayuda:** Guías rápidas y referencias en cada sección.",
        "• **Soporte:** https://support.livesyncpro.com/ para tickets y video tutoriales.",
        "• **Referencias:** Papers AES, Normas ISO 9613, literatura WST y RT60."
      ]
    }
  ]
};
