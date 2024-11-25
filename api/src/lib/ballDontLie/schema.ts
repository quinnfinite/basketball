import { z } from '@hono/zod-openapi'

const BallDontLieMetaSchema = z.object({
    prev_cursor: z.number().openapi({
        example: 25,
    }),
    next_cursor: z.number().openapi({
        example: 50,
    }),
    per_page: z.number().openapi({
        example: 25,
    })
})

const BallDontLieDataSchema = z.array(z.object({}))

export const BallDontLieResponseSchema = z.object({
    data: BallDontLieDataSchema,
    meta: BallDontLieMetaSchema
})