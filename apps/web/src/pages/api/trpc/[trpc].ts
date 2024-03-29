/**
 * This file contains tRPC's HTTP response handler
 */
import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@/server/generated/routers'
import { createContext } from '@/server/context'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
