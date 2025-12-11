import { defineType, defineField } from 'sanity'

export const historicalFigure = defineType({
  name: 'historicalFigure',
  title: 'Historical Figure',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'localeString',
      description: 'e.g., "Kurdish Leader (1903-1979)" or "Poet & Scholar (1650-1707)"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      description: 'Short biography or description of the historical figure',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Portrait photo of the historical figure (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      description: 'Color theme for the card display',
      options: {
        list: [
          { title: 'Kurdish Red', value: 'kurd-red' },
          { title: 'Kurdish Green', value: 'kurd-green' },
          { title: 'Kurdish Gold', value: 'kurd-gold' },
        ],
        layout: 'radio',
      },
      initialValue: 'kurd-red',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the list',
      initialValue: 100,
      validation: Rule => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'role.en',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Historical Figure',
        subtitle: subtitle || 'No role',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name.en', direction: 'asc' }],
    },
  ],
})
