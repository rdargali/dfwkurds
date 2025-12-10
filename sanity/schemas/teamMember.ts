import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
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
      title: 'Role / Position',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
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
      name: 'bio',
      title: 'Biography',
      type: 'localeText',
      description: 'Short biography or description of the team member',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: 'email',
          invert: false,
        }).error('Please enter a valid email address'),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn profile URL',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the team list',
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
        title: title || 'Unnamed Team Member',
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

