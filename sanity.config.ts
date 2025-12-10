import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Sanity Studio configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'dfwkurds',
  title: 'DFW Kurds - Kurdish American Community Association',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('News Posts')
              .schemaType('newsPost')
              .child(
                S.documentTypeList('newsPost')
                  .title('News Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Events')
              .schemaType('event')
              .child(
                S.documentTypeList('event')
                  .title('Events')
                  .defaultOrdering([{ field: 'eventDate', direction: 'asc' }])
              ),
            S.listItem()
              .title('Team Members')
              .schemaType('teamMember')
              .child(
                S.documentTypeList('teamMember')
                  .title('Team Members')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.listItem()
              .title('Resources')
              .schemaType('resource')
              .child(
                S.documentTypeList('resource')
                  .title('Resources')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              listItem =>
                !['newsPost', 'event', 'teamMember', 'resource'].includes(
                  listItem.getId() as string
                )
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

