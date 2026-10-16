
import type { ManualPart } from '../types';

export const part1: ManualPart = {
  id: "part-1",
  number: 1,
  label: "PARTE 1",
  title: "INTRODUCCIÓN Y HUB DE PROYECTOS",
  sections: [
    {
      id: "welcome",
      title: "1. BIENVENIDO A LIVESYNC PRO",
      content: [
        "LiveSync Pro es una plataforma web profesional que permite a ingenieros de audio diseñar, calcular y optimizar sistemas completos de sonido para eventos en vivo. La aplicación combina física acústica avanzada, modelado atmosférico y cálculos de ingeniería para generar reportes técnicos profesionales (Technical Riders) con precisión científica.",
        "**¿Qué puedes hacer con LiveSync Pro?**",
        "• ✅ **Diseñar sistemas PA completos:** Line Arrays, Subwoofers, Delay Towers.",
        "• ✅ **Calcular delays geométricos:** Con compensación atmosférica basada en la norma ISO 9613-1.",
        "• ✅ **Optimizar alineación de fase:** Ajuste preciso entre el PA principal y el sistema de subgraves.",
        "• ✅ **Generar curvas de EQ:** Ecualización correctiva automática para torres de delay según la distancia y el entorno.",
        "• ✅ **Calcular infraestructura:** Análisis de carga eléctrica trifásica y seguridad en rigging.",
        "• ✅ **Exportar reportes técnicos:** Generación de archivos PDF profesionales y planos CAD (DXF).",
        "• ✅ **Colaborar en tiempo real:** Gestión de equipos de hasta 5 personas para proyectos compartidos (Plan Corporativo)."
      ]
    },
    {
      id: "access",
      title: "2. ACCESO A LA PLATAFORMA",
      content: [
        "**2.1 Registro e Inicio de Sesión**",
        "Al ingresar a https://livesyncpro.com verás la Landing Page con información detallada sobre las capacidades de la suite. Para comenzar a trabajar:",
        "1. Haz clic en el botón **'Iniciar Sesión'** (ubicado en la esquina superior derecha).",
        "2. Selecciona tu método de autenticación:",
        "• **Google OAuth:** (Recomendado) Login instantáneo con tu cuenta profesional de Google.",
        "• **Email/Password:** Registro manual mediante correo electrónico y contraseña verificada.",
        "",
        "**2.2 Planes de Suscripción**",
        "LiveSync Pro ofrece niveles de servicio adaptados a la escala de tu producción:",
        "TABLE:Plan | Precio | Características Principales",
        "Trial | Gratis | 0 Proyectos, acceso limitado a base de datos de altavoces.",
        "Standard | $99/año | Proyectos ilimitados, exportación completa PDF/CAD.",
        "Corporate | $499/año | Gestión de equipos (5 licencias), proyectos compartidos en tiempo real.",
        "Partner | Custom | Licencias personalizadas para empresas de renta y universidades.",
        "",
        "**Estado de Suscripción:**",
        "• 🟢 **Activo:** Acceso total a todas las funciones de diseño y exportación.",
        "• 🔴 **Expirado:** Requiere renovación. La aplicación entra en modo 'Solo Lectura' permitiendo ver proyectos viejos pero no crear nuevos ni editar.",
        "Tu estado se visualiza permanentemente en la esquina superior derecha mediante un indicador visual de color."
      ]
    },
    {
      id: "project-hub",
      title: "3. HUB DE PROYECTOS (PROJECT HUB)",
      content: [
        "Una vez autenticado, accederás al **Project Hub**, tu centro de comando donde se centralizan todos los diseños de ingeniería.",
        "**3.1 Interfaz del Hub**",
        "El Hub se divide en componentes clave para agilizar el flujo de trabajo:",
        "**A. Encabezado Superior (Global Header):**",
        "• **Título 'Project Hub':** Indica que te encuentras en la raíz de tus archivos.",
        "• **Widget de Equipo:** Muestra el estado de tu suscripción corporativa y miembros activos.",
        "• **Barra de Búsqueda:** Filtro inteligente por nombre de proyecto o cliente.",
        "• **Botón de Sincronización ⟳:** Fuerza la actualización de datos con la base de datos Supabase.",
        "• **Botón 'Nuevo Proyecto':** Botón cyan para iniciar un flujo de diseño desde cero.",
        "",
        "**B. Grilla de Proyectos (Project Grid):**",
        "Cada tarjeta de proyecto funciona como un resumen ejecutivo que incluye:",
        "• **Nombre del Proyecto:** Identificador único (ej: 'Festival Estéreo Picnic').",
        "• **Cliente:** Nombre de la productora o artista contratante.",
        "• **Tipo de Proyecto:**",
        "  • 🔒 **PRIV (Privado):** Solo tú puedes verlo y editarlo (badge gris con candado).",
        "  • 👥 **TEAM (Compartido):** Visible y editable por todo tu equipo (fondo morado).",
        "• **Estadísticas Rápidas:** Iconos que muestran el modelo de PA principal y el layout del escenario.",
        "• **Última Modificación:** Fecha y hora de la última sincronización en la nube.",
        "• **Menú Contextual ⋮:** Acceso rápido a funciones administrativas."
      ],
      subsections: [
        {
          title: "3.2 Crear un Proyecto Nuevo",
          content: [
            "Para iniciar un diseño, sigue estos pasos:",
            "1. Haz clic en el botón **'Nuevo Proyecto'** (Cyan, esquina superior derecha).",
            "2. Se abrirá un modal interactivo con el formulario de registro:",
            "**Campo 1: Nombre del Evento / Proyecto (Obligatorio)**",
            "• Ingresa el nombre técnico del evento. Evita caracteres especiales.",
            "• *Ejemplos:* 'Gira 2025 - Auditorio Nacional', 'Evento Corporativo Banco X'.",
            "**Campo 2: Cliente (Opcional)**",
            "• Nombre de la empresa que solicita el diseño técnico.",
            "**Campo 3: Compartir con el Equipo**",
            "• ☑ **Activado:** El proyecto se crea automáticamente como un recurso compartido para los miembros de tu licencia Corporate.",
            "• ☐ **Desactivado:** El proyecto será estrictamente privado.",
            "**Nota:** Este checkbox solo aparece si tienes una suscripción Corporate activa.",
            "3. Haz clic en **'Crear Proyecto'**. El sistema generará el espacio de trabajo y te redirigirá a la Vista de Configuración."
          ]
        },
        {
          title: "3.3 Gestión de Proyectos Existentes",
          content: [
            "**A. Abrir un Proyecto:** Haz clic en cualquier parte central de la tarjeta del proyecto para cargar sus parámetros en el motor de cálculo.",
            "**B. Buscar y Filtrar:** Escribe el nombre del proyecto en la barra de búsqueda superior. La grilla se filtrará en tiempo real (mínimo 2 caracteres).",
            "**C. Menú Contextual (Tres Puntos ⋮):**",
            "1. 📝 **Renombrar:** Abre un diálogo para modificar el nombre sin perder los cálculos previos.",
            "2. 🔐 **Cambiar Privacidad:** Permite alternar entre PRIV y TEAM (Solo si eres el creador del proyecto).",
            "3. 📄 **Duplicar:** Crea una réplica exacta (clon) incluyendo todos los parámetros de splay, delays y clima. Útil para crear variantes (ej: 'Show A' y 'Show B').",
            "4. 🗑️ **Eliminar:** Acción permanente. Se requiere confirmación en un modal de advertencia crítica roja."
          ]
        },
        {
          title: "3.4 Sincronización en la Nube (Data Engine)",
          content: [
            "LiveSync Pro utiliza tecnología de sincronización en tiempo real basada en **Supabase**.",
            "• **Auto-guardado:** Cada parámetro modificado se guarda automáticamente en la nube cada 2 segundos de inactividad.",
            "• **Sincronización Bidireccional:** Si editas desde una tablet, los cambios aparecerán en tu laptop al recargar.",
            "• **Estados del Indicador:**",
            "  • 🟢 **Sincronizado:** Todos los datos locales están seguros en el servidor.",
            "  • 🔵 **Sincronizando...:** Subiendo cambios de ingeniería.",
            "  • 🔴 **Error de Conexión:** Revisa tu conexión a internet; los datos no se están respaldando.",
            "**Sincronización Manual:** Haz clic en el botón ⟳ del Hub para forzar la descarga de cambios realizados por otros miembros del equipo."
          ]
        }
      ]
    },
    {
      id: "teams",
      title: "4. GESTIÓN DE EQUIPOS (PLAN CORPORATIVO)",
      content: [
        "**4.1 ¿Qué es un Equipo?**",
        "Es un entorno colaborativo diseñado para empresas de producción, rental houses e ingenieros de sistemas que trabajan en conjunto.",
        "• ✅ **Colaboración Real:** Comparte diseños complejos de PA con colegas al instante.",
        "• ✅ **Gestión Centralizada:** El dueño de la suscripción paga y administra las invitaciones.",
        "• ✅ **Eficiencia Técnica:** Un ingeniero puede diseñar el PA mientras otro ajusta las torres de delay en el mismo archivo.",
        "",
        "**4.2 Crear un Equipo**",
        "• **Requisitos:** Suscripción 'Corporate' activa y no pertenecer a otro equipo.",
        "• **Proceso:** En el Project Hub, haz clic en **'Crear Equipo'**. El sistema generará un **Código de Invitación Único** (formato: team_xxx_yyy).",
        "• ⚠️ **CRÍTICO:** Este código es la única forma de acceder. Guárdalo en un lugar seguro.",
        "",
        "**4.3 Invitar Miembros**",
        "1. El **Owner** (Propietario) copia el código de invitación.",
        "2. Compártelo con tus técnicos mediante servicios de mensajería seguros.",
        "3. El invitado debe ir a su propio Project Hub y hacer clic en **'Unirse a Equipo'**.",
        "4. Al ingresar el código, su cuenta se transformará automáticamente a Corporate (heredando los privilegios del Owner) y tendrá acceso a la pestaña TEAM.",
        "**Límite de Miembros:** Máximo 5 personas por equipo (1 Owner + 4 Members)."
      ],
      subsections: [
        {
          title: "4.4 Gestión Administrativa",
          content: [
            "El **Owner** tiene acceso al Panel de Gestión de Equipo donde puede:",
            "• **Ver Miembros:** Lista completa con emails y avatares.",
            "• **Expulsar Miembros (🚫):** Revoca el acceso de un técnico al instante. Su cuenta volverá a estado 'Trial' o 'Expired'.",
            "• **Disolver Equipo:** Acción irreversible que expulsa a todos los miembros y elimina el grupo de colaboración.",
            "",
            "**4.5 Salir de un Equipo (Member):**",
            "Si eres miembro y deseas retirarte, haz clic en el icono de salida 🚪 en el widget de equipo. **Advertencia:** Perderás acceso inmediato a todos los proyectos marcados como TEAM y tu suscripción caducará."
          ]
        },
        {
          title: "4.7 Proyectos PRIV vs TEAM",
          content: [
            "**Proyectos Privados (🔒 PRIV):**",
            "• Solo visibles en el Hub de quien los creó.",
            "• No ocupan espacio en la grilla compartida del equipo.",
            "• Ideales para borradores iniciales o diseños confidenciales.",
            "",
            "**Proyectos Compartidos (👥 TEAM):**",
            "• Aparecen en el Hub de todos los miembros del equipo.",
            "• Tienen un badge morado distintivo.",
            "• **Permisos:** Cualquier miembro puede entrar, calcular y exportar. Solo el creador puede eliminar el proyecto original.",
            "**Cómo cambiar privacidad:** En el menú ⋮ de cualquier proyecto de tu propiedad, selecciona 'Hacer Privado' o 'Compartir con Equipo'."
          ]
        }
      ]
    }
  ]
};
