// ============================================================================
// GreenLock Cybersecurity — Blog Articles Data (Static Fallback)
// Used when Sanity CMS is not configured. These are real, SEO-optimized
// articles with full content in Spanish.
// ============================================================================

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    certifications: { icon: string; label: string }[];
    linkedin: string;
    youtube?: string;
    instagram?: string;
    image?: string;
  };
  publishedAt: string;
  readTime: string;
  relatedService: string;
  /** HTML body content */
  body: string;
}

// ============================================================================
// Article 1: Qué es el pentesting
// ============================================================================
const article1: BlogArticle = {
  slug: 'que-es-pentesting-empresa-2026',
  title: 'Qué es el pentesting y por qué tu empresa lo necesita en 2026',
  metaTitle: 'Qué es el pentesting y por qué tu empresa lo necesita en 2026',
  metaDescription: 'Descubre qué es un test de penetración, cómo funciona y por qué es imprescindible para proteger tu empresa de ciberataques en 2026.',
  excerpt: 'Descubre cómo una auditoría de seguridad ofensiva puede proteger tu negocio de las amenazas más críticas del panorama actual.',
  category: 'Pentesting',
  tags: ['pentesting', 'ciberseguridad', 'auditoría', 'OWASP', 'empresas'],
  author: {
    name: 'Damián Pérez',
    role: 'Co-founder & Offensive Security',
    certifications: [{ icon: '/images/crto.webp', label: 'CRTO Certified' }],
    linkedin: 'https://www.linkedin.com/in/dpmcyber/',
    image: '/images/damian.webp',
  },
  publishedAt: '2025-06-12',
  readTime: '8 min',
  relatedService: 'pentesting-web',
  body: `
    <h2>¿Qué es exactamente un pentesting?</h2>
    <p>Un <strong>pentesting</strong> (o test de penetración) es una evaluación de seguridad autorizada en la que profesionales certificados simulan ataques reales contra tus sistemas, aplicaciones o infraestructura para identificar vulnerabilidades antes de que un atacante las explote.</p>
    <p>A diferencia de un escaneo automatizado de vulnerabilidades, un pentesting combina herramientas especializadas con técnicas manuales y creatividad humana para descubrir fallos de seguridad que las máquinas por sí solas no detectan.</p>

    <h2>Tipos de pentesting</h2>
    <p>Existen diferentes tipos de pentesting según el objetivo y el nivel de información que tiene el auditor:</p>
    <h3>Pentesting de caja negra (Black Box)</h3>
    <p>El auditor no tiene información previa sobre el sistema objetivo. Simula el escenario más realista: un atacante externo sin conocimiento interno. Ideal para evaluar la superficie de ataque visible desde internet.</p>
    <h3>Pentesting de caja blanca (White Box)</h3>
    <p>El auditor tiene acceso completo al código fuente, arquitectura y credenciales. Permite una evaluación más profunda y eficiente, identificando vulnerabilidades que un atacante podría encontrar con suficiente tiempo y persistencia.</p>
    <h3>Pentesting de caja gris (Grey Box)</h3>
    <p>Enfoque híbrido donde el auditor tiene información parcial (por ejemplo, credenciales de usuario sin privilegios). Equilibra realismo con profundidad de análisis.</p>

    <h2>¿Por qué tu empresa necesita un pentesting en 2026?</h2>
    <p>El panorama de amenazas evoluciona constantemente. En 2026, estas son las razones clave:</p>
    <h3>1. El coste medio de una brecha de datos sigue aumentando</h3>
    <p>Según los últimos informes del sector, el coste medio de una brecha de datos en Europa supera los 4 millones de euros. Un pentesting proactivo cuesta una fracción de esa cantidad y puede prevenir incidentes devastadores.</p>
    <h3>2. Requisitos regulatorios cada vez más estrictos</h3>
    <p>Normativas como <a href="/recursos/blog/nis2-guia-completa">NIS2</a>, DORA y el ENS exigen evaluaciones periódicas de seguridad. Un pentesting profesional demuestra cumplimiento y diligencia ante reguladores.</p>
    <h3>3. La superficie de ataque crece exponencialmente</h3>
    <p>APIs, microservicios, aplicaciones cloud, trabajo remoto... Cada nueva tecnología amplía tu perímetro de exposición. Sin evaluaciones periódicas, las vulnerabilidades se acumulan.</p>
    <h3>4. Los atacantes usan IA para automatizar ataques</h3>
    <p>Las herramientas de ataque basadas en inteligencia artificial hacen que los ciberdelincuentes sean más rápidos y efectivos. Tu defensa debe evolucionar al mismo ritmo.</p>

    <h2>¿Cómo funciona un pentesting profesional?</h2>
    <p>Un pentesting profesional sigue una metodología estructurada:</p>
    <ol>
      <li><strong>Alcance y planificación:</strong> Se definen los objetivos, el perímetro de actuación y las reglas de enfrentamiento junto al cliente.</li>
      <li><strong>Reconocimiento:</strong> Se recopila información sobre el objetivo utilizando técnicas OSINT y escaneos no intrusivos.</li>
      <li><strong>Análisis de vulnerabilidades:</strong> Se identifican posibles puntos débiles combinando herramientas automatizadas y análisis manual, siguiendo estándares como el <a href="/recursos/blog/owasp-top-10-2021">OWASP Top 10</a>.</li>
      <li><strong>Explotación:</strong> Se intentan explotar las vulnerabilidades encontradas para validar su impacto real, siempre de forma controlada.</li>
      <li><strong>Informe:</strong> Se entrega un informe ejecutivo y técnico con todas las vulnerabilidades, evidencias, severidades CVSS y recomendaciones de remediación.</li>
      <li><strong>Remediación y verificación:</strong> Se acompaña al cliente en la corrección y se verifica que las vulnerabilidades han sido resueltas.</li>
    </ol>

    <h2>¿Cuánto cuesta un pentesting?</h2>
    <p>El coste de un pentesting depende del alcance, la complejidad y el tipo de evaluación. En España, los rangos habituales son:</p>
    <ul>
      <li><strong>Pentesting web básico:</strong> Desde 4.000€ para aplicaciones sencillas</li>
      <li><strong>Pentesting web complejo:</strong> 6.000€ - 12.000€ para aplicaciones con APIs y lógica de negocio compleja</li>
      <li><strong>Pentesting de infraestructura:</strong> 6.000€ - 15.000€ según el número de hosts y complejidad</li>
      <li><strong>Red Team completo:</strong> Desde 15.000€ para simulaciones end-to-end</li>
    </ul>
    <p>En GreenLock ofrecemos una <strong>evaluación preliminar gratuita</strong> para analizar tu superficie de ataque y recomendarte el tipo de pentesting más adecuado para tu empresa.</p>

    <h2>Conclusión</h2>
    <p>Un pentesting no es un gasto, es una inversión en la continuidad de tu negocio. En un panorama donde los ciberataques son cuestión de "cuándo" y no de "si", las empresas que evalúan proactivamente su seguridad están significativamente mejor preparadas para proteger sus activos, sus clientes y su reputación.</p>
  `,
};

