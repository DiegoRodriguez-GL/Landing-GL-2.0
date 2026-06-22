export interface SectorData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  description: string;
  icon: string;
  challenges: { title: string; description: string }[];
  regulations: string[];
  services: { name: string; slug: string; description: string }[];
  stats: { value: string; label: string }[];
  caseHighlight?: {
    title: string;
    description: string;
    results: { metric: string; value: string }[];
  };
}

export const sectorsData: SectorData[] = [
  {
    slug: 'fintech',
    title: 'Fintech y Banca',
    metaTitle: 'Ciberseguridad para Fintech y Banca: Pentesting Financiero',
    metaDescription: 'Auditorías de seguridad y pentesting especializados para el sector financiero. Cumplimiento PCI DSS, DORA y PSD2. Profesionales certificados CRTO y BSCP.',
    headline: 'Ciberseguridad para el sector financiero',
    description: 'Las plataformas fintech y entidades bancarias manejan datos financieros críticos y operan bajo marcos regulatorios estrictos. Un ataque exitoso no solo implica pérdidas económicas directas, sino multas regulatorias, daño reputacional irreversible y pérdida de licencia. Nuestra aproximación combina pentesting avanzado con conocimiento profundo de la normativa financiera.',
    icon: `<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>`,
    challenges: [
      { title: 'APIs de pago expuestas', description: 'Las pasarelas de pago y APIs financieras son el objetivo principal de los atacantes. Evaluamos la seguridad de cada endpoint crítico.' },
      { title: 'Cumplimiento regulatorio', description: 'PCI DSS, DORA, PSD2 y MiFID II exigen auditorías periódicas. Te ayudamos a cumplir y mantener las certificaciones.' },
      { title: 'Fraude y suplantación', description: 'Evaluamos la resistencia de tus sistemas ante ataques de phishing, Business Email Compromise y fraude transaccional.' },
      { title: 'Datos financieros sensibles', description: 'Protección de números de cuenta, tarjetas, historiales de transacciones y datos personales bajo GDPR.' },
    ],
    regulations: ['PCI DSS', 'DORA', 'PSD2', 'MiFID II', 'GDPR', 'ENS'],
    services: [
      { name: 'Pentesting Web', slug: 'pentesting-web', description: 'Auditoría de plataformas de banca digital y pasarelas de pago.' },
      { name: 'Auditoría de Seguridad', slug: 'auditoria-seguridad', description: 'Evaluación integral de la postura de seguridad de la entidad.' },
      { name: 'Cumplimiento Normativo', slug: 'cumplimiento-normativo', description: 'Adecuación a PCI DSS, DORA y resto de normativa financiera.' },
      { name: 'Red Team', slug: 'red-team', description: 'Simulación de ataques avanzados según el framework TIBER-EU.' },
    ],
    stats: [
      { value: '100%', label: 'de entidades financieras auditadas sin incidentes post-auditoría' },
      { value: '<48h', label: 'tiempo medio de inicio de auditoría' },
      { value: 'PCI DSS', label: 'experiencia en auditorías de cumplimiento' },
    ],
    caseHighlight: {
      title: 'Fintech de pagos: Auditoría pre-certificación PCI DSS',
      description: 'Auditoría completa de una plataforma de pagos antes de su certificación PCI DSS. Identificamos 12 vulnerabilidades críticas en la integración con procesadores de pago.',
      results: [
        { metric: 'Vulnerabilidades críticas', value: '12 detectadas' },
        { metric: 'Tiempo de remediación', value: '3 semanas' },
        { metric: 'Certificación PCI DSS', value: 'Obtenida al primer intento' },
      ],
    },
  },
  {
    slug: 'salud',
    title: 'Salud y Healthtech',
    metaTitle: 'Ciberseguridad para Salud: Pentesting Sanitario',
    metaDescription: 'Auditorías de seguridad para hospitales, clínicas y healthtech. Protección de datos de pacientes y sistemas HIS. Cumplimiento ENS sanitario.',
    headline: 'Ciberseguridad para el sector sanitario',
    description: 'El sector sanitario es uno de los más atacados del mundo. Los historiales médicos tienen un valor 10 veces superior a los datos de tarjetas de crédito en el mercado negro. Los ataques de ransomware a hospitales pueden poner en riesgo vidas humanas. Protegemos hospitales, clínicas, healthtech y farmacéuticas con auditorías adaptadas a la realidad del sector.',
    icon: `<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`,
    challenges: [
      { title: 'Ransomware hospitalario', description: 'Los hospitales son objetivos prioritarios de ransomware. Evaluamos la resiliencia de tus sistemas ante estos ataques.' },
      { title: 'Datos de pacientes (PHI)', description: 'Historiales médicos, diagnósticos e información genética requieren la máxima protección bajo RGPD y ENS.' },
      { title: 'Dispositivos médicos IoT', description: 'Equipos conectados (IoMT) como bombas de infusión, monitores y sistemas de imagen son vectores de ataque crecientes.' },
      { title: 'Sistemas HIS/RIS/PACS', description: 'Los sistemas hospitalarios de información, radiología y archivo de imágenes deben estar securizados.' },
    ],
    regulations: ['ENS (Categoría Alta)', 'RGPD', 'Ley 41/2002', 'NIS2'],
    services: [
      { name: 'Pentesting Infraestructura', slug: 'pentesting-infraestructura', description: 'Evaluación de redes hospitalarias, segmentación y Active Directory.' },
      { name: 'Auditoría de Seguridad', slug: 'auditoria-seguridad', description: 'Análisis del estado de seguridad de sistemas clínicos y administrativos.' },
      { name: 'Concienciación y Formación', slug: 'concienciacion-formacion', description: 'Programas de awareness para personal sanitario y administrativo.' },
      { name: 'Cumplimiento Normativo', slug: 'cumplimiento-normativo', description: 'Adecuación al ENS de categoría alta para el ámbito sanitario.' },
    ],
    stats: [
      { value: '10x', label: 'más valiosos los datos sanitarios que los financieros en el mercado negro' },
      { value: '0', label: 'brechas en clientes sanitarios post-auditoría' },
      { value: 'ENS', label: 'experiencia en categoría alta sanitaria' },
    ],
  },
  {
    slug: 'legal',
    title: 'Legal y Despachos',
    metaTitle: 'Ciberseguridad para Despachos de Abogados: Auditoría Legal',
    metaDescription: 'Auditorías de seguridad para despachos de abogados y legaltech. Protección de información privilegiada y secreto profesional. Cumplimiento RGPD y ENS.',
    headline: 'Ciberseguridad para el sector jurídico',
    description: 'Los despachos de abogados manejan información privilegiada de alto valor: contratos, fusiones, litigios, datos personales protegidos por secreto profesional. Un ataque exitoso puede suponer la pérdida del secreto profesional, multas RGPD y responsabilidad civil. Diseñamos auditorías adaptadas a la operativa real del sector legal.',
    icon: `<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>`,
    challenges: [
      { title: 'Secreto profesional', description: 'La información de clientes está protegida por secreto profesional. Su filtración implica responsabilidad penal y civil.' },
      { title: 'Business Email Compromise', description: 'Los despachos son objetivo de ataques BEC para desviar pagos de operaciones corporativas y litigios.' },
      { title: 'Documentación sensible', description: 'Contratos, fusiones, litigios y due diligence requieren cifrado y control de acceso estrictos.' },
      { title: 'Cumplimiento normativo', description: 'RGPD, Ley Orgánica del Poder Judicial y normativa colegial exigen medidas de seguridad verificables.' },
    ],
    regulations: ['RGPD', 'ENS', 'Ley 2/2007 (LOPJ)', 'Normativa colegial'],
    services: [
      { name: 'Pentesting Web', slug: 'pentesting-web', description: 'Auditoría de plataformas de gestión documental y portales de cliente.' },
      { name: 'Auditoría de Seguridad', slug: 'auditoria-seguridad', description: 'Evaluación integral de la seguridad del despacho: red, endpoints, email.' },
      { name: 'Cumplimiento Normativo', slug: 'cumplimiento-normativo', description: 'Adecuación a RGPD, ENS y requisitos colegiales de protección de datos.' },
    ],
    stats: [
      { value: '73%', label: 'de despachos han sufrido intentos de ataque (ABA 2024)' },
      { value: '0', label: 'filtraciones de información privilegiada en nuestros clientes' },
      { value: 'RGPD', label: 'especialización en protección de datos jurídicos' },
    ],
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail y E-commerce',
    metaTitle: 'Ciberseguridad para E-commerce y Retail: Pentesting Tiendas Online',
    metaDescription: 'Pentesting y auditorías de seguridad para tiendas online, marketplaces y plataformas de retail. Protección de pasarelas de pago y datos de clientes.',
    headline: 'Ciberseguridad para retail y e-commerce',
    description: 'Las plataformas de e-commerce procesan miles de transacciones diarias con datos de tarjetas, direcciones y credenciales de clientes. Los ataques de web skimming, inyección SQL y robo de credenciales son constantes. Auditamos la seguridad de tu tienda online, marketplace o plataforma de retail para proteger a tus clientes y tu negocio.',
    icon: `<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>`,
    challenges: [
      { title: 'Web skimming (Magecart)', description: 'Ataques que inyectan código malicioso en páginas de checkout para robar datos de tarjetas en tiempo real.' },
      { title: 'Seguridad en APIs', description: 'APIs de inventario, precios y pedidos expuestas que permiten manipulación de precios o exfiltración de datos.' },
      { title: 'Protección de datos de clientes', description: 'Direcciones, historiales de compra, credenciales y métodos de pago deben estar cifrados y protegidos.' },
      { title: 'Disponibilidad 24/7', description: 'Un ataque DDoS o ransomware en temporada alta puede suponer pérdidas millonarias.' },
    ],
    regulations: ['PCI DSS', 'RGPD', 'LSSI-CE', 'PSD2'],
    services: [
      { name: 'Pentesting Web', slug: 'pentesting-web', description: 'Auditoría de la tienda online: checkout, APIs, panel de administración.' },
      { name: 'Pentesting Móvil', slug: 'pentesting-movil', description: 'Evaluación de apps de compra y programas de fidelización.' },
      { name: 'PaaS', slug: 'pentesting-as-a-service', description: 'Auditorías recurrentes para mantener la seguridad en cada release.' },
    ],
    stats: [
      { value: '4.5M$', label: 'coste medio de una brecha en retail (IBM 2024)' },
      { value: '100%', label: 'de tiendas auditadas con mejora de postura de seguridad' },
      { value: 'PCI DSS', label: 'experiencia en cumplimiento para e-commerce' },
    ],
    caseHighlight: {
      title: 'E-commerce de joyería: Auditoría de seguridad recurrente',
      description: 'Contrato de pentesting recurrente para una joyería online con pasarela de pago integrada. Detectamos vulnerabilidades críticas en el flujo de checkout.',
      results: [
        { metric: 'Vulnerabilidades críticas', value: '8 detectadas' },
        { metric: 'Mejora en OWASP score', value: 'De D a A' },
        { metric: 'Incidentes post-auditoría', value: '0' },
      ],
    },
  },
  {
    slug: 'industrial',
    title: 'Industrial y OT',
    metaTitle: 'Ciberseguridad Industrial OT/ICS: Pentesting SCADA',
    metaDescription: 'Ciberseguridad para entornos industriales OT/ICS y SCADA. Pentesting de infraestructuras críticas, convergencia IT/OT y cumplimiento NIS2.',
    headline: 'Ciberseguridad para el sector industrial',
    description: 'La convergencia IT/OT ha abierto nuevos vectores de ataque en entornos industriales. Los sistemas SCADA, PLCs y protocolos industriales (Modbus, OPC UA, PROFINET) que antes estaban aislados ahora están conectados a redes corporativas e internet. Un ataque a estos sistemas puede detener la producción, dañar equipos físicos o poner en riesgo la seguridad de las personas.',
    icon: `<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.1-3.18M3.75 7.5l8.25 4.5m0 0l8.25-4.5M12 12v9m-8.25-4.5V7.5a.75.75 0 01.375-.65l7.5-4.125a.75.75 0 01.75 0l7.5 4.125a.75.75 0 01.375.65v9a.75.75 0 01-.375.65l-7.5 4.125a.75.75 0 01-.75 0l-7.5-4.125a.75.75 0 01-.375-.65z" /></svg>`,
    challenges: [
      { title: 'Convergencia IT/OT', description: 'La conexión entre redes corporativas y sistemas industriales amplía la superficie de ataque exponencialmente.' },
      { title: 'Protocolos industriales legacy', description: 'Modbus, DNP3, OPC y otros protocolos industriales no fueron diseñados con seguridad y carecen de autenticación.' },
      { title: 'Impacto físico', description: 'Un ataque exitoso puede dañar equipos, parar la producción o poner en riesgo la seguridad de trabajadores.' },
      { title: 'Disponibilidad crítica', description: 'Los sistemas industriales no pueden detenerse para aplicar parches. Las ventanas de mantenimiento son mínimas.' },
    ],
    regulations: ['NIS2', 'IEC 62443', 'ENS', 'Directiva CER'],
    services: [
      { name: 'Pentesting Infraestructura', slug: 'pentesting-infraestructura', description: 'Evaluación de redes industriales con metodología adaptada a entornos OT.' },
      { name: 'Red Team', slug: 'red-team', description: 'Simulación de ataques end-to-end incluyendo el vector IT→OT.' },
      { name: 'Auditoría de Seguridad', slug: 'auditoria-seguridad', description: 'Análisis de segmentación, accesos remotos y configuración de dispositivos.' },
      { name: 'Cumplimiento Normativo', slug: 'cumplimiento-normativo', description: 'Adecuación a NIS2 e IEC 62443 para el sector industrial.' },
    ],
    stats: [
      { value: '300%', label: 'aumento de ataques a infraestructuras OT (2023-2025)' },
      { value: 'IEC 62443', label: 'metodología de evaluación para entornos industriales' },
      { value: '0', label: 'interrupciones de producción durante nuestras auditorías' },
    ],
  },
];

export function getSectorBySlug(slug: string): SectorData | undefined {
  return sectorsData.find((s) => s.slug === slug);
}
