// Field-level localization helper for Sanity
// Supports English (en), Sorani Kurdish (ckb), and Kurmanji Kurdish (kmr)

import { defineType } from 'sanity'

export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'ckb', title: 'کوردی سۆرانی (Sorani)', isDefault: false },
  { id: 'kmr', title: 'Kurmancî (Kurmanji)', isDefault: false },
]

export const baseLanguage = supportedLanguages.find(l => l.isDefault)!

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'text',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
})

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Quote', value: 'blockquote' },
        ],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' },
            { title: 'Italic', value: 'em' },
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                },
              ],
            },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
      },
    ],
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
})
