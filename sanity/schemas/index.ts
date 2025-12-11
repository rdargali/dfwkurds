// Export all Sanity schemas
import { localeString, localeText, localeBlockContent } from './localeString'
import { newsPost } from './newsPost'
import { event } from './event'
import { teamMember } from './teamMember'
import { resource } from './resource'
import { historicalFigure } from './historicalFigure'

export const schemaTypes = [
  // Localization helpers (must be first)
  localeString,
  localeText,
  localeBlockContent,
  // Document types
  newsPost,
  event,
  teamMember,
  resource,
  historicalFigure,
]
