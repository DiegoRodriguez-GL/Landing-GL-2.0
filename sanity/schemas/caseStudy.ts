import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Caso de Éxito',
  type: 'document',
  icon: () => '🏆',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'sector',
      title: 'Sector',
      type: 'string',
      description: 'Ej: "E-commerce · Retail", "Fintech · Banca"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      description: 'Nombre del cliente (puede ser anónimo, ej: "Plataforma E-commerce")',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Resumen del caso para cards y destacados',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'Desafío',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
          },
          lists: [
            { title: 'Viñetas', value: 'bullet' },
          ],
        },
      ],
    }),
    defineField({
      name: 'solution',
      title: 'Solución',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
          },
          lists: [
            { title: 'Viñetas', value: 'bullet' },
          ],
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Resultados',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              description: 'Ej: "23", "85%", "48h"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'metric',
              title: 'Métrica',
              type: 'string',
              description: 'Ej: "Vulnerabilidades críticas halladas"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'metric' },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonio',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Cita',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'name',
          title: 'Nombre',
          type: 'string',
          description: 'Puede ser anónimo: "Director de Tecnología"',
        }),
        defineField({
          name: 'role',
          title: 'Cargo',
          type: 'string',
        }),
        defineField({
          name: 'company',
          title: 'Empresa',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en Home',
      type: 'boolean',
      description: 'Mostrar este caso en la sección de la home page',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición (menor = primero)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sector',
      featured: 'featured',
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: 'Orden personalizado',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
