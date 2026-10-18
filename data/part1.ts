
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
        "• ✅ **Colaborar en equipo:** Proyectos compartidos con equipos de hasta 10 miembros (plan Corporativo PRO)."
      ]
    },
    {
      id: "access",
      title: "2. ACCESO A LA PLATAFORMA",
      content: [
        "**2.1 Registro e Inicio de Sesión**",
        "Al ingresar a https://livesyncpro.com verás la Landing Page con información detallada sobre las capacidades de la suite. Para comenzar a trabajar:",
        "1. Haz clic en el botón **'Iniciar Sesión'** (ubicado en la esquina superior derecha).",
        "2. Pulsa **'Continuar con Google'** e inicia sesión con tu cuenta de Google. La primera vez se crea tu cuenta de LiveSync Pro automáticamente.",
        "",
        "**2.2 Planes**",
        "LiveSync Pro tiene un plan **Gratis para siempre** (sin tarjeta) y planes anuales de pago (precios en USD). La física es gratis: todos los módulos de cálculo están disponibles en cualquier plan.",
        "TABLE:Plan | Precio | Qué incluye",
        "Gratis | $0 | Motor de cálculo completo (alineación, delays, subgraves, torres, acústica, atmósfera, eléctrica, rigging, vista 3D), 3 proyectos en la nube, mapa de cobertura en la banda de 1 kHz, informe PDF con el pie «Calculado con LiveSync Pro (plan Gratis)» y 3 preguntas de bienvenida al Ingeniero IA.",
        "Pro (Core) | $97/año | Todo lo anterior más proyectos ilimitados, mapa de cobertura en todas las bandas, informe PDF profesional sin marca, exportación CAD (DXF) e Ingeniero IA completo.",
        "Partner Estándar | $199/año | Ficha en el directorio de proveedores (búsqueda por ciudad y contacto directo) + 1 licencia Pro incluida.",
        "Corporativo PRO | $499/año | Gestión de equipos de hasta 10 miembros con proyectos compartidos, posicionamiento destacado en el directorio y perfil verificado.",
        "",
        "Las suscripciones se pagan con tarjeta a través de Stripe y se renuevan automáticamente cada año. Puedes cancelarlas cuando quieras desde el gestor de suscripción; al terminar el periodo la cuenta vuelve al plan Gratis y **conservas todos tus proyectos**.",
        "",
        "**2.3 Cómo se desbloquea Pro**",
        "No hay pantallas de bloqueo al entrar: con el plan Gratis trabajas en la app desde el primer minuto. Cuando intentas algo que es de Pro, aparece una ventana que explica qué se desbloquea y el botón **Desbloquear Pro** (pago seguro con Stripe):",
        "• Crear un 4.º proyecto (los que ya tengas se pueden abrir y editar siempre).",
        "• Exportar el plano CAD (DXF) o el informe PDF sin marca.",
        "• Ver el mapa de cobertura en una banda distinta de 1 kHz.",
        "• Hacer más preguntas al Ingeniero IA cuando se agotan las 3 de bienvenida (el botón del asistente muestra cuántas te quedan).",
        "",
        "También puedes abrir **Planes y licencia** en cualquier momento desde **Mejorar a Pro** (cabecera), desde **Plan: Gratis** (barra inferior) o desde el menú móvil. Ahí puedes contratar cualquier plan, **canjear una clave de licencia**, unirte a un equipo con su código de invitación (**Tengo un código de equipo**) o pulsar **Verificar pago** si acabas de pagar y aún no se refleja."
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
        "• **Botón de Sincronización ⟳:** Fuerza la actualización de tus proyectos con la nube.",
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
            "• ☑ **Activado:** El proyecto se crea como proyecto compartido (TEAM), visible para todos los miembros de tu equipo.",
            "• ☐ **Desactivado:** El proyecto será estrictamente privado.",
            "**Nota:** Esta opción solo aparece si perteneces a un equipo (plan Corporativo PRO).",
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
            "Tus proyectos se guardan mediante **sincronización en la nube**, asociados a tu cuenta.",
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
        "• **Requisitos:** Suscripción **Corporativo PRO** activa y no pertenecer a otro equipo.",
        "• **Proceso:** En el Project Hub, haz clic en **'Crear Equipo'**. El sistema generará un **Código de Invitación** único.",
        "• ⚠️ **Importante:** Cualquiera que tenga el código puede solicitar unirse mientras haya plazas libres. Compártelo solo con tu equipo.",
        "",
        "**4.3 Invitar Miembros**",
        "1. El **Owner** (Propietario) copia el código de invitación.",
        "2. Compártelo con tus técnicos mediante servicios de mensajería seguros.",
        "3. El invitado debe ir a su propio Project Hub y hacer clic en **'Unirse a Equipo'**.",
        "4. Al ingresar el código, su cuenta queda vinculada al equipo: hereda el acceso de la licencia Corporativo PRO del Owner y ve los proyectos TEAM.",
        "**Límite de Miembros:** Máximo 10 miembros por equipo, incluido el Owner."
      ],
      subsections: [
        {
          title: "4.4 Gestión Administrativa",
          content: [
            "El **Owner** tiene acceso al Panel de Gestión de Equipo donde puede:",
            "• **Ver Miembros:** Lista completa con emails y avatares.",
            "• **Expulsar Miembros (🚫):** Revoca al instante el acceso que el técnico heredaba del equipo; sus proyectos compartidos pasan a ser privados.",
            "• **Disolver Equipo:** Acción irreversible que expulsa a todos los miembros y elimina el grupo de colaboración. El Owner conserva su licencia Corporativo PRO.",
            "",
            "**4.5 Salir de un Equipo (Member):**",
            "Si eres miembro y deseas retirarte, haz clic en el icono de salida 🚪 en el widget de equipo. **Advertencia:** Perderás de inmediato el acceso a los proyectos TEAM y la licencia heredada del equipo (necesitarás un plan propio para seguir usando la aplicación). Tus proyectos compartidos pasan a ser privados."
          ]
        },
        {
          title: "4.6 Proyectos PRIV vs TEAM",
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
