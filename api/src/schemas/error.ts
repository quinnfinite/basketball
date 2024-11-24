import { z } from '@hono/zod-openapi'

export const ErrorSchema = z
  .object({
    message: z.string().openapi({
        example: 'Internal Server Error',
    }),
    cause: z.string().openapi({
        example: "Request to Ball Don't Lie Failed. Response status: 500",
    }),
  })
  .openapi('Error')