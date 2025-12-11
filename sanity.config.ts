import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// Sanity Studio configuration
// Sanity automatically loads .env files and exposes variables with SANITY_STUDIO_ prefix
// For compatibility with Next.js, we also check NEXT_PUBLIC_SANITY_PROJECT_ID
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Validate project ID
if (projectId === 'your-project-id') {
  console.warn(
    '⚠️  Warning: Project ID is not set. Please set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in your .env file.'
  )
}

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
            S.listItem()
              .title('Historical Figures')
              .schemaType('historicalFigure')
              .child(
                S.documentTypeList('historicalFigure')
                  .title('Historical Figures')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              listItem =>
                !['newsPost', 'event', 'teamMember', 'resource', 'historicalFigure'].includes(
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

