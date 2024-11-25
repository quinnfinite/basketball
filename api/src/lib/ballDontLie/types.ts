import { z } from '@hono/zod-openapi'
import { BallDontLieResponseSchema } from './schema'

export type BallDontLieResponse = z.infer<typeof BallDontLieResponseSchema>