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

// Because we are not using 'strict', additional fields will be valid
// z.record(z.string(), z.number()) would be preferred. But this renders in a weird way on the generated documentation via @scalar/hono-api-reference
export const PlayerCountByDraftRoundSchema = z.object({
    "1": z.number().optional().openapi({ example: 13 }),
    "2": z.number().optional().openapi({ example: 7 }),
    "null": z.number().optional().openapi({ example: 5 }),
})

export const TeamNameAndPlayerCountSchema = z.object({
    team_name: z.string().openapi({
        example: "Golden State Warriors"
    }),
    /*
    Note: z.record may be more precise, but if not using strict mode,
    validation will still pass, and the example in the hosted documentation is better
    */
    draft_rounds: PlayerCountByDraftRoundSchema
})