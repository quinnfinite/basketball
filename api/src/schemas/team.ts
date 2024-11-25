import { z } from '@hono/zod-openapi'

export const TeamSchema = z
  .object({
    id: z.string().openapi({
      example: '10',
    }),
    conference: z.string().openapi({
        example: 'West',
    }),
    division: z.string().openapi({
        example: 'Pacific',
    }),
    city: z.string().openapi({
        example: 'Golden State',
    }),        
    name: z.string().openapi({
      example: 'Warriors',
    }),
    full_name: z.string().openapi({
        example: "Golden State Warriors",
    }),
    abbreviation: z.string().openapi({
        example: 'GSW',
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

// Params & Query Schemas
export const RetrieveTeamParamsSchema = z.object({
    teamId: z
      .string()
      .openapi({
        param: {
          name: 'teamId',
          in: 'path',
        },
        example: '10',
        description: "The ID of the team to retrieve. If you don't know the id, use the /teams endpoint"
      }),
})

export const RetrievePlayersCountByDraftRoundQuerySchema = z.object({
    rounds: z.string()
        .optional()
        .openapi({
            param: {
                name: 'rounds',
                in: 'query'
            },
            example: '1,2,null',
            description: 'Valid rounds for counting players'
        }),
    allTime: z.enum(["true", 'false'])
        .optional()
        .openapi({
            param: {
                name: 'allTime',
                in: 'query'
            },
            example: 'false',
            description: 'If true, will go through our full dataset'
        }),
})