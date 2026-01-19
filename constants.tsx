
import { ManualPart } from './types';

export const MANUAL_DATA: ManualPart[] = [
  {
    id: "part-1",
    title: "PARTE 1: INTRODUCCIÓN Y HUB DE PROYECTOS",
    sections: [
      {
        id: "intro",
        title: "1. BIENVENIDA A LIVESYNC PRO",
        content: [
          "LiveSync Pro es una plataforma web profesional que permite a ingenieros de audio diseñar, calcular y optimizar sistemas completos de sonido para eventos en vivo. La aplicación combina física acústica avanzada, modelado atmosférico y cálculos de ingeniería para generar reportes técnicos profesionales (Technical Riders) con precisión científica.",
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
        title: "2. ACCESO A LA PLATAFORMA",
        content: [
          "2.1 Registro e Inicio de Sesión",
          "Al ingresar a https://livesyncpro.com verás la Landing Page con información sobre las características de la plataforma.",
          "**Para comenzar:**",
          "1. Haz clic en el botón **'Iniciar Sesión'** (esquina superior derecha)",
          "2. Selecciona tu método de autenticación:",
          "• **Google OAuth** (Recomendado - Login rápido con tu cuenta de Google)",
          "• **Email/Password** (Registro manual con correo electrónico)"
        ],
        subsections: [
          {
            title: "2.2 Planes de Suscripción",
            content: [
              "LiveSync Pro ofrece diferentes planes según tus necesidades:",
              "TABLE:Plan | Precio | Características",
              "Trial | Gratis | 0 Proyectos, solo añadido a la base de datos",
              "Standard | $99/año | Proyectos ilimitados, exportación PDF/CAD",
              "Corporate | $499/año | Gestión de equipos (5 licencias), proyectos compartidos",
              "Partner | Personalizado | Licencias custom para empresas",
              "",
              "**Estado de Suscripción:**",
              "• 🟢 **Activo:** Acceso completo a todas las funciones",
              "• 🔴 **Expirado:** Requiere renovación (solo lectura de proyectos)",
              "Tu estado de suscripción se muestra en la esquina superior derecha de la aplicación."
            ]
          }
        ]
      },
      {
        id: "hub",
        title: "3. HUB DE PROYECTOS (PROJECT HUB)",
        content: [
          "Una vez autenticado, llegarás al Project Hub, el centro de comando de LiveSync Pro donde gestionas todos tus proyectos.",
          "3.1 Interfaz del Hub",
          "El Hub se divide en cuatro secciones principales:",
          "**A. Encabezado Superior**",
          "• **Título 'Project Hub'** - Identificación de la vista actual",
          "• **Widget de Equipo** - Muestra si estás en un equipo (más detalles en sección 4)",
          "• **Barra de búsqueda** - Busca proyectos por nombre o cliente",
          "• **Botón de sincronización ⟳** - Sincroniza con la nube (Supabase)",
          "• **Botón 'Nuevo Proyecto'** - Crea un proyecto nuevo",
          "",
          "**B. Grilla de Proyectos**",
          "Cada tarjeta de proyecto muestra:",
          "• **Nombre del Proyecto** (Ej: 'Festival Estéreo Picnic 2025')",
          "• **Cliente** (opcional, Ej: 'Live Nation')",
          "• **Tipo de Proyecto:**",
          "  • 🔒 **PRIV** (Privado) - Solo visible para ti",
          "  • 👥 **TEAM** (Compartido) - Visible para todo tu equipo (fondo morado)",
          "• **Estadísticas Rápidas:**",
          "  • 🔊 **Sistema** - Modelo de PA (Ej: 'L-Acoustics K2')",
          "  • 📐 **Layout** - Configuración de escenario (Frontal, Arena 360, Thrust)",
          "• **Fecha de modificación** - Última vez que editaste el proyecto",
          "• **Menú contextual ⋮** - Opciones de renombrar, duplicar, compartir, eliminar"
        ],
        subsections: [
          {
            title: "3.2 Crear un Proyecto Nuevo",
            content: [
              "**Paso a paso:**",
              "1. Haz clic en el botón **'Nuevo Proyecto'** (cyan, esquina superior derecha)",
              "2. Se abrirá un modal con el formulario:",
              "**Campo 1: Nombre del Evento / Proyecto (Obligatorio)**",
              "• Ingresa el nombre descriptivo del evento",
              "• Ejemplos:",
              "  • 'Festival Estéreo Picnic 2025'",
              "  • 'Concierto Shakira - Gira Mundial'",
              "  • 'Corporate Event BMW - Lanzamiento X5'",
              "**Campo 2: Cliente (Opcional)**",
              "• Nombre de la empresa o cliente que contrata",
              "• Ejemplos: 'Live Nation', 'Parque Jaime Duque', 'BMW Colombia'",
              "**Campo 3: Compartir con el Equipo (Solo si estás en un equipo)**",
              "• ☑ **Activado:** El proyecto será visible para todos los miembros de tu equipo",
              "• ☐ **Desactivado:** El proyecto será privado (solo tú lo verás)",
              "**Nota:** Si no tienes un equipo creado, este checkbox no aparecerá.",
              "3. Haz clic en **'Crear Proyecto'**",
              "4. El proyecto aparecerá en el Hub y se abrirá automáticamente en la vista de configuración"
            ]
          },
          {
            title: "3.3 Gestionar Proyectos Existentes",
            content: [
              "**A. Abrir un Proyecto**",
              "• Haz clic en cualquier parte de la tarjeta del proyecto",
              "• El proyecto se cargará en la **Vista de Configuración**",
              "",
              "**B. Buscar Proyectos**",
              "• Usa la barra de búsqueda (ícono 🔍 arriba a la derecha)",
              "• Escribe el nombre del proyecto o cliente",
              "• La grilla se filtrará en tiempo real",
              "",
              "**C. Menú Contextual de Proyecto**",
              "Haz clic en el ícono ⋮ (tres puntos verticales) en cualquier tarjeta de proyecto para abrir el menú contextual.",
              "Opciones disponibles:",
              "1. 📝 **Renombrar**",
              "   • Cambia el nombre del proyecto",
              "   • Abre un modal donde ingresas el nuevo nombre",
              "   • Confirma con 'Guardar'",
              "2. 🔒 **Compartir con Equipo / Hacer Privado**",
              "   • Solo visible si estás en un equipo Y eres el creador del proyecto",
              "   • **Compartir:** El proyecto se vuelve visible para todos los miembros del equipo",
              "   • **Hacer Privado:** El proyecto vuelve a ser solo tuyo",
              "   • **Indicador visual:** Los proyectos compartidos tienen un fondo morado y badge 'TEAM'",
              "3. 📄 **Duplicar**",
              "   • Crea una copia exacta del proyecto con todos sus cálculos",
              "   • El duplicado se nombra automáticamente: '[Nombre Original] - Copia'",
              "   • Útil para crear variantes de diseño sin perder el original",
              "4. 🗑️ **Eliminar**",
              "   • Elimina permanentemente el proyecto",
              "   • ⚠️ **ADVERTENCIA:** Esta acción NO se puede deshacer",
              "   • Abre un modal de confirmación con advertencia en rojo",
              "   • Debes confirmar 'Eliminar Definitivamente' para proceder"
            ]
          },
          {
            title: "3.4 Sincronización en la Nube",
            content: [
              "LiveSync Pro utiliza **Supabase** (PostgreSQL en la nube) para sincronizar tus proyectos.",
              "**¿Cómo funciona?**",
              "• **Auto-guardado:** Cada cambio se guarda automáticamente cada 2 segundos",
              "• **Sincronización bidireccional:** Los cambios locales se suben a la nube y los cambios de la nube se descargan a tu dispositivo",
              "• **Indicador de estado:**",
              "  • 🟢 **Sincronizado** - Todos los cambios están guardados",
              "  • 🔵 **Sincronizando...** - Guardando cambios en la nube",
              "  • 🔴 **Error de conexión** - No se pudo conectar a la nube",
              "",
              "**Sincronización Manual:**",
              "• Haz clic en el botón ⟳ (refresh) en el Hub",
              "• El ícono girará mientras sincroniza",
              "• Útil si:",
              "  • Trabajas desde múltiples dispositivos",
              "  • Otros miembros del equipo editaron proyectos",
              "  • Quieres forzar una actualización"
            ]
          }
        ]
      },
      {
        id: "teams",
        title: "4. GESTIÓN DE EQUIPOS (PLAN CORPORATIVO)",
        content: [
          "4.1 ¿Qué es un Equipo?",
          "Un **Equipo** (Team) permite colaboración entre múltiples ingenieros de audio bajo una misma licencia Corporativa ($499/año).",
          "**Beneficios:**",
          "• ✅ Comparte proyectos con hasta 5 personas",
          "• ✅ Visibilidad en tiempo real de cambios",
          "• ✅ Gestión centralizada de licencias",
          "• ✅ Ideal para empresas de producción o rental houses"
        ],
        subsections: [
          {
            title: "4.2 Crear un Equipo",
            content: [
              "**Requisitos:**",
              "• Debes tener una suscripción **Corporate** activa",
              "• No puedes estar ya en un equipo (solo 1 equipo por cuenta)",
              "**Paso a paso:**",
              "1. En el Hub, haz clic en **'Crear Equipo'**",
              "   • Si no tienes plan Corporate, se abrirá el modal de upgrade con pago PayPal",
              "2. Se generará un **código único de equipo**",
              "   • Formato: team_abc123xyz (alfanumérico aleatorio)",
              "   • Este código es **irrecuperable**, guárdalo en un lugar seguro",
              "3. Tu rol automáticamente será **'Owner'** (Propietario)",
              "   • Solo el Owner puede: Invitar/expulsar miembros, Disolver el equipo, Ver el código de invitación",
              "4. Widget de Equipo aparecerá en el Hub",
              "   • Muestra el código del equipo",
              "   • Botón 'Gestionar (1/5)' - Indica miembros actuales"
            ]
          },
          {
            title: "4.3 Invitar Miembros al Equipo",
            content: [
              "**Paso a paso:**",
              "1. El Owner comparte el código del equipo (Ejemplo: team_abc123xyz)",
              "2. El invitado va al Hub y hace clic en **'Unirse'**",
              "3. Ingresa el código del equipo en el prompt",
              "4. Su cuenta se vincula al equipo inmediatamente",
              "   • Su suscripción cambia a 'Corporate' (heredada del Owner)",
              "   • Puede ver proyectos compartidos del equipo",
              "   • Su rol será 'Member' (Miembro)",
              "**Límite:** Máximo 5 personas por equipo (1 Owner + 4 Members)"
            ]
          },
          {
            title: "4.4 Gestionar Miembros (Solo Owner)",
            content: [
              "**Acceso al Panel de Gestión:**",
              "1. Haz clic en **'Gestionar (X/5)'** en el widget de equipo",
              "2. Se abre el modal **'Gestión de Equipo'** con:",
              "   • Código del equipo (copiable con un clic)",
              "   • Lista de miembros con: Avatar, Email completo, Rol, Botón de expulsión 🚫",
              "**3. Expulsar un Miembro:**",
              "   • Haz clic en el ícono 🚫 junto al miembro",
              "   • **Efecto inmediato:** El miembro pierde acceso, su suscripción vuelve a 'Expired', el Owner recupera 1 licencia."
            ]
          },
          {
            title: "4.5 Salir de un Equipo (Member)",
            content: [
              "Si eres Member y quieres salir del equipo:",
              "1. Haz clic en el ícono de salida 🚪 en el widget de equipo",
              "2. Se abre un modal de advertencia:",
              "   • ⚠️ 'Al salir del equipo, perderás inmediatamente el acceso a la licencia Corporativa'",
              "   • Tu cuenta volverá a 'Expired'",
              "3. Confirma 'Sí, Salir y Perder Acceso'"
            ]
          },
          {
            title: "4.6 Disolver un Equipo (Solo Owner)",
            content: [
              "Si eres Owner y quieres eliminar el equipo:",
              "1. En el modal 'Gestión de Equipo', haz clic en **'Disolver Equipo Permanentemente'**",
              "2. Se abre un modal de advertencia crítica:",
              "   • ⚠️ Todos los miembros serán expulsados",
              "   • ⚠️ Los proyectos compartidos volverán a ser privados",
              "   • ⚠️ El equipo será eliminado permanentemente",
              "3. Confirma 'Sí, Disolver Equipo'",
              "**Nota:** Disolver un equipo es **irreversible**."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "part-2",
    title: "PARTE 2: CONFIGURACIÓN COMPLETA DE PROYECTOS",
    sections: [
      {
        id: "interface-nav",
        title: "5. INTERFAZ PRINCIPAL Y NAVEGACIÓN",
        content: [
          "Una vez abierto un proyecto, entras a la **Vista de Configuración** (Configuration View).",
          "5.1 Estructura de la Interfaz",
          "**A. Barra Superior (Header)**",
          "• **Logo LiveSync Pro** - Haz clic para volver al Hub",
          "• **Nombre del Proyecto** - Editable con doble clic",
          "• **Botones de Acción:**",
          "  • **? Ayuda** - Abre el panel de Base de Conocimiento",
          "  • **Calcular Sistema** - Ejecuta la simulación",
          "  • **Cerrar ✖** - Vuelve al Hub",
          "",
          "**B. Panel Izquierdo: Configuración**",
          "• Pestañas de configuración (BASIC, ADVANCED, VENUE)",
          "• Formularios con todos los parámetros del sistema",
          "",
          "**C. Panel Derecho: Resultados**",
          "• Aparece después de hacer clic en 'Calcular Sistema'",
          "• Muestra reporte técnico completo y botones de exportación (PDF, CAD, 3D)"
        ],
        subsections: [
          {
            title: "5.2 Sistema de Ayuda (?)",
            content: [
              "LiveSync Pro incluye un **sistema de ayuda contextual** completo.",
              "**A. Botón Principal '? Ayuda'**",
              "• Ubicación: Esquina superior derecha. Color: Cyan brillante.",
              "",
              "**B. Panel de Base de Conocimiento**",
              "Panel lateral deslizable estructurado en:",
              "1. **Encabezado:** Ícono de libro 📖, Título del tema, Subtítulo.",
              "2. **Sección: Concepto Básico (Verde esmeralda)**",
              "   • Explicación simple y práctica para principiantes.",
              "3. **Sección: Ingeniería Avanzada (Morado)**",
              "   • Explicación técnica detallada, fórmulas, estándares ISO/IEC.",
              "4. **Sección: Pro Tip (Cyan, opcional)**",
              "   • Consejos de expertos y trucos para optimizar cálculos.",
              "5. **Footer:** Botones de Referencias Científicas y Soporte.",
              "",
              "**C. Íconos de Ayuda Contextuales (?)**",
              "Encontrarás pequeños íconos ? junto a casi todos los controles.",
              "1. Haz clic en el ícono ? (círculo cyan pequeño)",
              "2. Se abre el Panel de Conocimiento con el tema correspondiente"
            ]
          },
          {
            title: "5.3 Referencias Científicas",
            content: [
              "Ubicado dentro del Panel de Ayuda (ícono de átomo ⚛️).",
              "**Contenido del Modal:**",
              "• **A. Papers Académicos (AES, IoA):** Lista de papers citados.",
              "• **B. Estándares Internacionales:** ISO 9613-1, ISO 3382, IEC 60268-16, etc.",
              "• **C. Manuales de Software:** EASE Focus, Soundvision.",
              "• **D. Libros Clásicos:** Beranek, Everest, McCarthy.",
              "**Propósito:** Validación científica y transparencia en las fórmulas usadas."
            ]
          },
          {
            title: "5.4 Soporte Técnico",
            content: [
              "Ícono de salvavidas 🛟. Al hacer clic:",
              "• Se abre una nueva ventana: https://support.livesyncpro.com/",
              "• Encontrarás: Chat en vivo, FAQ, Tutoriales en video, Reporte de bugs."
            ]
          }
        ]
      },
      {
        id: "env-atmo",
        title: "6. ENTORNO Y ATMÓSFERA",
        content: [
          "Sección que define las condiciones climáticas y físicas que afectan la propagación del sonido.",
          "6.1 Condiciones Básicas (Tab BASIC)",
          "**A. Temperatura Ambiente**",
          "• **Rango:** -10°C a 50°C. **Unidad:** Celsius (°C)",
          "• **Para qué sirve:** Determina la velocidad del sonido",
          "• **Fórmula:** c ≈ 331.3 + (0.6 × T)",
          "• **Ejemplo:** 20°C → 343 m/s | 30°C → 349 m/s",
          "• **Impacto:** La temperatura afecta directamente los tiempos de delay calculados.",
          "",
          "**B. Humedad Relativa**",
          "• **Rango:** 0% a 100%",
          "• **Para qué sirve:** Afecta la absorción de altas frecuencias",
          "• **Regla de oro:** Aire seco (< 30%) causa pérdida masiva de HF (>1dB cada 30m @ 10kHz).",
          "",
          "**C. Altitud**",
          "• **Rango:** 0m a 5000m snm. **Unidad:** Metros o Pies.",
          "• **Para qué sirve:** Afecta la presión atmosférica y densidad del aire (ISO 9613-1).",
          "• **Referencia:** Ciudad de México (2000m) tiene menor densidad que el nivel del mar (101.325 kPa).",
          "",
          "**D. Viento**",
          "• **Velocidad:** 0 a 30 m/s. **Dirección:** 0° a 360°.",
          "  • 0° = Tailwind (empuja sonido al público)",
          "  • 180° = Headwind (sopla contra el PA)",
          "  • 90°/270° = Crosswind (lateral)",
          "• **Warnings:** 10-15 m/s (PELIGRO), > 15 m/s (CRÍTICO - BAJAR PA)."
        ],
        subsections: [
          {
            title: "6.2 Condiciones Avanzadas (Tab ADVANCED)",
            content: [
              "**E. Ocupación del Venue (%)**",
              "• **Para qué sirve:** Corrige temperatura y humedad por calor corporal",
              "• **Efectos:** Outdoor (+1°C cada 20% ocupación), Indoor (+5°C venue lleno).",
              "",
              "**F. Drift Térmico (Predicción)**",
              "• **Temperatura Soundcheck:** Actual (ej: 28°C)",
              "• **Temperatura Show:** Esperada (ej: 18°C)",
              "• **Proceso:** LiveSync predice cuánto cambiarán los delays para actualizarlos antes del show sin volver a medir.",
              "• **Ejemplo:** Torre @ 100m, Δ10°C causa un drift de +1.7ms."
            ]
          },
          {
            title: "6.3 Configuración de Venue (Tab VENUE)",
            content: [
              "**G. Tipo de Venue**",
              "• **Indoor:** Recinto cerrado. Reverberación RT60 calculada.",
              "• **Outdoor:** Espacio abierto. Viento crítico, mayor impacto de ground effect.",
              "",
              "**H. Layout del Escenario**",
              "Define la topología del sistema:",
              "1. **Proscenium (Estándar Frontal):** Más común. Público enfrente.",
              "2. **Arena 360° (N/S/E/W):** Escenario central, multiplica logística x 4.",
              "3. **Teatro Circular:** Escenario central redondo, cluster central.",
              "4. **Thrust:** Pasarela en T, requiere Side Fills.",
              "5. **Traverse:** Público enfrentado a los lados."
            ]
          },
          {
            title: "6.4 Acústica de Sala (Solo Indoor)",
            content: [
              "Aparece si seleccionas Venue Type: Indoor.",
              "**I. Dimensiones de la Sala:** Largo, Ancho, Alto (Metros).",
              "• **Para qué sirve:** Calcula volumen, modos de sala (20-200Hz) y RT60 teórico.",
              "**J. Material de Paredes:** Concreto (α=0.02), Ladrillo (α=0.03), Drywall (α=0.05).",
              "**K. Material de Techo:** Concreto, Cielo Acústico (Absorbente), Madera.",
              "**L. RT60 Medido en Campo:** Permite anular el cálculo teórico ingresando un valor medido (SMAART, globo)."
            ]
          }
        ]
      },
      {
        id: "pa-system",
        title: "7. SISTEMA PRINCIPAL (PA)",
        content: [
          "Configuración del arreglo principal de altavoces (Line Array o Point Source).",
          "7.1 Configuración Básica",
          "**A. Configuración L/R:** Stereo (Estándar) o Mono / Center Array.",
          "**B. Modelo Main (Top):** Catálogo de 200+ modelos (L-Acoustics K1/K2, d&b GSL, Meyer Panther, etc).",
          "• Incluye: SPL máx, Dispersión nominal, Sensibilidad, Peso.",
          "**C. Cajas Main por Lado:** Rango 1 a 24. Estándar: 8-12 cajas. Warning si > 16 cajas.",
          "**D. Altura del Array (m):** Altura desde el suelo al centro acústico (Típico 8-12m).",
          "**E. Ancho del Escenario (m):** Distancia entre arreglos L/R. Recomendado: 12-20m."
        ],
        subsections: [
          {
            title: "7.2 Subwoofer Array Designer",
            content: [
              "**F. Modelo de Subwoofer:** Catálogo disponible (KS28, 1100-LFC, SL-SUB, etc).",
              "**G. Topología / Modo:**",
              "1. **Omnidireccional:** Radiación 360°, máxima eficiencia frontal.",
              "2. **Cardioide Invertido (CSA):** 2 frente + 1 atrás invertido. Rechazo trasero ~15dB.",
              "3. **End-Fire Line:** Fila india con delays progresivos. Máximo tiro.",
              "**H. Cantidad Total Subs:** Típico 8-16 (Small/Medium), 24-48 (Festivales)."
            ]
          },
          {
            title: "7.3 Frontfills & Outfills",
            content: [
              "Sistemas de cobertura complementaria.",
              "• **Frontfills:** Pequeños altavoces en el lip del escenario (0-5m).",
              "• **Outfills:** Arreglos laterales para zonas fuera del ángulo horizontal del PA principal."
            ]
          },
          {
            title: "7.4 Ángulos de Separación (Splay Angles)",
            content: [
              "Define la curvatura del Line Array.",
              "**K. Editor de Splay:** Campo CSV (ej: 0, 0.5, 1, 2, 3). El número de ángulos debe ser **1 menos** que el número de cajas.",
              "**L. Presets Rápidos:**",
              "1. **0° (Tiro Largo):** Array completamente recto.",
              "2. **J-Shape:** Progresión logarítmica (profesional).",
              "3. **Arco Constante:** Todos los ángulos iguales (2-3°)."
            ]
          }
        ]
      },
      {
        id: "monitors",
        title: "8. MONITORES Y ESCENARIO (STAGE WORLD)",
        content: [
          "8.1 Pisos (Wedges)",
          "• **Modelo:** Catálogo Pro (X15 HiQ, M2, MJF-212A).",
          "• **Cantidad:** Típico 6-10 wedges.",
          "• **Mezclas:** Estándar 6-8 mixes.",
          "",
          "8.2 Sidefills",
          "• Altavoces potentes laterales para cobertura general de la banda.",
          "",
          "8.3 IEMs (In-Ears)",
          "• Sistemas inalámbricos. Estéreo (Inmersivo) o Mono (Bajo bandwidth RF)."
        ]
      },
      {
        id: "control-drive",
        title: "9. CONTROL FOH & DRIVE",
        content: [
          "9.1 Consola FOH",
          "• **Cantidad:** 1 (Estándar) o 2 (Backup redundant).",
          "• **Modelos:** Small Format (X32, M32), Pro Standard (dLive, CL5), High-End (Quantum 338, S6L).",
          "",
          "9.2 Drive Processor",
          "• El 'cerebro' del sistema PA: Lake LM44/26, Meyer Galaxy, Outline Newton, Prodigy.MP.",
          "",
          "9.3 Modo de Operación",
          "• Main Only, Main + Backup, FOH + Monitors (Separados), Split A/B (Festivales), Broadcast Feed.",
          "",
          "9.4 Transporte / Snake",
          "• Fibra Óptica (Optocore), Digital CAT6 (Dante/AES50), Analógico (Multicore), Híbrido."
        ]
      }
    ]
  },
  {
    id: "part-3",
    title: "PARTE 3: CÁLCULOS Y ANÁLISIS CIENTÍFICO",
    sections: [
      {
        id: "calc-objectives",
        title: "10. OBJETIVOS DE CALIBRACIÓN",
        content: [
          "Panel que define las metas acústicas del sistema.",
          "10.1 Asistente de Objetivos (Presets)",
          "• **Corporativo:** 95dB @ 25m.",
          "• **Concierto:** 102dB @ 35m.",
          "• **Festival:** 105dB @ 50m.",
          "",
          "10.2 Offset Físico Subs (m)",
          "• Distancia física entre Tops y Subwoofers. Crítico para alineación de fase.",
          "",
          "10.3 Frecuencia de Crossover (Hz)",
          "• Típicamente 80-100 Hz.",
          "",
          "10.4 Tipo de Filtro DSP",
          "• **LR24:** Estándar (+6dB fase). **BW24/12:** Diferentes pendientes.",
          "",
          "10.5 SPL Objetivo (dB A-Weighted)",
          "• Nivel de presión sonora deseado (LEQ promedio)."
        ]
      },
      {
        id: "delay-towers",
        title: "11. TORRES DE DELAY",
        content: [
          "Sistemas de refuerzo para zonas alejadas u obstruidas.",
          "11.2 Parámetros:",
          "• **Nombre:** ID único (ej: 'Torre Centro').",
          "• **Distancia (m):** Distancia horizontal desde el PA.",
          "• **Altura Relativa (m):** Diferencia de altura respecto al PA principal.",
          "• **Slant Distance:** LiveSync usa Pitágoras (√(D²+H²)) para el delay real.",
          "• **Cajas:** Elementos por array en la torre.",
          "11.3 Cálculos Automáticos:",
          "• Delay Time (ms), SPL en Objetivo, Gain Trim (Gain Shading), Atmospheric Loss."
        ]
      },
      {
        id: "infra-sec",
        title: "12. INFRAESTRUCTURA, RED Y SEGURIDAD",
        content: [
          "12.1 Energía",
          "• **Voltaje:** 110V/120V/208V (US) o 220V/230V/240V (EU/Latam).",
          "• **Calibre Cable (Gauge):** 12 AWG (Estándar Pro), 10 AWG (Heavy Duty).",
          "• **Impacto:** Calibre insuficiente degrada el Damping Factor (graves 'muddy').",
          "• **Tierra Física:** CRÍTICO verificar físicamente para seguridad.",
          "",
          "12.2 Red Digital Audio",
          "• Protocolo (Dante/AVB), Sample Rate (48/96kHz), Bit Depth (24-bit/32-float).",
          "• LiveSync calcula el ancho de banda Mbps necesario.",
          "",
          "12.3 Rigging y Carga",
          "• **SWL:** Safe Working Load en kg.",
          "• **Safety Margin:** Calculado considerando peso estático, dinámico (1.25x) y carga de viento."
        ]
      },
      {
        id: "calc-btn",
        title: "13. BOTÓN 'CALCULAR SISTEMA'",
        content: [
          "Ejecuta más de **40 algoritmos científicos** en secuencia:",
          "1. **Física atmosférica:** Cramer, Altitud, ISO 9613-1.",
          "2. **Acústica de sala:** Sabine/Eyring, Modos de sala.",
          "3. **Line array physics:** Coupling gain, Transición Near/Far field.",
          "4. **Alineación temporal:** Delays Haas, Fase Sub/Main.",
          "5. **Electricidad:** Balance de fases, Caída de voltaje.",
          "6. **Logística:** Bill of Materials (BOM), Patch list, Crew sizing.",
          "**Tiempo de Cálculo:** 1-3 segundos."
        ]
      }
    ]
  },
  {
    id: "part-4",
    title: "PARTE 4: PANELES DE ANÁLISIS ESPECÍFICO",
    sections: [
      {
        id: "drift-analysis",
        title: "14. ANÁLISIS DE DRIFT TÉRMICO",
        content: [
          "Panel que aparece si hay diferencia entre temperatura de prueba y show.",
          "• **Velocidad del Sonido:** Diferencia en m/s (Check vs Show).",
          "• **Estado Crítico:** 🟢 Normal (<0.5ms), 🔴 Crítico (>0.5ms).",
          "• **Sugerencia EQ (12kHz):** Boost/Cut HF basado en densidad del aire.",
          "• **Tabla de Torres:** Muestra el drift individual y el Nuevo Delay Requerido."
        ]
      },
      {
        id: "room-acoustics",
        title: "15. ACÚSTICA DE SALA (Solo Indoor)",
        content: [
          "15.1 RT60 (Reverberation Time)",
          "• **0.3-0.6s:** IDEAL (Sala seca).",
          "• **0.8-1.2s:** BUENO (Requiere EQ).",
          "• **>3s:** CRÍTICO (Ininteligible).",
          "",
          "15.2 Distancia Crítica (Dc)",
          "• Punto donde campo directo = campo reverberante. Si FOH > Dc, la inteligibilidad cae.",
          "",
          "15.3 STI (Speech Transmission Index)",
          "• Escala 0.00 a 1.00. 🟢 >0.6 es Bueno. 🟠 <0.6 comprometido."
        ]
      },
      {
        id: "advanced-physics",
        title: "16. FÍSICA AVANZADA (WST & OLSON)",
        content: [
          "16.1 Criterio Heil (WST)",
          "• Wavefront Sculpture Technology. Verifica acoplamiento coherente.",
          "• **Estado WST Compliant:** 🟢 Pasa (Óptimo) o 🔴 Falla (Espaciamiento excesivo).",
          "",
          "16.2 Grating Lobes",
          "• Frecuencia donde aparecen lóbulos espurios (4-8 kHz compactos).",
          "",
          "16.3 Penalización Off-Axis (Harry Olson)",
          "• Pérdida de nivel dB @ 8kHz fuera del eje vertical. >6dB indica FOH mal ubicado."
        ]
      },
      {
        id: "room-modes",
        title: "17. MODOS PROPIOS (ROOM MODES)",
        content: [
          "Lista resonancias estacionarias de la sala.",
          "• **Tipos:** Axiales (Más energía), Tangenciales, Oblicuos.",
          "• **Modos Críticos:** Fondo rojo indica coincidencia con Crossover (±5Hz).",
          "• **Problema:** Boominess (graves retumbantes).",
          "• **Solución:** Aplicar filtro Notch/Bell en esa frecuencia."
        ]
      },
      {
        id: "eq-correction",
        title: "18. CORRECCIÓN EQ MASTER (INDOOR)",
        content: [
          "Genera filtros sugeridos para compensar la sala.",
          "• **Gráfica de Respuesta:** Curva correctiva (solo cortes, no boosts).",
          "• **Mejora STI:** Muestra porcentaje de mejora (ej: +23%).",
          "• **Prioridad:** Critical (Rojo), Important (Naranja), Optional (Verde).",
          "• **Estrategia:** Descripción en lenguaje natural del procesamiento sugerido."
        ]
      },
      {
        id: "delays-table",
        title: "19. TABLA DE ALINEACIÓN (DELAYS)",
        content: [
          "Tabla central con los parámetros para programar el DSP.",
          "• **Delay Time [ms]:** En **verde brillante**, valor exacto a programar (incluye Haas).",
          "• **Predicción SPL:** SPL esperado en objetivo. 🟠 Naranja si < 85dB.",
          "• **Gain Trim:** Ajuste para handoff suave entre Main y Torres.",
          "• **Air Loss (12k):** Pérdida atmosférica acumulada específica."
        ]
      },
      {
        id: "sub-design-results",
        title: "22. DISEÑO DE SUBGRAVES",
        content: [
          "22.1 Métricas Superiores:",
          "• Sub SPL (Max), Power Alley, Rechazo Trasero (dB).",
          "22.2 Ground Effect:",
          "• Interferencia por reflexión de suelo. Tabla de cortes (Notches) y soluciones (Flown arrays).",
          "22.3 Topología Requerida:",
          "• **Polar Plot:** Patrón de radiación gráfico.",
          "• **Separación Física:** Distancia entre centros (λ/4 @ 63Hz).",
          "• **Delay Electrónico:** Para fuentes traseras en CSA/End-fire."
        ]
      }
    ]
  },
  {
    id: "part-5",
    title: "PARTE 5: BOTONES DE EXPORTACIÓN Y VISUALIZACIÓN",
    sections: [
      {
        id: "3d-view",
        title: "26. BOTÓN '3D'",
        content: [
          "Activa la **visualización 3D geométrica** del sistema completo.",
          "• **Muestra:** Main PA (Cyan), Subs (Púrpura), Torres (Naranja/Amarillo), Escenario (Gris).",
          "• **Utilidad:** Validar geometría, comunicar diseño a riggers, presentaciones profesionales."
        ]
      },
      {
        id: "copy-report",
        title: "27. BOTÓN 'COPY' (Copiar Reporte)",
        content: [
          "Copia el reporte completo al portapapeles en texto plano.",
          "Incluye: Especificaciones, Condiciones Ambientales, Tabla de Delays, Análisis Eléctrico y Logística.",
          "**Uso:** Pegar en Email, WhatsApp, Slack o Notion."
        ]
      },
      {
        id: "pdf-report",
        title: "28. BOTÓN 'PDF' (Descargar Reporte PDF)",
        content: [
          "Genera reporte técnico profesional de múltiples páginas.",
          "• **Pág 1:** Portada y Resumen Ejecutivo.",
          "• **Pág 2-3:** Especificaciones y Equipos.",
          "• **Pág 4:** Tabla de Delays.",
          "• **Pág 5-10:** Análisis Acústico, Subgraves, Eléctrica, Logística y Gráficas de respuesta."
        ]
      },
      {
        id: "cad-dxf",
        title: "29. BOTÓN 'CAD' (Descargar DXF)",
        content: [
          "Genera archivo planta geométrica compatible con AutoCAD, SketchUp, Vectorworks.",
          "• **Capas (Layers):** STAGE, MAIN_PA, SUBWOOFERS, DELAY_TOWERS, DIMENSIONS.",
          "• **Escala:** 1:1 (Tamaño real en metros)."
        ]
      }
    ]
  },
  {
    id: "part-6",
    title: "PARTE 6: FLUJO DE TRABAJO COMPLETO (RESUMEN)",
    sections: [
      {
        id: "typical-use",
        title: "31. FLUJO TÍPICO DE USO",
        content: [
          "1. **Acceso:** Inicia sesión y ve al Hub.",
          "2. **Crear:** Proyecto nuevo con nombre y cliente.",
          "3. **Configurar:** Entorno, PA, Monitores, Control, Objetivos, Torres, Infra.",
          "4. **Calcular:** Haz clic en 'CALCULAR SISTEMA'.",
          "5. **Revisar:** Analiza Reporte, verifica alertas y gráficas.",
          "6. **Exportar:** PDF para el rider, DXF para el plano.",
          "7. **Iterar:** Si hay problemas, ajusta y vuelve a calcular.",
          "8. **Implementación:** Aplica Delay Time y Gain Trim en el DSP real."
        ]
      },
      {
        id: "adv-tips",
        title: "32. CONSEJOS AVANZADOS",
        content: [
          "• **Precisión:** Usa RT60 medido con SMAART.",
          "• **Complejos:** Para Arena 360°, usa 4 torres equidistantes.",
          "• **Viento:** Si >20km/h, activa el cálculo de refracción.",
          "• **Seguridad:** No asumas valores, valida SWL con el rigger.",
          "• **Equipo:** Usa el Modo Corporate para invitar a tus técnicos."
        ]
      }
    ]
  }
];
