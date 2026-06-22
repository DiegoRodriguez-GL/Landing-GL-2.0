import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Miembro del Equipo',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo',
      type: 'string',
      description: 'Ej: "Co-founder & Offensive Security"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
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
      name: 'bio',
      title: 'Biografía',
      type: 'text',
      rows: 3,
      description: 'Biografía breve (máx. 200 caracteres)',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'certifications',
      title: 'Certificaciones',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: CRTO, BSCP, eJPT, HackNet 60K+',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición en la web (menor = primero)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
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
