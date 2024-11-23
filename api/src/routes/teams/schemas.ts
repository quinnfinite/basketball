import { z } from '@hono/zod-openapi'

export const TeamSchema = z
  .object({
    id: z.string().openapi({
      example: '14',
    }),
    conference: z.string().openapi({
        example: 'West',
    }),
    division: z.string().openapi({
        example: 'Pacific',
    }),
    city: z.string().openapi({
        example: 'Los Angeles',
    }),        
    name: z.string().openapi({
      example: 'Lakers',
    }),
    full_name: z.string().openapi({
        example: 'Los Angeles Lakers',
    }),
    abbreviation: z.string().openapi({
        example: 'LAL',
    }),
  })
  .openapi('Team')

export const TeamsSchema = z.array(TeamSchema)