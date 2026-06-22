// ============================================================================
// GreenLock Cybersecurity: Service Data (12 services)
// Central data source for all service pages, cards, and navigation
// ============================================================================

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
  icon: string; // SVG path or identifier
}

export interface MethodologyStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceData {
  // Identity
  slug: string;
  title: string;
  shortTitle: string;
  area: 'cybersecurity' | 'digital';
  // SEO
  metaTitle: string;
  metaDescription: string;
  seoKeyword: string;
  // Hero
  tagline: string;
  headline: string;
  description: string;
  priceFrom: string;
  duration: string;
  certifications: string[];
  // Content
  whatIs: {
    title: string;
    paragraphs: string[];
  };
  deliverables: ServiceDeliverable[];
  methodology: {
    title: string;
    framework: string;
    steps: MethodologyStep[];
  };
  // FAQ
  faqs: ServiceFAQ[];
  // Related
  relatedSlugs: string[];
  // CTA
  ctaText: string;
}

// ============================================================================
// HELPER: Get service by slug
// ============================================================================
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getServicesByArea(area: 'cybersecurity' | 'digital'): ServiceData[] {
  return allServices.filter((s) => s.area === area);
}

export function getRelatedServices(currentSlug: string): ServiceData[] {
  const current = getServiceBySlug(currentSlug);
  if (!current) return [];
  return current.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceData => s !== undefined);
}

// ============================================================================
// SVG ICON PATHS (reusable across deliverables)
// ============================================================================
const ICONS = {
  report: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  shield: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  chart: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  check: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  code: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
  server: 'M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z',
  users: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  lock: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  eye: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  clock: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  globe: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  device: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  cpu: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5M4.5 15.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z',
  bolt: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  academic: 'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  scale: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z',
  chat: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
  cog: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
} as const;

export { ICONS };