// ============================================================================
// Article 2: OWASP Top 10
// ============================================================================
const article2: BlogArticle = {
  slug: 'owasp-top-10-2021',
  title: 'OWASP Top 10 en 2021: vulnerabilidades web críticas',
  metaTitle: 'OWASP Top 10 en 2021: las vulnerabilidades web más críticas',
  metaDescription: 'Analizamos las 10 vulnerabilidades más explotadas en aplicaciones web según OWASP y cómo protegerte ante ellas.',
  excerpt: 'Analizamos las 10 vulnerabilidades más explotadas en aplicaciones web según OWASP y cómo protegerte ante ellas.',
  category: 'Seguridad Web',
  tags: ['OWASP', 'vulnerabilidades', 'seguridad web', 'desarrollo seguro', 'API'],
  author: {
    name: 'Damián Pérez',
    role: 'Co-founder & Offensive Security',
    certifications: [{ icon: '/images/crto.webp', label: 'CRTO Certified' }],
    linkedin: 'https://www.linkedin.com/in/dpmcyber/',
    image: '/images/damian.webp',
  },
  publishedAt: '2025-10-03',
  readTime: '12 min',
  relatedService: 'pentesting-web',
  body: `
    <h2>¿Qué es OWASP Top 10?</h2>
    <p>OWASP (Open Worldwide Application Security Project) es una comunidad abierta dedicada a mejorar la seguridad del software. Su proyecto más conocido, el <strong>OWASP Top 10</strong>, es un informe de consenso que identifica las diez categorías de vulnerabilidades más críticas en aplicaciones web.</p>
    <p>Este ranking se actualiza periódicamente y es utilizado como referencia por desarrolladores, auditores y reguladores en todo el mundo. Conocerlo no es opcional: es el mínimo que cualquier equipo técnico debe dominar.</p>

    <h2>Las 10 vulnerabilidades más críticas</h2>

    <h3>A01: Broken Access Control</h3>
    <p>El control de acceso roto sigue siendo la vulnerabilidad número uno. Ocurre cuando un usuario puede acceder a recursos o realizar acciones para las que no tiene permisos. Ejemplos típicos: acceder a datos de otros usuarios modificando un ID en la URL, escalar privilegios, o acceder a paneles de administración sin autenticación adecuada.</p>
    <p><strong>Cómo protegerse:</strong> Implementar control de acceso basado en roles (RBAC) en el servidor, nunca confiar en el cliente para decisiones de autorización, y auditar regularmente los permisos.</p>

    <h3>A02: Cryptographic Failures</h3>
    <p>Fallos criptográficos que exponen datos sensibles. Incluye el uso de algoritmos obsoletos (MD5, SHA1), transmisión de datos sin cifrar, almacenamiento de contraseñas en texto plano, o gestión incorrecta de certificados TLS.</p>
    <p><strong>Cómo protegerse:</strong> Usar TLS 1.3, cifrar datos sensibles en reposo y en tránsito, implementar hashing con bcrypt/Argon2 para contraseñas.</p>

    <h3>A03: Injection</h3>
    <p>Las inyecciones (SQL, NoSQL, LDAP, OS commands) siguen siendo un vector de ataque devastador. Ocurren cuando datos no confiables se envían a un intérprete como parte de un comando o consulta.</p>
    <p><strong>Cómo protegerse:</strong> Usar consultas parametrizadas (prepared statements), validar y sanitizar todas las entradas, aplicar el principio de mínimo privilegio en bases de datos.</p>

    <h3>A04: Insecure Design</h3>
    <p>Categoría introducida para distinguir fallos de diseño de fallos de implementación. Un diseño inseguro no puede arreglarse con una implementación perfecta. Ejemplo: un flujo de recuperación de contraseña que permite enumeración de usuarios.</p>
    <p><strong>Cómo protegerse:</strong> Integrar threat modeling desde la fase de diseño, usar patrones de seguridad probados, implementar revisiones de arquitectura de seguridad.</p>

    <h3>A05: Security Misconfiguration</h3>
    <p>Configuraciones por defecto inseguras, servicios innecesarios habilitados, headers de seguridad ausentes, mensajes de error verbosos que revelan información sensible. Es la vulnerabilidad más fácil de explotar y también de prevenir.</p>
    <p><strong>Cómo protegerse:</strong> Hardening de servidores, eliminar servicios y componentes no utilizados, configurar headers de seguridad (CSP, HSTS, X-Frame-Options), automatizar auditorías de configuración.</p>

    <h3>A06: Vulnerable and Outdated Components</h3>
    <p>Usar librerías, frameworks o componentes con vulnerabilidades conocidas. Un solo paquete npm desactualizado puede comprometer toda la aplicación.</p>
    <p><strong>Cómo protegerse:</strong> Mantener un inventario de dependencias, automatizar el escaneo de vulnerabilidades (Dependabot, Snyk), actualizar regularmente, eliminar dependencias no utilizadas.</p>

    <h3>A07: Identification and Authentication Failures</h3>
    <p>Fallos en la autenticación que permiten a atacantes comprometer contraseñas, tokens de sesión o suplantar identidades. Incluye: passwords débiles permitidos, ataques de fuerza bruta no mitigados, tokens predecibles.</p>
    <p><strong>Cómo protegerse:</strong> Implementar MFA, bloqueo tras intentos fallidos, tokens de sesión seguros, políticas de contraseñas robustas.</p>

    <h3>A08: Software and Data Integrity Failures</h3>
    <p>Fallos relacionados con código y datos que no verifican su integridad. Incluye: deserialización insegura, pipelines CI/CD sin verificación, actualizaciones de software sin firma.</p>
    <p><strong>Cómo protegerse:</strong> Verificar firmas digitales, usar SRI (Subresource Integrity) para CDNs, implementar controles de integridad en pipelines.</p>

    <h3>A09: Security Logging and Monitoring Failures</h3>
    <p>Sin logging y monitorización adecuados, las brechas pasan desapercibidas durante meses. El tiempo medio de detección de una brecha sigue siendo demasiado alto.</p>
    <p><strong>Cómo protegerse:</strong> Implementar logging centralizado, alertas en tiempo real para eventos de seguridad, retención de logs conforme a regulación, monitorización de actividad sospechosa.</p>

    <h3>A10: Server-Side Request Forgery (SSRF)</h3>
    <p>SSRF permite a un atacante hacer que el servidor realice peticiones a recursos internos o externos arbitrarios. Con la adopción de microservicios y cloud, esta vulnerabilidad es cada vez más impactante.</p>
    <p><strong>Cómo protegerse:</strong> Validar y sanitizar URLs de entrada, usar allowlists para destinos permitidos, segmentar la red, deshabilitar redirecciones innecesarias.</p>

    <h2>¿Cómo evaluar tu exposición?</h2>
    <p>La mejor forma de saber si tu aplicación es vulnerable al OWASP Top 10 es mediante un <strong><a href="/recursos/blog/que-es-pentesting-empresa-2026">pentesting web profesional</a></strong>. En GreenLock, nuestras auditorías cubren todas las categorías del OWASP Top 10 (y más) usando una combinación de herramientas automatizadas y técnicas manuales avanzadas.</p>
    <p>Además, si tu empresa opera en sectores regulados, cumplir con el OWASP Top 10 es un paso fundamental para satisfacer los requisitos técnicos de normativas como <a href="/recursos/blog/nis2-guia-completa">NIS2</a>.</p>
  `,
};

