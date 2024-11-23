import { z } from '@hono/zod-openapi'

export const ErrorSchema = z
  .object({
    message: z.string().openapi({
      example: 'Internal Server Error',
    }),
  })
  .openapi('Error')