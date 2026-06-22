import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripción',
      type: 'string',
      description: 'Descripción para SEO (120-160 caracteres)',
      validation: (rule) =>
        rule
          .required()
          .min(120)
          .max(160)
          .warning('La meta descripción debe tener entre 120 y 160 caracteres'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 3,
      description: 'Resumen corto para cards y listings (máx. 300 caracteres)',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen destacada',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Texto descriptivo para accesibilidad y SEO',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Pentesting', value: 'Pentesting' },
          { title: 'Seguridad Web', value: 'Seguridad Web' },
          { title: 'Compliance', value: 'Compliance' },
          { title: 'Red Team', value: 'Red Team' },
          { title: 'Formación', value: 'Formación' },
          { title: 'Desarrollo', value: 'Desarrollo' },
          { title: 'Automatización', value: 'Automatización' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Última actualización',
      type: 'datetime',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura',
      type: 'string',
      description: 'Ej: "8 min"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule: any) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['https', 'http', 'mailto'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir en nueva pestaña',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Viñetas', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de imagen',
            },
          ],
        },
        {
          type: 'code',
          title: 'Bloque de código',
          options: {
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'Bash', value: 'bash' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'YAML', value: 'yaml' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'relatedService',
      title: 'Servicio relacionado',
      type: 'string',
      description: 'Slug del servicio (ej: "pentesting-web")',
      options: {
        list: [
          { title: 'Pentesting Web', value: 'pentesting-web' },
          { title: 'Pentesting Móvil', value: 'pentesting-movil' },
          { title: 'Pentesting Infraestructura', value: 'pentesting-infraestructura' },
          { title: 'Red Team', value: 'red-team' },
          { title: 'PaaS', value: 'pentesting-as-a-service' },
          { title: 'Auditoría de Seguridad', value: 'auditoria-seguridad' },
          { title: 'Cumplimiento Normativo', value: 'cumplimiento-normativo' },
          { title: 'Concienciación y Formación', value: 'concienciacion-formacion' },
          { title: 'Desarrollo Web', value: 'desarrollo-web' },
          { title: 'Desarrollo Móvil', value: 'desarrollo-movil' },
          { title: 'Chatbots IA', value: 'chatbots-ia' },
          { title: 'Automatización y APIs', value: 'automatizacion-apis' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Posts relacionados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto del botón',
          type: 'string',
        }),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'category',
      date: 'publishedAt',
    },
    prepare({ title, media, subtitle, date }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
        : '';
      return {
        title,
        media,
        subtitle: `${subtitle || ''} ${formattedDate ? `· ${formattedDate}` : ''}`,
      };
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación (recientes)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Fecha de publicación (antiguas)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});