// ============================================================================
// Article 3: NIS2
// ============================================================================
const article3: BlogArticle = {
  slug: 'nis2-guia-completa',
  title: 'NIS2: qué es, a quién afecta y cómo prepararse',
  metaTitle: 'NIS2: qué es, a quién afecta y cómo preparar tu empresa',
  metaDescription: 'Guía completa sobre la directiva NIS2. Descubre si tu empresa está obligada, los requisitos clave y cómo cumplir antes de los plazos.',
  excerpt: 'La nueva directiva europea de ciberseguridad NIS2 ya está en vigor. Te explicamos sus requisitos y cómo cumplirla.',
  category: 'Compliance',
  tags: ['NIS2', 'compliance', 'normativa', 'Europa', 'ciberseguridad'],
  author: {
    name: 'Diego Rodríguez',
    role: 'Co-founder & Security Engineering',
    certifications: [{ icon: '/images/HackNet-Logo.webp', label: 'HackNet 60.000+ Seguidores' }],
    linkedin: 'https://www.linkedin.com/in/hackn3t/',
    youtube: 'https://www.youtube.com/@hackn3t',
    instagram: 'https://www.instagram.com/hacknetx/',
    image: '/images/diego.webp',
  },
  publishedAt: '2026-01-20',
  readTime: '10 min',
  relatedService: 'cumplimiento-normativo',
  body: `
    <h2>¿Qué es la Directiva NIS2?</h2>
    <p>La Directiva NIS2 (Network and Information Security 2) es la evolución de la directiva NIS original de 2016. Es el marco legislativo europeo más ambicioso en materia de ciberseguridad, diseñado para elevar el nivel de protección de las infraestructuras críticas y servicios esenciales en toda la Unión Europea.</p>
    <p>Su objetivo es claro: armonizar las medidas de ciberseguridad entre los estados miembros y establecer obligaciones concretas para las organizaciones que operan en sectores críticos.</p>

    <h2>¿A quién afecta NIS2?</h2>
    <p>NIS2 amplía significativamente el ámbito de aplicación respecto a la directiva original. Afecta a organizaciones en dos categorías:</p>
    <h3>Entidades esenciales (Essential Entities)</h3>
    <ul>
      <li>Energía (electricidad, gas, petróleo, hidrógeno)</li>
      <li>Transporte (aéreo, ferroviario, marítimo, carretera)</li>
      <li>Banca y mercados financieros</li>
      <li>Salud (hospitales, laboratorios, fabricantes de productos sanitarios)</li>
      <li>Agua potable y aguas residuales</li>
      <li>Infraestructura digital (DNS, IXP, proveedores cloud, datacenters)</li>
      <li>Administración pública</li>
      <li>Espacio</li>
    </ul>
    <h3>Entidades importantes (Important Entities)</h3>
    <ul>
      <li>Servicios postales y de mensajería</li>
      <li>Gestión de residuos</li>
      <li>Fabricación de productos químicos</li>
      <li>Producción y distribución de alimentos</li>
      <li>Fabricación de dispositivos médicos, electrónicos y maquinaria</li>
      <li>Proveedores de servicios digitales (marketplaces, motores de búsqueda, redes sociales)</li>
      <li>Investigación</li>
    </ul>
    <p><strong>Criterio de tamaño:</strong> Generalmente aplica a empresas con más de 50 empleados o más de 10 millones de euros de facturación anual, aunque hay excepciones para sectores particularmente críticos.</p>

    <h2>Requisitos clave de NIS2</h2>
    <h3>Gestión de riesgos</h3>
    <p>Las organizaciones deben implementar medidas técnicas y organizativas proporcionales al riesgo, incluyendo: análisis de riesgos, políticas de seguridad, gestión de incidentes, continuidad de negocio, seguridad de la cadena de suministro, y cifrado. Para aplicaciones web, el <a href="/recursos/blog/owasp-top-10-2021">OWASP Top 10</a> es una referencia imprescindible para identificar y mitigar las vulnerabilidades más críticas.</p>
    <h3>Notificación de incidentes</h3>
    <p>NIS2 establece plazos estrictos para la notificación de incidentes significativos: alerta temprana en 24 horas, notificación completa en 72 horas, e informe final en un mes.</p>
    <h3>Responsabilidad de la dirección</h3>
    <p>Los órganos de dirección son directamente responsables de aprobar y supervisar las medidas de ciberseguridad. Deben recibir formación en la materia y pueden ser personalmente responsables en caso de incumplimiento.</p>

    <h2>Sanciones por incumplimiento</h2>
    <p>Las sanciones son significativas y proporcionadas al tipo de entidad:</p>
    <ul>
      <li><strong>Entidades esenciales:</strong> Hasta 10 millones de euros o el 2% de la facturación global anual</li>
      <li><strong>Entidades importantes:</strong> Hasta 7 millones de euros o el 1,4% de la facturación global anual</li>
    </ul>

    <h2>Cómo preparar tu empresa</h2>
    <ol>
      <li><strong>Evaluación de aplicabilidad:</strong> Determina si tu organización está dentro del ámbito de NIS2</li>
      <li><strong>Gap analysis:</strong> Evalúa tu nivel actual de madurez en ciberseguridad frente a los requisitos</li>
      <li><strong>Plan de acción:</strong> Define e implementa las medidas necesarias con plazos y responsables</li>
      <li><strong>Auditoría de seguridad:</strong> Realiza evaluaciones técnicas (<a href="/recursos/blog/que-es-pentesting-empresa-2026">pentesting</a>, auditoría de configuración) para validar las medidas implementadas</li>
      <li><strong>Formación:</strong> Capacita a la dirección y al personal en materia de ciberseguridad</li>
      <li><strong>Monitorización continua:</strong> Establece procesos de vigilancia y mejora continua</li>
    </ol>
    <p>En GreenLock ayudamos a empresas a cumplir con NIS2 a través de evaluaciones de seguridad, auditorías técnicas y consultoría de cumplimiento adaptada a cada sector.</p>
  `,
};

// ============================================================================
// EXPORT ALL ARTICLES
// ============================================================================

export const blogArticles: BlogArticle[] = [
  article1,
  article2,
  article3,
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return blogArticles.filter((a) => a.category === category);
}

