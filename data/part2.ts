
import { ManualPart } from '../types';

export const part2: ManualPart = {
  id: "part-2",
  title: "CONFIGURACIÓN COMPLETA DE PROYECTOS",
  sections: [
    {
      id: "env-intro",
      title: "6. ENTORNO Y ATMÓSFERA",
      content: [
        "Esta sección es el fundamento físico de LiveSync Pro. Define las condiciones climáticas y espaciales que alteran la velocidad de propagación, la absorción de frecuencias y la coherencia de fase en tiempo real.",
        "**6.1 Condiciones Básicas (Tab BASIC)**",
        "**A. Temperatura Ambiente**",
        "• **Rango:** -10°C a 50°C. **Unidad:** Celsius (°C).",
        "• **Para qué sirve:** Determina la velocidad del sonido (c). El aire caliente acelera las ondas sonoras.",
        "CODE:c ≈ 331.3 + (0.6 × T)",
        "• **Ejemplo práctico:**",
        "  • Soundcheck a las 2pm: 28°C (c ≈ 348 m/s).",
        "  • Show a las 9pm: 18°C (c ≈ 342 m/s).",
        "  • Diferencia: ~6 m/s. En una torre a 100m, esto genera un **drift de ~1.7ms**, suficiente para crear un eco audible.",
        "• **Cómo usar:** Mide la temperatura actual en el FOH (siempre a la sombra).",
        "",
        "**B. Humedad Relativa**",
        "• **Rango:** 0% a 100%.",
        "• **Para qué sirve:** Afecta la absorción de altas frecuencias (HF).",
        "• **Regla técnica:** El aire seco (< 30%) genera una pérdida masiva de HF (>1dB cada 30m @ 10kHz).",
        "• **Reglas de oro:**",
        "  • **Indoor controlado:** 40-60% (valor típico).",
        "  • **Outdoor verano:** 60-90% (el sonido viaja mejor).",
        "  • **Outdoor invierno/montaña:** 10-30% (requiere ecualización High Shelf agresiva en torres).",
        "",
        "**C. Altitud**",
        "• **Rango:** 0m a 5000m sobre el nivel del mar. **Unidad:** Metros o Pies.",
        "• **Para qué sirve:** Afecta la presión atmosférica y la densidad del aire (ISO 9613-1).",
        "  • Nivel del mar: 101.325 kPa (Presión estándar).",
        "  • 2000m (CDMX): 79 kPa (Menor densidad = menor resistencia).",
        "• **Ciudades de referencia:** 0m (Miami/Río), 500m (Bogotá Aeropuerto), 1500m (Denver), 2600m (Bogotá Ciudad), 3650m (La Paz).",
        "",
        "**D. Viento**",
        "• **Velocidad:** 0 a 30 m/s (0 a 108 km/h).",
        "• **Dirección:** 0° a 360°.",
        "  • **0° = Tailwind:** El viento empuja el sonido hacia el público.",
        "  • **180° = Headwind:** El viento sopla contra el PA.",
        "  • **90°/270° = Crosswind:** Viento lateral (el más peligroso para la fase).",
        "• **Warnings de Seguridad:**",
        "  • 🟡 **10-15 m/s (36-54 km/h):** PELIGRO - Límite de operación estructural.",
        "  • 🔴 **> 15 m/s (> 54 km/h):** CRÍTICO - BAJAR SISTEMA INMEDIATAMENTE.",
        "• **Efectos acústicos:**",
        "  • **Headwind:** Refracción ascendente (crea zonas de sombra acústica).",
        "  • **Tailwind:** Refracción descendente (el sonido llega más lejos).",
        "  • **Crosswind:** Inestabilidad de fase en HF (imposible alinear correctamente).",
        "• **Cómo medir:** Usa apps (Windy), anemómetros portátiles o la observación de banderas (horizontales ≈ 10 m/s)."
      ]
    },
    {
      id: "env-advanced",
      title: "6.2 Condiciones Avanzadas (Tab ADVANCED)",
      content: [
        "**E. Ocupación del Venue (%)**",
        "• **Rango:** 0% a 100%.",
        "• **Función:** Corrige temperatura y humedad por el calor metabólico de la audiencia.",
        "• **Efectos:**",
        "  1. **Aumento de Temp:** Outdoor (+1°C por cada 20% ocupación), Indoor (+5°C con venue lleno).",
        "  2. **Aumento de Humedad:** Outdoor (+5% humedad), Indoor (+20% con venue lleno).",
        "  3. **Absorción Adicional:** Los cuerpos humanos absorben HF (4-8kHz) y bloquean el paso de graves cerca del suelo.",
        "",
        "**F. Drift Térmico (Predicción)**",
        "• **Propósito:** Predecir cuánto cambiarán los delays sin tener que volver a medir en campo.",
        "• **Proceso:** Configura el sistema a la hora del Soundcheck e ingresa la temperatura esperada del Show. LiveSync calculará el nuevo delay compensado."
      ]
    },
    {
      id: "env-venue",
      title: "6.3 Configuración de Venue (Tab VENUE)",
      content: [
        "**G. Tipo de Venue**",
        "TABLE:Aspecto | Indoor (Cerrado) | Outdoor (Abierto)",
        "Reverberación | RT60 Calculado / Medido | RT60 = 0 (Campo Libre)",
        "Viento | Ignorado | Crítico (Refracción)",
        "Ground Effect | Menor impacto | Mayor impacto",
        "Reflexiones | Image Source Method | Solo reflexión del piso",
        "",
        "**H. Layout del Escenario**",
        "1. **Proscenium (Estándar Frontal) ✅:** Público frente al escenario. PA L/R o Mono Central.",
        "2. **Arena 360° (N/S/E/W):** Escenario central, público 360°. Requiere 4 arreglos PA y multiplica logística x4.",
        "3. **Teatro Circular / In-the-Round:** Escenario central redondo con cluster central o 4 caras.",
        "4. **Thrust (Pasarela en T):** Escenario con extensión hacia el público. Requiere Side Fills dedicados.",
        "5. **Traverse (Pasarela Central):** Público enfrentado a los costados del escenario."
      ]
    },
    {
      id: "env-acoustics",
      title: "6.4 Acústica de Sala (Solo Indoor)",
      content: [
        "**I. Dimensiones de la Sala**",
        "• **Largo, Ancho, Alto:** En metros. LiveSync calcula el volumen (V = L × W × H) e identifica **Modos Propios** (resonancias) entre 20-200Hz.",
        "",
        "**J. Material de Paredes**",
        "• **Concreto:** α = 0.02 (muy reflectivo).",
        "• **Ladrillo:** α = 0.03.",
        "• **Drywall / Pladur:** α = 0.05.",
        "• **Madera:** α = 0.10.",
        "• **Cortinaje Pesado:** α = 0.40 (más absorbente).",
        "",
        "**K. Material de Techo**",
        "• **Concreto:** Muy reflectivo. **Cielo Acústico:** Absorbente. **Metal:** Reflectivo. **Madera:** Moderadamente absorbente.",
        "",
        "**L. RT60 Medido en Campo (Checkbox)**",
        "Si dispones de una medición real del tiempo de reverberación, puedes anular el cálculo teórico del software.",
        "**Cómo activar:**",
        "1. Marca el checkbox **'Usar RT60 Medido en Campo'**.",
        "2. Ingresa el valor obtenido en segundos (ej: 1.45s) correspondiente a la banda de **1kHz**.",
        "3. LiveSync ignorará los materiales de paredes/techo y usará este valor real para los cálculos de inteligibilidad (STI).",
        "**Métodos de medición válidos:**",
        "• **SMAART/REW:** Análisis de Respuesta al Impulso para leer RT60 @ 1kHz.",
        "• **Método del Globo:** Explotar un globo de 30cm a 2-3m de altura y analizar el decaimiento de -60dB.",
        "• **Clap/Pistola:** Uso de aplauso fuerte o pistola de fogueo para medir caída de 60dB.",
        "• **Ubicación:** Realiza la medición siempre en la **Posición de FOH** para resultados representativos."
      ]
    }
  ]
};
