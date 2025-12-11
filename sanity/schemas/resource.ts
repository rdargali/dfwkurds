import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Resource Name',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'logo',
      title: 'Logo / Icon',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Government', value: 'government' },
          { title: 'Legal', value: 'legal' },
          { title: 'Education', value: 'education' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Community', value: 'community' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Employment', value: 'employment' },
          { title: 'News', value: 'news' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      const categoryLabels: Record<string, string> = {
        government: '🏛️ Government',
        legal: '⚖️ Legal',
        education: '📚 Education',
        healthcare: '🏥 Healthcare',
        community: '🤝 Community',
        cultural: '🎭 Cultural',
        employment: '💼 Employment',
        news: '📰 News',
        other: '📋 Other',
      }
      return {
        title: title || 'Unnamed Resource',
        subtitle: subtitle ? categoryLabels[subtitle] : 'Uncategorized',
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
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
