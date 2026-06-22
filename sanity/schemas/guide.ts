import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'guide',
  title: 'Guía',
  type: 'document',
  icon: () => '📖',
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
      validation: (rule) => rule.min(120).max(160),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 3,
      description: 'Resumen corto para cards y listings',
      validation: (rule) => rule.max(300),
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
          { title: 'Herramientas', value: 'Herramientas' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
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
      ],
    }),
    defineField({
      name: 'relatedService',
      title: 'Servicio relacionado',
      type: 'string',
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'category',
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación (recientes)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
