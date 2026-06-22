import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  icon: () => '⚙️',
  // Singleton: solo se permite un documento de este tipo
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nombre de la empresa',
      type: 'string',
      initialValue: 'GreenLock Cybersecurity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción de la empresa',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      initialValue: 'info@greenlock.tech',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Número completo con código de país, ej: +34 682 790 545',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'object',
      fields: [
        defineField({
          name: 'city',
          title: 'Ciudad',
          type: 'string',
          initialValue: 'Madrid',
        }),
        defineField({
          name: 'country',
          title: 'País',
          type: 'string',
          initialValue: 'España',
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Redes sociales',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'X (Twitter)',
          type: 'url',
        }),
        defineField({
          name: 'github',
          title: 'GitHub',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración del Sitio',
        subtitle: 'GreenLock Cybersecurity',
      };
    },
  },
});
