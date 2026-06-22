export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
  services: string[];
  featured: boolean;
}

export const casesData: CaseStudy[] = [
  {
    slug: 'ecommerce-joyeria-pentesting-recurrente',
    title: 'Pentesting recurrente para e-commerce de joyería',
    sector: 'E-commerce · Retail',
    client: 'E-commerce de joyería de alta gama',
    description: 'Contrato de pentesting recurrente para una joyería online con facturación de 7 cifras. Incluye auditoría de la plataforma de e-commerce, pasarela de pago integrada y API de gestión de inventario.',
    challenge: 'La plataforma procesaba miles de transacciones mensuales con datos de tarjetas. El cliente había sufrido un intento de web skimming que fue detectado a tiempo, pero reveló la necesidad de auditorías regulares. Necesitaban cumplir PCI DSS y garantizar la seguridad de sus clientes.',
    solution: 'Implementamos un modelo de Pentesting as a Service (PaaS) con ciclos trimestrales. Cada ciclo incluye: pentesting web completo de la plataforma, auditoría de la pasarela de pago, revisión de la API de inventario, test de la configuración del servidor y verificación de remediaciones del ciclo anterior.',
    results: [
      { metric: 'Vulnerabilidades críticas detectadas', value: '8' },
      { metric: 'Mejora en OWASP Score', value: 'De D a A' },
      { metric: 'Tiempo de remediación medio', value: '72 horas' },
      { metric: 'Incidentes post-auditoría', value: '0' },
    ],
    testimonial: {
      quote: 'GreenLock nos da la tranquilidad de saber que nuestra plataforma está protegida. Sus informes son claros y el equipo siempre está disponible cuando surge algo urgente.',
      name: 'Director de Tecnología',
      role: 'CTO',
      company: 'E-commerce de joyería',
    },
    services: ['Pentesting Web', 'PaaS', 'Auditoría de Seguridad'],
    featured: true,
  },
  {
    slug: 'despacho-abogados-auditoria-seguridad',
    title: 'Auditoría de seguridad integral para despacho de abogados',
    sector: 'Legal · Despachos',
    client: 'Despacho de abogados (Madrid)',
    description: 'Auditoría completa de la infraestructura tecnológica de un despacho de abogados con más de 30 profesionales. Evaluación de la seguridad de red, endpoints, email, gestión documental y cumplimiento RGPD.',
    challenge: 'El despacho manejaba información privilegiada de alto valor: fusiones y adquisiciones, litigios corporativos y datos personales protegidos por secreto profesional. Tras un incidente de phishing dirigido (spear phishing) que casi compromete credenciales de un socio, decidieron realizar una auditoría integral.',
    solution: 'Ejecutamos una auditoría de seguridad en tres fases: análisis perimetral externo, evaluación de la red interna y Active Directory, y auditoría de las políticas de seguridad y configuración de endpoints. Complementamos con un ejercicio de phishing simulado para medir la concienciación del personal.',
    results: [
      { metric: 'Vulnerabilidades identificadas', value: '23' },
      { metric: 'Tasa de click en phishing simulado', value: '34% → 8%' },
      { metric: 'Cumplimiento RGPD mejorado', value: '67% → 94%' },
      { metric: 'Filtraciones de datos', value: '0' },
    ],
    services: ['Auditoría de Seguridad', 'Concienciación y Formación', 'Cumplimiento Normativo'],
    featured: false,
  },
  {
    slug: 'fintech-pagos-pentesting-pci',
    title: 'Pentesting pre-certificación PCI DSS para fintech de pagos',
    sector: 'Fintech · Pagos',
    client: 'Startup fintech de procesamiento de pagos',
    description: 'Auditoría de seguridad previa a la certificación PCI DSS de una plataforma de procesamiento de pagos. Pentesting web avanzado de la API de pagos, panel de administración y flujo de tokenización.',
    challenge: 'La fintech necesitaba obtener la certificación PCI DSS para poder procesar pagos directamente. Su plataforma integraba múltiples procesadores de pago a través de APIs y manejaba datos de tarjetas tokenizados. El QSA (Qualified Security Assessor) requería un informe de pentesting antes de emitir la certificación.',
    solution: 'Realizamos un pentesting web exhaustivo centrado en los flujos de pago: API de procesamiento, panel de merchants, sistema de tokenización y comunicaciones con procesadores terceros. Aplicamos metodología OWASP Testing Guide con énfasis en los requisitos específicos de PCI DSS (Requisito 6 y 11).',
    results: [
      { metric: 'Vulnerabilidades críticas', value: '12 detectadas' },
      { metric: 'Tiempo de remediación', value: '3 semanas' },
      { metric: 'Certificación PCI DSS', value: 'Obtenida al primer intento' },
    ],
    services: ['Pentesting Web', 'Cumplimiento Normativo'],
    featured: false,
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return casesData.find((c) => c.slug === slug);
}

export function getFeaturedCase(): CaseStudy | undefined {
  return casesData.find((c) => c.featured);
}
