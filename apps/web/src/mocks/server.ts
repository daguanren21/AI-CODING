/* c8 ignore start */
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
/* c8 ignore end */