// ============================================================================
// ALL 12 SERVICES
// ============================================================================
export const allServices: ServiceData[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. PENTESTING WEB
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'pentesting-web',
    title: 'Pentesting Web',
    shortTitle: 'Pentesting Web',
    area: 'cybersecurity',
    metaTitle: 'Pentesting Web en España: Auditoría de seguridad de aplicaciones web',
    metaDescription: 'Servicio de pentesting web profesional. Identificamos vulnerabilidades en tu aplicación web usando metodología OWASP y PTES. Informe ejecutivo en 48h.',
    seoKeyword: 'pentesting web España',
    tagline: 'Seguridad de aplicaciones web',
    headline: 'Pentesting Web: encuentra las vulnerabilidades de tu aplicación antes que los atacantes',
    description: 'Evaluación exhaustiva de seguridad de tu aplicación web mediante técnicas manuales y automatizadas, siguiendo las metodologías OWASP Testing Guide y PTES.',
    priceFrom: '4.000 €',
    duration: '2-4 semanas',
    certifications: ['BSCP', 'CRTO', 'eJPT'],
    whatIs: {
      title: '¿Qué es el pentesting web y por qué lo necesitas?',
      paragraphs: [
        'Un pentesting web es una auditoría de seguridad ofensiva que simula ataques reales contra tu aplicación web para identificar vulnerabilidades antes de que un atacante las explote. No se trata de un simple escaneo automatizado: nuestros especialistas certificados BSCP analizan manualmente cada punto de entrada, flujo de autenticación y lógica de negocio.',
        'El 70% de las brechas de seguridad en empresas españolas se originan en aplicaciones web mal configuradas o con vulnerabilidades conocidas. Un pentesting web periódico es la forma más efectiva de reducir tu superficie de ataque y cumplir con normativas como ENS, NIS2 o PCI DSS.',
        'Al finalizar, recibes un informe ejecutivo (para dirección) y un informe técnico detallado con cada vulnerabilidad clasificada por criticidad, evidencias de explotación y recomendaciones de remediación priorizadas.',
      ],
    },
    deliverables: [
      { title: 'Informe ejecutivo', description: 'Resumen de alto nivel para dirección con estado de riesgo, hallazgos críticos y recomendaciones priorizadas.', icon: ICONS.report },
      { title: 'Informe técnico detallado', description: 'Documentación de cada vulnerabilidad con evidencias, impacto CVSS, pasos de reproducción y remediación.', icon: ICONS.code },
      { title: 'Pruebas de explotación', description: 'Evidencias reales de las vulnerabilidades explotadas en entorno controlado para validar su impacto.', icon: ICONS.shield },
      { title: 'Plan de remediación priorizado', description: 'Hoja de ruta con correcciones ordenadas por criticidad e impacto en el negocio.', icon: ICONS.chart },
      { title: 'Retesting incluido', description: 'Verificación de que las correcciones aplicadas han eliminado efectivamente las vulnerabilidades.', icon: ICONS.check },
      { title: 'Sesión de presentación', description: 'Reunión con tu equipo técnico y dirección para explicar hallazgos, responder preguntas y definir prioridades.', icon: ICONS.users },
    ],
    methodology: {
      title: 'Metodología de pentesting web',
      framework: 'OWASP Testing Guide v4.2 + PTES',
      steps: [
        { step: 1, title: 'Reconocimiento', description: 'Recopilación de información sobre la aplicación: tecnologías, endpoints, flujos de datos, superficie de ataque expuesta y puntos de entrada.' },
        { step: 2, title: 'Análisis de vulnerabilidades', description: 'Identificación exhaustiva de vulnerabilidades mediante técnicas manuales y herramientas especializadas: inyecciones SQL, XSS, CSRF, SSRF, broken auth y más.' },
        { step: 3, title: 'Explotación controlada', description: 'Explotación segura de las vulnerabilidades encontradas para demostrar su impacto real en el negocio. Sin afectar la disponibilidad del servicio.' },
        { step: 4, title: 'Post-explotación', description: 'Evaluación del alcance real: acceso a datos sensibles, movimiento lateral, escalada de privilegios y persistencia en el sistema.' },
        { step: 5, title: 'Informe y remediación', description: 'Entrega de informes ejecutivo y técnico con plan de remediación priorizado. Retesting incluido tras aplicar las correcciones.' },
      ],
    },
    faqs: [
      { question: '¿Cuánto tiempo dura un pentesting web?', answer: 'Normalmente entre 2 y 4 semanas, dependiendo de la complejidad de la aplicación. Aplicaciones con muchos flujos de negocio o integraciones pueden requerir más tiempo. Entregamos el informe preliminar en 48 horas tras finalizar las pruebas.' },
      { question: '¿El pentesting puede afectar a mi aplicación en producción?', answer: 'No. Realizamos las pruebas de forma controlada, priorizando la disponibilidad del servicio. Acordamos ventanas de pruebas y excluimos técnicas destructivas. En caso de aplicaciones críticas, recomendamos trabajar sobre un entorno de staging idéntico a producción.' },
      { question: '¿Qué diferencia hay entre un escaneo de vulnerabilidades y un pentesting?', answer: 'Un escaneo de vulnerabilidades es un proceso automatizado que genera muchos falsos positivos. Un pentesting incluye análisis manual experto, explotación real de vulnerabilidades, validación de impacto y recomendaciones personalizadas. Es la diferencia entre una alarma genérica y un diagnóstico médico completo.' },
      { question: '¿Necesito un pentesting si ya tengo un WAF?', answer: 'Sí. Un WAF protege contra ataques conocidos pero no elimina las vulnerabilidades subyacentes. Un pentesting identifica fallos en la lógica de negocio, configuraciones inseguras y vulnerabilidades que un WAF no puede detectar, como broken access control o IDOR.' },
      { question: '¿Cada cuánto tiempo debo hacer un pentesting web?', answer: 'Recomendamos al menos una vez al año o tras cada cambio significativo en la aplicación (nuevas funcionalidades, cambio de infraestructura, migraciones). Para aplicaciones críticas, nuestro servicio PaaS incluye 2-3 ciclos anuales con monitorización continua.' },
    ],
    relatedSlugs: ['pentesting-movil', 'pentesting-infraestructura', 'pentesting-as-a-service'],
    ctaText: 'Solicitar pentesting web',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. PENTESTING MÓVIL
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'pentesting-movil',
    title: 'Pentesting Móvil',
    shortTitle: 'Pentesting Móvil',
    area: 'cybersecurity',
    metaTitle: 'Pentesting de Aplicaciones Móviles: Auditoría Android e iOS',
    metaDescription: 'Pentesting de aplicaciones móviles Android e iOS. Análisis de seguridad con ingeniería inversa, análisis de tráfico y evaluación OWASP MASTG.',
    seoKeyword: 'pentesting aplicaciones móviles',
    tagline: 'Seguridad de aplicaciones móviles',
    headline: 'Pentesting Móvil: auditoría de seguridad completa para aplicaciones Android e iOS',
    description: 'Análisis exhaustivo de seguridad de tu aplicación móvil mediante ingeniería inversa, análisis dinámico de tráfico y evaluación siguiendo OWASP MASTG.',
    priceFrom: '5.000 €',
    duration: '2-4 semanas',
    certifications: ['BSCP', 'eJPT'],
    whatIs: {
      title: '¿Qué es el pentesting móvil y por qué es imprescindible?',
      paragraphs: [
        'Un pentesting móvil evalúa la seguridad integral de tu aplicación en Android e iOS: desde el binario instalado en el dispositivo hasta la comunicación con el backend y las APIs que consume. Aplicamos técnicas de ingeniería inversa, análisis de almacenamiento local, interceptación de tráfico y evaluación de mecanismos de autenticación.',
        'Las aplicaciones móviles procesan datos críticos (pagos, datos personales, geolocalización) en un entorno que el usuario controla físicamente. Un atacante puede decompilar tu app, manipular el tráfico de red o explotar almacenamiento inseguro para acceder a información confidencial.',
        'Nuestro análisis sigue la metodología OWASP MASTG (Mobile Application Security Testing Guide) y entrega un informe completo con vulnerabilidades clasificadas, evidencias de explotación y un plan de remediación adaptado a tu ciclo de desarrollo móvil.',
      ],
    },
    deliverables: [
      { title: 'Análisis estático (SAST)', description: 'Ingeniería inversa del binario: análisis de código decompilado, secretos hardcodeados, configuraciones inseguras y protección anti-tampering.', icon: ICONS.code },
      { title: 'Análisis dinámico (DAST)', description: 'Pruebas en tiempo de ejecución: interceptación de tráfico, manipulación de requests, bypass de SSL pinning y análisis de comportamiento.', icon: ICONS.bolt },
      { title: 'Evaluación de almacenamiento', description: 'Análisis de datos almacenados localmente: SharedPreferences, Keychain, bases de datos SQLite, archivos temporales y logs.', icon: ICONS.server },
      { title: 'Informe ejecutivo y técnico', description: 'Documentación completa con hallazgos clasificados por OWASP MASTG, evidencias de explotación y plan de remediación priorizado.', icon: ICONS.report },
      { title: 'Retesting incluido', description: 'Verificación de correcciones en un ciclo adicional sin coste extra para confirmar que las vulnerabilidades han sido resueltas.', icon: ICONS.check },
    ],
    methodology: {
      title: 'Metodología de pentesting móvil',
      framework: 'OWASP MASTG + MASVS',
      steps: [
        { step: 1, title: 'Análisis estático', description: 'Decompilación del binario (APK/IPA), análisis de código fuente, identificación de secretos, permisos excesivos y configuraciones inseguras.' },
        { step: 2, title: 'Análisis dinámico', description: 'Ejecución en entorno instrumentado: interceptación de comunicaciones, bypass de SSL pinning, manipulación de parámetros y análisis de flujos.' },
        { step: 3, title: 'Evaluación del backend', description: 'Análisis de las APIs consumidas por la aplicación: autenticación, autorización, rate limiting, validación de inputs y exposición de datos.' },
        { step: 4, title: 'Almacenamiento y criptografía', description: 'Evaluación de datos persistidos localmente, uso de criptografía, gestión de tokens y protección de información sensible en reposo.' },
        { step: 5, title: 'Informe y remediación', description: 'Entrega de informes con vulnerabilidades clasificadas según OWASP MASVS, impacto real demostrado y recomendaciones específicas para el equipo de desarrollo.' },
      ],
    },
    faqs: [
      { question: '¿Analizáis tanto Android como iOS?', answer: 'Sí. Realizamos pentesting completo en ambas plataformas. El análisis incluye aspectos específicos de cada sistema operativo: permisos, almacenamiento seguro (Keystore vs Keychain), protección del binario y mecanismos de IPC.' },
      { question: '¿Necesitáis el código fuente de la aplicación?', answer: 'No es imprescindible. Realizamos el análisis en modalidad black-box (sin código fuente) o white-box (con acceso al repositorio). El enfoque black-box es más realista pero el white-box permite una cobertura más amplia en menos tiempo.' },
      { question: '¿Qué pasa si mi app tiene SSL pinning?', answer: 'Es lo esperado y deseable. Nuestros especialistas tienen experiencia en bypass de SSL pinning en apps nativas y híbridas (Flutter, React Native). El bypass es necesario para analizar las comunicaciones con el backend durante el pentesting.' },
      { question: '¿El pentesting incluye el análisis del backend/API?', answer: 'Sí, analizamos las APIs que consume la aplicación como parte integral del pentesting. Las vulnerabilidades más críticas suelen estar en la comunicación app-backend: autenticación débil, IDOR, falta de rate limiting o exposición de datos sensibles.' },
    ],
    relatedSlugs: ['pentesting-web', 'desarrollo-movil', 'pentesting-as-a-service'],
    ctaText: 'Solicitar pentesting móvil',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. PENTESTING INFRAESTRUCTURA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'pentesting-infraestructura',
    title: 'Pentesting de Infraestructura',
    shortTitle: 'Pentesting Infra',
    area: 'cybersecurity',
    metaTitle: 'Pentesting de Infraestructura: Auditoría de red y Active Directory',
    metaDescription: 'Pentesting de infraestructura y redes. Evaluación de seguridad de servidores, Active Directory, redes internas y perimetrales. Desde 6.000 €.',
    seoKeyword: 'pentesting infraestructura',
    tagline: 'Seguridad de infraestructura y redes',
    headline: 'Pentesting de Infraestructura: evaluación completa de tu red, servidores y Active Directory',
    description: 'Simulamos ataques reales contra tu infraestructura de red para identificar vulnerabilidades en servidores, servicios expuestos, Active Directory y configuraciones de red.',
    priceFrom: '6.000 €',
    duration: '3-5 semanas',
    certifications: ['CRTO', 'eJPT'],
    whatIs: {
      title: '¿Qué es el pentesting de infraestructura?',
      paragraphs: [
        'Un pentesting de infraestructura evalúa la seguridad de tu entorno de red: servidores, servicios expuestos, firewalls, segmentación de red, Active Directory y configuraciones de sistemas operativos. Simulamos un atacante que ha obtenido acceso a tu red (interna o externa) e intentamos comprometer activos críticos.',
        'El Active Directory es el objetivo número uno de los atacantes en entornos corporativos. Una mala configuración puede permitir escalada de privilegios hasta Domain Admin en cuestión de horas. Nuestro especialista CRTO tiene experiencia específica en ataques y defensa de AD.',
        'El resultado es un mapa completo de tu superficie de ataque interna con vulnerabilidades priorizadas, rutas de ataque documentadas y un plan de hardening para reducir drásticamente el riesgo de compromiso.',
      ],
    },
    deliverables: [
      { title: 'Evaluación perimetral', description: 'Análisis de servicios expuestos a Internet: puertos abiertos, versiones vulnerables, configuraciones inseguras y posibles puntos de entrada.', icon: ICONS.globe },
      { title: 'Análisis de Active Directory', description: 'Evaluación completa de AD: misconfigurations, Kerberoasting, AS-REP Roasting, delegación insegura, GPOs y rutas de escalada de privilegios.', icon: ICONS.server },
      { title: 'Evaluación de segmentación', description: 'Análisis de segmentación de red, VLANs, reglas de firewall y capacidad de movimiento lateral entre segmentos.', icon: ICONS.shield },
      { title: 'Informe con rutas de ataque', description: 'Documentación de las rutas de ataque completas desde el punto de entrada inicial hasta los activos críticos comprometidos.', icon: ICONS.report },
      { title: 'Plan de hardening', description: 'Guía de fortificación priorizada para sistemas operativos, servicios, Active Directory y configuraciones de red.', icon: ICONS.lock },
    ],
    methodology: {
      title: 'Metodología de pentesting de infraestructura',
      framework: 'PTES + MITRE ATT&CK',
      steps: [
        { step: 1, title: 'Enumeración', description: 'Descubrimiento de hosts activos, servicios, versiones, shares de red, relaciones de confianza y estructura del dominio Active Directory.' },
        { step: 2, title: 'Análisis de vulnerabilidades', description: 'Identificación de vulnerabilidades en servicios expuestos, configuraciones inseguras, credenciales débiles y misconfigurations de Active Directory.' },
        { step: 3, title: 'Explotación y acceso', description: 'Explotación de vulnerabilidades para obtener acceso inicial: credenciales, shells, acceso a servicios internos o bypass de autenticación.' },
        { step: 4, title: 'Post-explotación y movimiento lateral', description: 'Escalada de privilegios, movimiento lateral entre sistemas, dumping de credenciales, acceso a datos sensibles y evaluación del impacto real.' },
        { step: 5, title: 'Informe y hardening', description: 'Documentación de todas las rutas de ataque con evidencias, clasificación de hallazgos y plan de hardening priorizado por impacto.' },
      ],
    },
    faqs: [
      { question: '¿Necesitáis acceso físico a nuestras oficinas?', answer: 'Para pentesting interno, necesitamos un punto de conexión a vuestra red (VPN o acceso remoto). Para pentesting externo, trabajamos completamente en remoto analizando vuestro perímetro expuesto a Internet. No requiere acceso físico salvo en ejercicios de Red Team.' },
      { question: '¿Podéis analizar entornos cloud (AWS, Azure)?', answer: 'Sí. Evaluamos tanto infraestructura on-premise como entornos cloud y híbridos. En cloud analizamos configuraciones de IAM, security groups, almacenamiento expuesto, y la integración con Active Directory (Azure AD/Entra ID).' },
      { question: '¿El pentesting incluye Active Directory?', answer: 'Sí, es una parte fundamental. Evaluamos misconfigurations, políticas de grupo, delegación, Kerberos, relaciones de confianza y rutas de escalada de privilegios. Nuestro especialista tiene la certificación CRTO (Certified Red Team Operator) enfocada en AD.' },
      { question: '¿Puede afectar a la disponibilidad de nuestros servicios?', answer: 'Ejecutamos las pruebas de forma controlada y acordamos previamente las reglas de engagement. Evitamos técnicas que puedan causar denegación de servicio. En caso de encontrar vulnerabilidades de alto impacto, os informamos de inmediato antes de continuar.' },
    ],
    relatedSlugs: ['red-team', 'pentesting-web', 'auditoria-seguridad'],
    ctaText: 'Solicitar pentesting de infraestructura',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. RED TEAM
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'red-team',
    title: 'Red Team',
    shortTitle: 'Red Team',
    area: 'cybersecurity',
    metaTitle: 'Ejercicios de Red Team en España: Simulación de ataques reales',
    metaDescription: 'Ejercicios de Red Team completos: OSINT, phishing, intrusión física, movimiento lateral y exfiltración. Evaluamos la capacidad de detección y respuesta de tu organización.',
    seoKeyword: 'ejercicio red team España',
    tagline: 'Simulación de ataques avanzados',
    headline: 'Red Team: simulamos un ataque real completo contra tu organización',
    description: 'Ejercicio ofensivo integral que combina OSINT, ingeniería social, phishing, intrusión y movimiento lateral para evaluar la capacidad real de detección y respuesta de tu empresa.',
    priceFrom: '15.000 €',
    duration: '4-8 semanas',
    certifications: ['CRTO', 'BSCP', 'eJPT'],
    whatIs: {
      title: '¿Qué es un ejercicio de Red Team?',
      paragraphs: [
        'Un ejercicio de Red Team es la simulación más realista de un ciberataque. A diferencia de un pentesting (que evalúa un activo concreto), el Red Team busca comprometer objetivos de negocio específicos simulando las tácticas, técnicas y procedimientos (TTPs) de grupos de amenazas reales.',
        'El alcance es total: OSINT sobre la organización, campañas de phishing dirigido, explotación de vulnerabilidades, acceso físico (si aplica), movimiento lateral, escalada de privilegios y exfiltración de datos. El objetivo es evaluar personas, procesos y tecnología simultáneamente.',
        'Al finalizar, tu organización obtiene una visión real de su postura de seguridad: qué alertas saltaron y cuáles no, cómo respondió el equipo de seguridad, y un roadmap de mejoras basado en escenarios de ataque reales.',
      ],
    },
    deliverables: [
      { title: 'Campaña OSINT completa', description: 'Informe de inteligencia sobre la superficie de ataque pública: empleados, tecnologías, filtraciones, redes sociales y vectores de ingeniería social.', icon: ICONS.eye },
      { title: 'Campaña de phishing dirigido', description: 'Diseño y ejecución de campañas de spear phishing personalizadas para evaluar la concienciación de empleados y obtener acceso inicial.', icon: ICONS.users },
      { title: 'Informe de ataque completo', description: 'Documentación cronológica de todo el ejercicio: desde el reconocimiento inicial hasta los objetivos alcanzados, con timeline MITRE ATT&CK.', icon: ICONS.report },
      { title: 'Evaluación de detección', description: 'Análisis de qué acciones fueron detectadas por el SOC/equipo de seguridad y cuáles pasaron desapercibidas, con recomendaciones de mejora.', icon: ICONS.shield },
      { title: 'Purple Team session', description: 'Sesión colaborativa con tu equipo de seguridad para revisar cada fase del ataque, mejorar detecciones y fortalecer procedimientos de respuesta.', icon: ICONS.chart },
    ],
    methodology: {
      title: 'Metodología de Red Team',
      framework: 'MITRE ATT&CK + Cyber Kill Chain',
      steps: [
        { step: 1, title: 'Reconocimiento (OSINT)', description: 'Investigación exhaustiva de la organización: empleados clave, tecnologías, presencia digital, filtraciones de datos y vectores de entrada potenciales.' },
        { step: 2, title: 'Acceso inicial', description: 'Ejecución de campañas de phishing dirigido, explotación de servicios expuestos o ingeniería social para obtener el primer punto de acceso a la red.' },
        { step: 3, title: 'Establecimiento y persistencia', description: 'Instalación de mecanismos de persistencia, evasión de antivirus y EDR, y establecimiento de canales de comunicación encubiertos (C2).' },
        { step: 4, title: 'Movimiento lateral y escalada', description: 'Exploración de la red interna, compromiso de credenciales, escalada de privilegios hasta Domain Admin y acceso a activos críticos definidos como objetivo.' },
        { step: 5, title: 'Exfiltración y reporting', description: 'Demostración de impacto mediante exfiltración controlada de datos objetivo, documentación completa del ejercicio y sesión Purple Team con tu equipo.' },
      ],
    },
    faqs: [
      { question: '¿Cuál es la diferencia entre pentesting y Red Team?', answer: 'Un pentesting evalúa la seguridad de un activo concreto (web, red, app). Un Red Team simula un ataque completo contra la organización, evaluando personas, procesos y tecnología. El pentesting busca vulnerabilidades; el Red Team evalúa tu capacidad de detectar y responder a un ataque real.' },
      { question: '¿Quién en nuestra empresa debe saber del ejercicio?', answer: 'Solo la dirección y un contacto de emergencia designado. El ejercicio es más realista si el equipo de seguridad no sabe que se está realizando (excepto el responsable designado). Esto permite evaluar la capacidad real de detección y respuesta.' },
      { question: '¿Incluye intrusión física?', answer: 'Puede incluirse si el alcance lo requiere: intento de acceso a oficinas, colocación de dispositivos, tailgating o dumpster diving. Se acuerda previamente con la dirección y se establecen límites claros para proteger la seguridad del equipo.' },
      { question: '¿Qué es una sesión Purple Team?', answer: 'Es una sesión colaborativa donde nuestro equipo ofensivo (Red) trabaja con tu equipo defensivo (Blue) para revisar cada fase del ataque. Se analizan las detecciones que funcionaron, las que fallaron, y se diseñan mejoras de seguridad basadas en los hallazgos reales.' },
    ],
    relatedSlugs: ['pentesting-infraestructura', 'pentesting-web', 'concienciacion-formacion'],
    ctaText: 'Solicitar ejercicio de Red Team',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. PENTESTING AS A SERVICE (PaaS)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'pentesting-as-a-service',
    title: 'Pentesting as a Service (PaaS)',
    shortTitle: 'PaaS',
    area: 'cybersecurity',
    metaTitle: 'Pentesting as a Service (PaaS): Seguridad continua bajo suscripción',
    metaDescription: 'Pentesting as a Service: suscripción anual con 2-3 ciclos de pentesting, monitorización continua e informes trimestrales. Desde 12.000 €/año.',
    seoKeyword: 'PtaaS España',
    tagline: 'Seguridad continua bajo suscripción',
    headline: 'Pentesting as a Service: seguridad ofensiva continua para tu empresa',
    description: 'Suscripción anual de seguridad ofensiva que incluye ciclos de pentesting recurrentes, monitorización continua de superficie de ataque e informes trimestrales de estado.',
    priceFrom: '12.000 €/año',
    duration: 'Suscripción anual',
    certifications: ['CRTO', 'BSCP', 'eJPT'],
    whatIs: {
      title: '¿Qué es el Pentesting as a Service?',
      paragraphs: [
        'El Pentesting as a Service (PaaS o PTaaS) es un modelo de suscripción que proporciona seguridad ofensiva continua en lugar de auditorías puntuales. Tu empresa cuenta con acceso permanente a nuestro equipo de pentesting, ciclos de evaluación recurrentes y monitorización constante de tu superficie de ataque.',
        'Las amenazas evolucionan a diario y tu aplicación cambia con cada despliegue. Un pentesting puntual queda obsoleto en semanas. El PaaS garantiza que cada nuevo cambio, funcionalidad o integración se evalúa de forma continua, manteniendo tu nivel de seguridad constantemente actualizado.',
        'El modelo incluye 2-3 ciclos completos de pentesting al año, escaneos de seguridad continuos, alertas proactivas ante nuevas vulnerabilidades y un interlocutor dedicado que conoce tu infraestructura y evolución técnica.',
      ],
    },
    deliverables: [
      { title: '2-3 ciclos de pentesting/año', description: 'Pentesting completo ejecutado en cada ciclo: web, infraestructura o móvil según las necesidades y cambios realizados.', icon: ICONS.clock },
      { title: 'Monitorización de superficie', description: 'Escaneo continuo de activos expuestos, detección de nuevos subdominios, puertos abiertos y cambios en la superficie de ataque.', icon: ICONS.eye },
      { title: 'Informes trimestrales', description: 'Informe ejecutivo trimestral con evolución del riesgo, nuevas vulnerabilidades detectadas, estado de remediaciones y recomendaciones.', icon: ICONS.report },
      { title: 'Interlocutor dedicado', description: 'Consultor de seguridad asignado que conoce tu infraestructura, atiende consultas y coordina los ciclos de evaluación.', icon: ICONS.users },
      { title: 'Retesting ilimitado', description: 'Verificación de correcciones sin límite durante toda la suscripción, para confirmar que cada vulnerabilidad se resuelve correctamente.', icon: ICONS.check },
      { title: 'Alertas proactivas', description: 'Notificación inmediata cuando se publica un CVE que afecta a las tecnologías de tu stack o se detecta un cambio en tu superficie de ataque.', icon: ICONS.bolt },
    ],
    methodology: {
      title: 'Cómo funciona el PaaS',
      framework: 'Ciclo continuo de evaluación',
      steps: [
        { step: 1, title: 'Onboarding', description: 'Inventario de activos, definición de alcance, configuración de monitorización continua y planificación del primer ciclo de pentesting.' },
        { step: 2, title: 'Primer ciclo de pentesting', description: 'Evaluación completa inicial que establece la línea base de seguridad: identificación de vulnerabilidades existentes y plan de remediación.' },
        { step: 3, title: 'Monitorización continua', description: 'Escaneo permanente de superficie de ataque, detección de cambios, alertas ante nuevas vulnerabilidades y seguimiento de remediaciones pendientes.' },
        { step: 4, title: 'Ciclos recurrentes', description: 'Pentesting adicionales centrados en nuevas funcionalidades, cambios de infraestructura o re-evaluación de áreas previamente vulnerables.' },
        { step: 5, title: 'Reporting y mejora', description: 'Informes trimestrales de evolución, reuniones de seguimiento con tu equipo y actualización continua del plan de seguridad.' },
      ],
    },
    faqs: [
      { question: '¿En qué se diferencia el PaaS de contratar pentestings puntuales?', answer: 'El PaaS proporciona continuidad: monitorización permanente, respuesta rápida ante cambios, retesting ilimitado y un equipo que conoce tu infraestructura. Los pentesting puntuales son fotos fijas que quedan obsoletas rápidamente. El PaaS es como tener un equipo de seguridad ofensiva dedicado.' },
      { question: '¿Puedo elegir qué se evalúa en cada ciclo?', answer: 'Sí. Cada ciclo se planifica conjuntamente según tus prioridades: nuevas funcionalidades desplegadas, cambios de infraestructura, requisitos de compliance o áreas que necesitan re-evaluación. El interlocutor dedicado te asesora sobre las prioridades.' },
      { question: '¿Qué incluye la monitorización de superficie de ataque?', answer: 'Escaneo continuo de activos expuestos: descubrimiento de subdominios, puertos abiertos, certificados SSL, tecnologías detectadas y comparación con bases de datos de vulnerabilidades conocidas. Recibes alertas cuando se detecta un cambio o una nueva exposición.' },
      { question: '¿Tiene un compromiso de permanencia?', answer: 'La suscripción es anual con renovación voluntaria. Si no estás satisfecho, no hay penalización por no renovar. Nuestro objetivo es que la renovación sea una decisión obvia por el valor que aportamos, no por un contrato vinculante.' },
    ],
    relatedSlugs: ['pentesting-web', 'pentesting-infraestructura', 'auditoria-seguridad'],
    ctaText: 'Solicitar información sobre PaaS',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. AUDITORÍA DE SEGURIDAD
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'auditoria-seguridad',
    title: 'Auditoría de Seguridad',
    shortTitle: 'Auditoría',
    area: 'cybersecurity',
    metaTitle: 'Auditoría de Seguridad Informática: Evaluación integral',
    metaDescription: 'Auditoría de seguridad informática completa. Evaluamos el estado de tu infraestructura, políticas y controles de seguridad. Informe ejecutivo con hoja de ruta.',
    seoKeyword: 'auditoría de seguridad informática',
    tagline: 'Evaluación integral de seguridad',
    headline: 'Auditoría de Seguridad: conoce el estado real de tu ciberseguridad',
    description: 'Evaluación completa del estado de seguridad de tu organización: infraestructura, políticas, controles técnicos y cumplimiento normativo, con un plan de mejora priorizado.',
    priceFrom: '2.500 €',
    duration: '1-3 semanas',
    certifications: ['CRTO', 'BSCP', 'eJPT'],
    whatIs: {
      title: '¿Qué es una auditoría de seguridad?',
      paragraphs: [
        'Una auditoría de seguridad es una evaluación integral del estado de ciberseguridad de tu organización. A diferencia de un pentesting (que es ofensivo y busca explotar vulnerabilidades), la auditoría tiene un enfoque más amplio: evalúa políticas, procedimientos, controles técnicos, configuraciones y nivel de cumplimiento normativo.',
        'Es el punto de partida ideal para empresas que necesitan entender su postura de seguridad actual antes de invertir en medidas específicas. El resultado es un mapa completo de riesgos con una hoja de ruta priorizada para mejorar la seguridad de forma eficiente.',
        'Nuestra auditoría combina revisión documental, análisis técnico de configuraciones, evaluación de vulnerabilidades y entrevistas con los responsables de TI para obtener una visión 360° de tu seguridad.',
      ],
    },
    deliverables: [
      { title: 'Evaluación de políticas', description: 'Revisión de políticas de seguridad existentes, procedimientos de gestión de incidentes, backup, control de accesos y gestión de parches.', icon: ICONS.report },
      { title: 'Análisis de configuraciones', description: 'Revisión de configuraciones de servidores, firewalls, endpoints, correo electrónico, DNS y servicios cloud.', icon: ICONS.server },
      { title: 'Escaneo de vulnerabilidades', description: 'Análisis automatizado y validación manual de vulnerabilidades en la infraestructura, aplicaciones y servicios expuestos.', icon: ICONS.shield },
      { title: 'Mapa de riesgos', description: 'Clasificación de todos los hallazgos por nivel de riesgo (crítico, alto, medio, bajo) con impacto en el negocio y probabilidad de explotación.', icon: ICONS.chart },
      { title: 'Hoja de ruta de mejora', description: 'Plan de acción priorizado con quick wins (mejoras inmediatas), acciones a corto plazo y proyectos a medio plazo para mejorar tu postura de seguridad.', icon: ICONS.check },
    ],
    methodology: {
      title: 'Metodología de auditoría',
      framework: 'ISO 27001 + CIS Controls',
      steps: [
        { step: 1, title: 'Inventario y alcance', description: 'Identificación de todos los activos, sistemas, aplicaciones y datos críticos. Definición del alcance de la auditoría según prioridades del negocio.' },
        { step: 2, title: 'Revisión documental', description: 'Análisis de políticas de seguridad, procedimientos operativos, planes de respuesta a incidentes y documentación de configuraciones existentes.' },
        { step: 3, title: 'Evaluación técnica', description: 'Revisión de configuraciones de seguridad, escaneo de vulnerabilidades, análisis de arquitectura de red y evaluación de controles de acceso.' },
        { step: 4, title: 'Análisis de gaps', description: 'Identificación de brechas entre el estado actual y las mejores prácticas (CIS Controls, ISO 27001), normativas aplicables y el nivel de riesgo aceptable.' },
        { step: 5, title: 'Informe y hoja de ruta', description: 'Entrega de informe ejecutivo con mapa de riesgos, hallazgos priorizados y hoja de ruta de mejora con estimaciones de esfuerzo y coste.' },
      ],
    },
    faqs: [
      { question: '¿Cuál es la diferencia entre auditoría de seguridad y pentesting?', answer: 'La auditoría evalúa el estado general de seguridad (políticas, configuraciones, controles, compliance). El pentesting es un ejercicio ofensivo que intenta explotar vulnerabilidades específicas. La auditoría es más amplia; el pentesting es más profundo en un área concreta. Ambos son complementarios.' },
      { question: '¿Necesito una auditoría si ya hago pentesting?', answer: 'Sí. El pentesting evalúa vulnerabilidades técnicas específicas, pero no cubre políticas, procedimientos, gestión de parches, formación de empleados o cumplimiento normativo. La auditoría proporciona la visión completa que el pentesting no puede ofrecer.' },
      { question: '¿La auditoría me sirve para cumplir con ENS o NIS2?', answer: 'Es un excelente punto de partida. La auditoría identifica las brechas de cumplimiento y genera una hoja de ruta para alcanzar el nivel requerido. Para la implementación completa del cumplimiento, recomendamos nuestro servicio de Cumplimiento Normativo.' },
      { question: '¿Cuánto tiempo necesitáis para completar la auditoría?', answer: 'Entre 1 y 3 semanas dependiendo del alcance. Una PYME con infraestructura sencilla puede auditarse en una semana. Organizaciones más grandes o con requisitos regulatorios específicos pueden necesitar 2-3 semanas.' },
    ],
    relatedSlugs: ['pentesting-web', 'cumplimiento-normativo', 'pentesting-as-a-service'],
    ctaText: 'Solicitar auditoría de seguridad',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. CUMPLIMIENTO NORMATIVO
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'cumplimiento-normativo',
    title: 'Cumplimiento Normativo',
    shortTitle: 'Compliance',
    area: 'cybersecurity',
    metaTitle: 'Cumplimiento Normativo: ENS, NIS2, GDPR, DORA, PCI DSS',
    metaDescription: 'Consultoría de cumplimiento normativo en ciberseguridad: ENS, NIS2, GDPR, DORA y PCI DSS. Análisis de gaps, implementación y preparación para certificación.',
    seoKeyword: 'cumplimiento ENS',
    tagline: 'Cumplimiento regulatorio en ciberseguridad',
    headline: 'Cumplimiento Normativo: ENS, NIS2, GDPR, DORA y PCI DSS sin complicaciones',
    description: 'Te ayudamos a cumplir con las normativas de ciberseguridad que afectan a tu sector: análisis de gaps, implementación de controles, documentación y preparación para auditorías externas.',
    priceFrom: '8.000 €',
    duration: '2-6 meses',
    certifications: ['CRTO', 'BSCP'],
    whatIs: {
      title: '¿Por qué necesitas cumplir con normativas de ciberseguridad?',
      paragraphs: [
        'Las normativas de ciberseguridad (ENS, NIS2, GDPR, DORA, PCI DSS) no son solo requisitos legales: son el marco mínimo de seguridad que tu organización necesita para operar con garantías. El incumplimiento conlleva sanciones económicas, responsabilidad legal y pérdida de confianza de clientes y partners.',
        'La directiva NIS2, en vigor desde 2024, amplía significativamente las organizaciones obligadas a cumplir y endurece las sanciones. El Esquema Nacional de Seguridad (ENS) es obligatorio para toda la Administración Pública y sus proveedores tecnológicos. PCI DSS es requisito para cualquier empresa que procese datos de tarjetas de pago.',
        'Nuestro enfoque es práctico: identificamos exactamente qué controles necesitas implementar, priorizamos por riesgo e impacto regulatorio, y te acompañamos durante todo el proceso hasta la certificación o auditoría de cumplimiento.',
      ],
    },
    deliverables: [
      { title: 'Análisis de gaps', description: 'Evaluación del estado actual vs los requisitos de la normativa aplicable. Identificación precisa de las brechas de cumplimiento.', icon: ICONS.chart },
      { title: 'Plan de implementación', description: 'Hoja de ruta priorizada con controles a implementar, responsables, plazos y estimación de recursos necesarios.', icon: ICONS.report },
      { title: 'Documentación requerida', description: 'Elaboración de políticas, procedimientos, registros y documentación que la normativa exige: política de seguridad, plan de respuesta, gestión de riesgos.', icon: ICONS.code },
      { title: 'Implementación técnica', description: 'Asistencia en la implementación de controles técnicos requeridos: gestión de accesos, cifrado, monitorización, backup y gestión de vulnerabilidades.', icon: ICONS.shield },
      { title: 'Preparación para auditoría', description: 'Simulacro de auditoría externa, revisión de evidencias, corrección de no conformidades y acompañamiento durante la auditoría de certificación.', icon: ICONS.check },
    ],
    methodology: {
      title: 'Proceso de cumplimiento',
      framework: 'ISO 27001 + Normativa específica',
      steps: [
        { step: 1, title: 'Análisis de aplicabilidad', description: 'Determinamos qué normativas aplican a tu organización según sector, tamaño, datos que manejas y relaciones con la Administración Pública.' },
        { step: 2, title: 'Gap analysis', description: 'Evaluación exhaustiva del estado actual vs requisitos normativos. Identificación de brechas y clasificación por criticidad y esfuerzo de implementación.' },
        { step: 3, title: 'Plan de acción', description: 'Diseño de hoja de ruta con controles a implementar priorizados, responsables, plazos y presupuesto estimado para cada fase.' },
        { step: 4, title: 'Implementación', description: 'Acompañamiento en la implementación de controles técnicos, elaboración de documentación requerida y formación del personal implicado.' },
        { step: 5, title: 'Auditoría y certificación', description: 'Simulacro pre-auditoría, corrección de no conformidades y acompañamiento durante el proceso de certificación o auditoría oficial.' },
      ],
    },
    faqs: [
      { question: '¿Qué normativas aplican a mi empresa?', answer: 'Depende de tu sector y actividad. NIS2 aplica a sectores esenciales e importantes (energía, transporte, salud, digital, finanzas). ENS es obligatorio si trabajas con la Administración Pública. PCI DSS si procesas pagos con tarjeta. GDPR aplica a todas las empresas que tratan datos personales. Te ayudamos a identificar exactamente qué normativas te afectan.' },
      { question: '¿Cuánto tiempo lleva obtener el cumplimiento?', answer: 'Varía según la normativa y el estado actual de la organización. Un gap analysis inicial se completa en 2-4 semanas. La implementación completa puede llevar de 2 a 6 meses. Priorizamos los controles de mayor riesgo para que obtengas valor desde el primer mes.' },
      { question: '¿Qué sanciones hay por incumplimiento?', answer: 'NIS2 contempla multas de hasta 10 millones de euros o el 2% de la facturación global. GDPR hasta 20 millones o el 4% de la facturación. ENS puede conllevar exclusión de contratación pública. Además del impacto reputacional y la responsabilidad personal de los directivos.' },
      { question: '¿Necesito una certificación formal?', answer: 'No siempre. ENS requiere certificación formal por una entidad acreditada. NIS2 exige demostrar cumplimiento pero no necesariamente una certificación. PCI DSS tiene niveles de cumplimiento según volumen de transacciones. Te asesoramos sobre qué nivel de formalización necesitas.' },
    ],
    relatedSlugs: ['auditoria-seguridad', 'pentesting-web', 'concienciacion-formacion'],
    ctaText: 'Solicitar consultoría de cumplimiento',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. CONCIENCIACIÓN Y FORMACIÓN
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'concienciacion-formacion',
    title: 'Concienciación y Formación',
    shortTitle: 'Formación',
    area: 'cybersecurity',
    metaTitle: 'Concienciación en Ciberseguridad: Formación y simulaciones de phishing',
    metaDescription: 'Programas de concienciación en ciberseguridad para empresas: simulaciones de phishing, formación técnica y plataforma Trackfy para seguimiento continuo.',
    seoKeyword: 'formación ciberseguridad empleados',
    tagline: 'El factor humano de la ciberseguridad',
    headline: 'Concienciación y Formación: convierte a tus empleados en tu primera línea de defensa',
    description: 'Programas de concienciación con simulaciones de phishing reales, formación técnica adaptada y nuestra plataforma Trackfy para medir y mejorar la cultura de seguridad.',
    priceFrom: '3.000 €',
    duration: 'Programa continuo o puntual',
    certifications: ['CRTO', 'BSCP'],
    whatIs: {
      title: '¿Por qué invertir en concienciación de ciberseguridad?',
      paragraphs: [
        'El 90% de los ciberataques exitosos comienzan con un error humano: un clic en un enlace de phishing, una contraseña reutilizada o un documento malicioso abierto sin verificar. La tecnología es necesaria pero no suficiente si tus empleados no saben identificar las amenazas.',
        'Nuestros programas combinan simulaciones de phishing realistas (basadas en técnicas que usamos en ejercicios de Red Team reales), formación práctica adaptada al nivel técnico de cada departamento y nuestra plataforma Trackfy que monitoriza el nivel de concienciación de forma continua.',
        'El resultado es una reducción medible del riesgo humano: menor tasa de clics en phishing, mejor gestión de contraseñas, reporte proactivo de incidentes sospechosos y una cultura de seguridad integrada en el día a día de la organización.',
      ],
    },
    deliverables: [
      { title: 'Simulaciones de phishing', description: 'Campañas periódicas de phishing simulado personalizadas para tu sector y organización, con métricas de apertura, clic y reporte.', icon: ICONS.users },
      { title: 'Formación presencial/online', description: 'Sesiones de formación adaptadas por departamento: directivos, equipos técnicos, administración y personal general. Online o presencial.', icon: ICONS.academic },
      { title: 'Plataforma Trackfy', description: 'Acceso a nuestra plataforma de concienciación con IA: cursos interactivos, quizzes, seguimiento individual y métricas de evolución del equipo.', icon: ICONS.cpu },
      { title: 'Informe de métricas', description: 'Dashboard con KPIs de concienciación: tasa de phishing, evolución temporal, departamentos de mayor riesgo y recomendaciones de mejora.', icon: ICONS.chart },
      { title: 'Material de refuerzo', description: 'Infografías, pósters, newsletters y contenido periódico de seguridad adaptado a tu organización para mantener la concienciación activa.', icon: ICONS.report },
    ],
    methodology: {
      title: 'Programa de concienciación',
      framework: 'NIST SP 800-50 + metodología propia',
      steps: [
        { step: 1, title: 'Evaluación inicial', description: 'Medición del nivel de concienciación actual mediante campaña de phishing simulado y cuestionario de seguridad. Establecimiento de línea base.' },
        { step: 2, title: 'Plan de formación', description: 'Diseño del programa adaptado a tu organización: contenido por departamento, frecuencia de simulaciones y objetivos de mejora medibles.' },
        { step: 3, title: 'Formación y simulaciones', description: 'Ejecución de sesiones formativas y campañas de phishing periódicas con escenarios realistas y relevantes para tu sector.' },
        { step: 4, title: 'Seguimiento con Trackfy', description: 'Monitorización continua del nivel de concienciación a través de nuestra plataforma: cursos, quizzes, microlearning y métricas individuales.' },
        { step: 5, title: 'Reporting y mejora', description: 'Informes periódicos con evolución de métricas, identificación de áreas de mejora y ajuste del programa según resultados obtenidos.' },
      ],
    },
    faqs: [
      { question: '¿Qué es Trackfy?', answer: 'Trackfy es nuestra plataforma propia de concienciación en ciberseguridad con inteligencia artificial. Ofrece cursos interactivos, simulaciones de phishing, quizzes adaptativos y un dashboard de métricas para que los responsables de seguridad monitoricen el nivel de concienciación de toda la organización.' },
      { question: '¿Con qué frecuencia se hacen las simulaciones de phishing?', answer: 'Recomendamos campañas mensuales o bimensuales para mantener la alerta. Cada campaña usa plantillas diferentes y técnicas actualizadas. La frecuencia se ajusta según el sector (financiero o salud suelen necesitar más frecuencia) y los resultados obtenidos.' },
      { question: '¿La formación se adapta a diferentes perfiles?', answer: 'Sí. El contenido y nivel técnico se adapta: directivos (riesgos de negocio, ingeniería social dirigida), equipos técnicos (seguridad en desarrollo, configuraciones), administración (phishing, gestión de datos) y personal general (buenas prácticas, contraseñas, dispositivos).' },
      { question: '¿Cómo se mide la efectividad del programa?', answer: 'Mediante KPIs cuantificables: reducción de la tasa de clic en phishing, aumento del reporte proactivo de emails sospechosos, mejora en scores de Trackfy y reducción de incidentes relacionados con el factor humano. Proporcionamos informes con evolución temporal.' },
    ],
    relatedSlugs: ['red-team', 'auditoria-seguridad', 'cumplimiento-normativo'],
    ctaText: 'Solicitar programa de concienciación',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. DESARROLLO WEB
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'desarrollo-web',
    title: 'Desarrollo Web Seguro',
    shortTitle: 'Desarrollo Web',
    area: 'digital',
    metaTitle: 'Desarrollo Web Seguro: Sitios web con seguridad integrada',
    metaDescription: 'Desarrollo web profesional con auditoría de seguridad incluida. Landings, webs corporativas y e-commerce con security by design desde el primer día.',
    seoKeyword: 'desarrollo web seguro',
    tagline: 'Desarrollo web con seguridad integrada',
    headline: 'Desarrollo Web Seguro: tu sitio web con seguridad incluida desde el día uno',
    description: 'Diseñamos y desarrollamos sitios web profesionales con auditoría de seguridad integrada. Cada proyecto incluye pentesting de la aplicación antes de su lanzamiento.',
    priceFrom: '3.000 €',
    duration: '4-12 semanas',
    certifications: ['BSCP'],
    whatIs: {
      title: '¿Por qué elegir desarrollo web con seguridad integrada?',
      paragraphs: [
        'La mayoría de los sitios web se desarrollan primero y se auditan después (si es que se auditan). Esto genera costes extra de remediación, retrasos en el lanzamiento y riesgos de seguridad en producción. Nuestro enfoque Security by Design integra las mejores prácticas de seguridad desde la primera línea de código.',
        'Cada proyecto web incluye una auditoría de seguridad antes del lanzamiento: pentesting de la aplicación, revisión de configuraciones del servidor y verificación de headers de seguridad. Lanzas tu web con la garantía de que ha sido evaluada por el mismo equipo que hace pentesting profesional.',
        'Desarrollamos con tecnologías modernas (Astro, Next.js, React) optimizadas para rendimiento y SEO, desplegadas en infraestructuras seguras (Cloudflare, AWS) con HTTPS, headers de seguridad y protección contra los ataques más comunes.',
      ],
    },
    deliverables: [
      { title: 'Diseño UX/UI personalizado', description: 'Diseño responsive orientado a conversión con identidad visual adaptada a tu marca, optimizado para todos los dispositivos.', icon: ICONS.device },
      { title: 'Desarrollo frontend y backend', description: 'Implementación con tecnologías modernas: Astro, Next.js o React según necesidades. CMS headless si necesitas gestionar contenido.', icon: ICONS.code },
      { title: 'Auditoría de seguridad pre-launch', description: 'Pentesting de la aplicación antes del lanzamiento: evaluación OWASP, revisión de configuraciones y verificación de headers de seguridad.', icon: ICONS.shield },
      { title: 'Optimización SEO técnico', description: 'Implementación de SEO técnico: meta tags, schema markup, sitemap, robots.txt, Core Web Vitals y velocidad de carga optimizada.', icon: ICONS.chart },
      { title: 'Despliegue seguro', description: 'Configuración de hosting, SSL/TLS, headers de seguridad (CSP, HSTS), CDN y monitorización de disponibilidad.', icon: ICONS.server },
    ],
    methodology: {
      title: 'Proceso de desarrollo web seguro',
      framework: 'Security by Design + Agile',
      steps: [
        { step: 1, title: 'Discovery y requisitos', description: 'Definición de objetivos, arquitectura de información, funcionalidades requeridas y requisitos de seguridad específicos del proyecto.' },
        { step: 2, title: 'Diseño UX/UI', description: 'Wireframes, diseño visual y prototipo interactivo con enfoque mobile-first y orientado a conversión. Revisión y aprobación contigo.' },
        { step: 3, title: 'Desarrollo', description: 'Implementación iterativa con revisiones semanales. Código seguro desde el primer sprint: validación de inputs, autenticación, autorización y manejo seguro de datos.' },
        { step: 4, title: 'Auditoría de seguridad', description: 'Pentesting de la aplicación por nuestro equipo de ciberseguridad: evaluación OWASP, configuraciones del servidor y hardening previo al lanzamiento.' },
        { step: 5, title: 'Lanzamiento y soporte', description: 'Despliegue en producción con configuración de seguridad completa, monitorización y soporte post-lanzamiento incluido.' },
      ],
    },
    faqs: [
      { question: '¿Qué tecnologías utilizáis?', answer: 'Trabajamos con tecnologías modernas según cada proyecto: Astro para webs estáticas y de contenido, Next.js para aplicaciones dinámicas, React para interfaces complejas. CMS headless (Sanity, Strapi) cuando necesitas gestionar contenido. Todo desplegado en Cloudflare Pages, Vercel o AWS.' },
      { question: '¿Incluye realmente un pentesting?', answer: 'Sí. Antes del lanzamiento, nuestro equipo de ciberseguridad ejecuta un pentesting de la aplicación siguiendo metodología OWASP. Es el mismo equipo y la misma calidad que nuestro servicio de pentesting web independiente, integrado en el proceso de desarrollo.' },
      { question: '¿Puedo gestionar el contenido yo mismo?', answer: 'Sí. Si necesitas actualizar contenido regularmente, implementamos un CMS headless (Sanity, Strapi) con un panel de administración intuitivo y formación para tu equipo. Para webs más estáticas, entregamos el código fuente documentado.' },
      { question: '¿Incluye SEO?', answer: 'Sí, implementamos SEO técnico completo: meta tags, Open Graph, schema markup (JSON-LD), sitemap XML, robots.txt, Core Web Vitals optimizados y velocidad de carga. El SEO de contenido (redacción de textos) puede incluirse como servicio adicional.' },
    ],
    relatedSlugs: ['pentesting-web', 'desarrollo-movil', 'chatbots-ia'],
    ctaText: 'Solicitar presupuesto web',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. DESARROLLO MÓVIL
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'desarrollo-movil',
    title: 'Desarrollo Móvil Seguro',
    shortTitle: 'Desarrollo Móvil',
    area: 'digital',
    metaTitle: 'Desarrollo de Aplicaciones Móviles Seguras: Android e iOS',
    metaDescription: 'Desarrollo de apps móviles nativas e híbridas con pentesting incluido pre-lanzamiento. Aplicaciones seguras desde el diseño hasta la publicación en stores.',
    seoKeyword: 'desarrollo app móvil segura',
    tagline: 'Aplicaciones móviles con seguridad nativa',
    headline: 'Desarrollo Móvil Seguro: apps Android e iOS con pentesting pre-lanzamiento',
    description: 'Desarrollamos aplicaciones móviles nativas e híbridas con seguridad integrada en cada fase. Pentesting completo incluido antes de la publicación en App Store y Google Play.',
    priceFrom: '8.000 €',
    duration: '8-16 semanas',
    certifications: ['BSCP', 'eJPT'],
    whatIs: {
      title: '¿Por qué tu app necesita seguridad desde el diseño?',
      paragraphs: [
        'Las aplicaciones móviles operan en un entorno hostil: el dispositivo del usuario. A diferencia de una web, el binario de tu app puede ser descargado, decompilado y analizado por cualquiera. Si la seguridad no está integrada desde el diseño, un atacante encontrará credenciales, APIs expuestas o lógica de negocio vulnerable.',
        'Nuestro desarrollo móvil aplica OWASP MASVS (Mobile Application Security Verification Standard) desde la primera fase: almacenamiento seguro de datos, comunicaciones cifradas, autenticación robusta, protección del binario y detección de entornos manipulados (root/jailbreak).',
        'Antes de la publicación en stores, nuestro equipo de ciberseguridad ejecuta un pentesting móvil completo de la app. Lanzas tu aplicación con la confianza de que ha sido evaluada por especialistas en seguridad ofensiva.',
      ],
    },
    deliverables: [
      { title: 'App nativa o híbrida', description: 'Desarrollo en Flutter, React Native o nativo (Kotlin/Swift) según requisitos de rendimiento, complejidad y presupuesto del proyecto.', icon: ICONS.device },
      { title: 'Backend y APIs', description: 'Desarrollo del backend con APIs seguras: autenticación, autorización, rate limiting, validación de inputs y manejo seguro de datos sensibles.', icon: ICONS.server },
      { title: 'Pentesting pre-lanzamiento', description: 'Pentesting completo de la app (SAST + DAST) y las APIs antes de la publicación en stores. Misma calidad que nuestro pentesting móvil independiente.', icon: ICONS.shield },
      { title: 'Publicación en stores', description: 'Gestión del proceso de publicación en App Store y Google Play: assets, descripciones, screenshots y cumplimiento de políticas de stores.', icon: ICONS.globe },
      { title: 'Mantenimiento y soporte', description: 'Soporte post-lanzamiento, corrección de bugs, actualizaciones de seguridad y adaptación a nuevas versiones de iOS/Android.', icon: ICONS.cog },
    ],
    methodology: {
      title: 'Proceso de desarrollo móvil seguro',
      framework: 'OWASP MASVS + Agile',
      steps: [
        { step: 1, title: 'Discovery y UX', description: 'Definición de funcionalidades, flujos de usuario, arquitectura técnica y requisitos de seguridad. Prototipo interactivo y validación.' },
        { step: 2, title: 'Desarrollo iterativo', description: 'Sprints de 2 semanas con demos funcionales. Almacenamiento seguro, comunicaciones cifradas, autenticación robusta y código ofuscado desde el inicio.' },
        { step: 3, title: 'Testing y QA', description: 'Testing funcional, testing de rendimiento y testing de compatibilidad en múltiples dispositivos y versiones de SO.' },
        { step: 4, title: 'Pentesting de seguridad', description: 'Análisis estático y dinámico por nuestro equipo de ciberseguridad: ingeniería inversa, interceptación de tráfico, evaluación de almacenamiento y autenticación.' },
        { step: 5, title: 'Publicación y soporte', description: 'Publicación en stores con configuración de seguridad optimizada, monitorización de rendimiento y soporte post-lanzamiento continuo.' },
      ],
    },
    faqs: [
      { question: '¿Nativo o híbrido?', answer: 'Depende del proyecto. Para apps con requisitos de rendimiento alto o acceso intensivo a hardware, recomendamos nativo (Kotlin/Swift). Para la mayoría de apps de negocio, Flutter o React Native ofrecen excelente rendimiento con desarrollo más rápido y un solo código base. Te asesoramos según tu caso.' },
      { question: '¿El pentesting realmente lo hace otro equipo?', answer: 'Sí. El pentesting lo ejecuta nuestro equipo de ciberseguridad, no los mismos desarrolladores. Esto garantiza una evaluación objetiva e independiente. Es la misma calidad, metodología y rigor que nuestro servicio de pentesting móvil independiente.' },
      { question: '¿Incluye el backend/API?', answer: 'Sí. Desarrollamos la app completa: frontend móvil + backend con APIs + panel de administración si es necesario. Todo con seguridad integrada. El pentesting pre-lanzamiento también cubre las APIs y el backend.' },
      { question: '¿Cuánto cuesta mantener una app tras el lanzamiento?', answer: 'Ofrecemos planes de mantenimiento mensuales que incluyen actualizaciones de seguridad, corrección de bugs, adaptación a nuevas versiones de iOS/Android y soporte técnico. El coste depende de la complejidad de la app pero suele estar entre 500-1.500 €/mes.' },
    ],
    relatedSlugs: ['pentesting-movil', 'desarrollo-web', 'automatizacion-apis'],
    ctaText: 'Solicitar presupuesto de app',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. CHATBOTS E IA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'chatbots-ia',
    title: 'Chatbots e Inteligencia Artificial',
    shortTitle: 'Chatbots IA',
    area: 'digital',
    metaTitle: 'Chatbots con IA para Empresas: Automatización con seguridad',
    metaDescription: 'Desarrollo de chatbots inteligentes para atención al cliente, soporte y ventas. Integración con LLMs, WhatsApp, web y CRM. Seguridad de datos garantizada.',
    seoKeyword: 'chatbot IA empresa',
    tagline: 'Inteligencia artificial aplicada al negocio',
    headline: 'Chatbots e IA: automatiza la atención al cliente con inteligencia artificial segura',
    description: 'Desarrollamos chatbots inteligentes integrados con LLMs (GPT, Claude) para atención al cliente, soporte técnico y ventas. Con seguridad de datos garantizada.',
    priceFrom: '4.000 €',
    duration: '4-8 semanas',
    certifications: [],
    whatIs: {
      title: '¿Cómo puede un chatbot con IA transformar tu negocio?',
      paragraphs: [
        'Un chatbot con IA no es un bot de respuestas predefinidas: es un asistente inteligente que comprende el contexto, responde con lenguaje natural y resuelve consultas complejas 24/7. Integrado con los últimos modelos de lenguaje (GPT, Claude), tu chatbot puede atender clientes, cualificar leads, responder FAQs y escalar casos complejos a tu equipo.',
        'La diferencia de trabajar con una empresa de ciberseguridad es la seguridad de los datos. Los chatbots procesan información sensible de clientes: datos personales, consultas médicas, información financiera. Garantizamos que los datos se manejan de forma segura, cumpliendo GDPR y sin filtraciones a través del modelo de IA.',
        'Integramos el chatbot con tus sistemas existentes (CRM, helpdesk, WhatsApp Business, web) y lo entrenamos con tu base de conocimiento para que las respuestas sean precisas, coherentes con tu marca y realmente útiles para tus clientes.',
      ],
    },
    deliverables: [
      { title: 'Chatbot personalizado', description: 'Desarrollo del chatbot con IA entrenado con tu base de conocimiento, FAQs, productos y servicios. Personalidad y tono adaptados a tu marca.', icon: ICONS.chat },
      { title: 'Integración multicanal', description: 'Despliegue en web (widget embebido), WhatsApp Business, Telegram y otros canales según necesidades. Una sola IA, múltiples puntos de contacto.', icon: ICONS.globe },
      { title: 'Panel de administración', description: 'Dashboard para monitorizar conversaciones, métricas de uso, satisfacción del usuario y gestión de la base de conocimiento.', icon: ICONS.chart },
      { title: 'Seguridad de datos', description: 'Implementación de guardrails de seguridad: sanitización de inputs, prevención de prompt injection, anonimización de datos y cumplimiento GDPR.', icon: ICONS.shield },
      { title: 'Entrenamiento y soporte', description: 'Formación para tu equipo en gestión del chatbot, actualización de conocimiento y soporte técnico post-lanzamiento.', icon: ICONS.academic },
    ],
    methodology: {
      title: 'Proceso de desarrollo de chatbot',
      framework: 'RAG + Fine-tuning + Security by Design',
      steps: [
        { step: 1, title: 'Análisis de necesidades', description: 'Identificación de casos de uso, flujos de conversación, base de conocimiento existente e integraciones necesarias con sistemas actuales.' },
        { step: 2, title: 'Diseño conversacional', description: 'Diseño de flujos de conversación, personalidad del chatbot, respuestas para edge cases y protocolos de escalado a agentes humanos.' },
        { step: 3, title: 'Desarrollo e integración', description: 'Implementación del chatbot con RAG (Retrieval Augmented Generation), integración con APIs de LLM y conexión con tus sistemas (CRM, helpdesk, WhatsApp).' },
        { step: 4, title: 'Testing y seguridad', description: 'Pruebas de conversación, testing de edge cases, evaluación de seguridad (prompt injection, data leaks) y verificación de cumplimiento GDPR.' },
        { step: 5, title: 'Despliegue y optimización', description: 'Lanzamiento gradual, monitorización de métricas, refinamiento de respuestas basado en conversaciones reales y optimización continua.' },
      ],
    },
    faqs: [
      { question: '¿Qué modelos de IA utilizáis?', answer: 'Trabajamos con los principales LLMs: OpenAI (GPT-4), Anthropic (Claude), y modelos open source (Llama, Mistral) según requisitos de privacidad y coste. Para datos muy sensibles, podemos desplegar modelos locales que no envían información a terceros.' },
      { question: '¿El chatbot puede integrarse con mi CRM?', answer: 'Sí. Integramos con los CRMs más comunes (Salesforce, HubSpot, Pipedrive) y cualquier sistema que tenga API. El chatbot puede registrar conversaciones, crear tickets, actualizar contactos y cualificar leads automáticamente.' },
      { question: '¿Cómo se previenen los problemas de seguridad (prompt injection)?', answer: 'Implementamos múltiples capas de seguridad: sanitización de inputs, system prompts robustos, guardrails para prevenir divulgación de información sensible, anonimización de datos personales y monitorización de conversaciones para detectar intentos de manipulación.' },
      { question: '¿Necesito alimentar al chatbot con datos?', answer: 'Sí. La calidad del chatbot depende de la base de conocimiento. Necesitamos FAQs, documentación de productos/servicios, políticas y cualquier información relevante. Si no la tienes estructurada, te ayudamos a crearla. Usamos RAG para que el chatbot consulte esta base en tiempo real.' },
    ],
    relatedSlugs: ['desarrollo-web', 'automatizacion-apis', 'desarrollo-movil'],
    ctaText: 'Solicitar presupuesto de chatbot',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. AUTOMATIZACIÓN Y APIs
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'automatizacion-apis',
    title: 'Automatización y APIs',
    shortTitle: 'Automatización',
    area: 'digital',
    metaTitle: 'Automatización de Procesos y APIs Seguras: Integración de sistemas',
    metaDescription: 'Automatización de procesos empresariales y desarrollo de APIs seguras. Integración de sistemas, workflows automatizados y eliminación de tareas manuales.',
    seoKeyword: 'automatización procesos empresa',
    tagline: 'Automatización e integración de sistemas',
    headline: 'Automatización y APIs: conecta tus sistemas y elimina tareas manuales',
    description: 'Automatizamos procesos de negocio, desarrollamos APIs seguras y conectamos tus sistemas para eliminar tareas manuales repetitivas y reducir errores.',
    priceFrom: '5.000 €',
    duration: '4-10 semanas',
    certifications: [],
    whatIs: {
      title: '¿Qué ganas automatizando tus procesos?',
      paragraphs: [
        'Las empresas pierden horas cada semana en tareas manuales repetitivas: copiar datos entre sistemas, generar informes, enviar notificaciones, sincronizar inventarios o procesar pedidos. La automatización elimina estos cuellos de botella, reduce errores humanos y libera a tu equipo para tareas de mayor valor.',
        'Desarrollamos workflows automatizados que conectan tus sistemas existentes mediante APIs seguras. Desde integraciones sencillas (CRM → facturación) hasta automatizaciones complejas con lógica de negocio, validaciones y notificaciones en tiempo real.',
        'La diferencia de trabajar con un equipo de ciberseguridad es que cada API y cada automatización se desarrolla con seguridad integrada: autenticación, autorización, cifrado, rate limiting y validación de datos. Tus procesos automatizados son eficientes y seguros.',
      ],
    },
    deliverables: [
      { title: 'Análisis de procesos', description: 'Mapeo de procesos actuales, identificación de cuellos de botella y oportunidades de automatización con ROI estimado.', icon: ICONS.chart },
      { title: 'APIs seguras', description: 'Desarrollo de APIs RESTful con autenticación, autorización, rate limiting, validación de inputs y documentación completa (OpenAPI/Swagger).', icon: ICONS.code },
      { title: 'Workflows automatizados', description: 'Implementación de flujos de trabajo automatizados con lógica de negocio, condiciones, transformaciones de datos y manejo de errores.', icon: ICONS.bolt },
      { title: 'Integraciones', description: 'Conexión entre tus sistemas: CRM, ERP, facturación, email marketing, herramientas de productividad y cualquier servicio con API.', icon: ICONS.cog },
      { title: 'Monitorización y alertas', description: 'Dashboard de monitorización de las automatizaciones: ejecuciones, errores, tiempos y alertas automáticas ante fallos.', icon: ICONS.eye },
    ],
    methodology: {
      title: 'Proceso de automatización',
      framework: 'Lean Automation + Security by Design',
      steps: [
        { step: 1, title: 'Mapeo de procesos', description: 'Análisis de los procesos actuales, identificación de tareas manuales repetitivas, cuellos de botella y oportunidades de automatización de alto impacto.' },
        { step: 2, title: 'Diseño de solución', description: 'Arquitectura técnica de la automatización: APIs necesarias, flujos de datos, integraciones, lógica de negocio y requisitos de seguridad.' },
        { step: 3, title: 'Desarrollo', description: 'Implementación de APIs, workflows y conectores. Desarrollo iterativo con entregas parciales funcionales cada 2 semanas.' },
        { step: 4, title: 'Testing y seguridad', description: 'Pruebas de integración, testing de carga, evaluación de seguridad de las APIs y validación de que los datos fluyen correctamente entre sistemas.' },
        { step: 5, title: 'Despliegue y soporte', description: 'Puesta en producción, configuración de monitorización, documentación técnica y formación para el equipo que gestionará las automatizaciones.' },
      ],
    },
    faqs: [
      { question: '¿Qué tipo de procesos se pueden automatizar?', answer: 'Prácticamente cualquier proceso repetitivo: sincronización de datos entre sistemas, generación de informes, procesamiento de pedidos, envío de notificaciones, actualización de inventarios, onboarding de clientes, facturación y cobros, gestión de leads. Si implica copiar datos o hacer tareas repetitivas, se puede automatizar.' },
      { question: '¿Necesito cambiar mis sistemas actuales?', answer: 'No. Las automatizaciones se integran con tus sistemas existentes mediante APIs. No es necesario cambiar de CRM, ERP o herramientas. Conectamos lo que ya usas de forma segura y eficiente.' },
      { question: '¿Las APIs que desarrolláis son seguras?', answer: 'Sí. Todas las APIs incluyen autenticación (API keys, OAuth 2.0), autorización (RBAC), rate limiting, validación de inputs, cifrado en tránsito (TLS) y en reposo, y logging de auditoría. Es lo mínimo que exigimos siendo una empresa de ciberseguridad.' },
      { question: '¿Cuánto tiempo se tarda en ver resultados?', answer: 'Las primeras automatizaciones funcionales suelen estar en producción en 2-4 semanas. Empezamos por los procesos de mayor impacto y menor complejidad (quick wins) para generar valor rápido mientras se desarrollan las automatizaciones más complejas.' },
    ],
    relatedSlugs: ['desarrollo-web', 'chatbots-ia', 'desarrollo-movil'],
    ctaText: 'Solicitar automatización',
  },
];
