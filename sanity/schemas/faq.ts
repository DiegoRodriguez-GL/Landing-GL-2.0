import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'Pregunta Frecuente',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceSlug',
      title: 'Servicio asociado',
      type: 'string',
      description: 'Slug del servicio al que pertenece esta FAQ',
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
          { title: 'General', value: 'general' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición (menor = primero)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'serviceSlug',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Servicio: ${subtitle}` : 'General',
      };
    },
  },
  orderings: [
    {
      title: 'Servicio + Orden',
      name: 'serviceOrder',
      by: [
        { field: 'serviceSlug', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});
