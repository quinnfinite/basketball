import { z } from '@hono/zod-openapi'

import { TeamSchema } from './team'

  export const RetrievePlayersQuerySchema = z.object({
    cursor: z.string()
      .optional()
      .openapi({
        param: {
          name: 'cursor',
          in: 'query',
        },
        example: '0',
        description: 'The cursor, used for pagination'
    }),
    perPage: z.string()
      .max(100)
      .optional()
      .openapi({
        param: {
          name: 'perPage',
          in: 'query',
        },
        example: '25',
        description: 'The number of players per page. Default is 25. Max is 100'
    }),
  })

export const PlayerSchema = z.object({
    id: z.string().openapi({
        example: '19',
    }),
    first_name: z.string().openapi({
        example: 'Stephen',
    }),
    last_name: z.string().openapi({
        example: 'Curry',
    }),
    position: z.string().openapi({
        example: 'G',
    }),
    height: z.string().openapi({
        example: '6-2',
    }),
    weight: z.string().openapi({
        example: '185',
    }),
    jersey_number: z.string().openapi({
        example: '30',
    }),
    college: z.string().openapi({
        example: 'Davidson',
    }),
    country: z.string().openapi({
        example: 'USA',
    }),
    draft_year: z.string().openapi({
        example: '2009',
    }),
    draft_round: z.string().openapi({
        example: '1',
    }),
    draft_number: z.string().openapi({
        example: '7',
    }),
    team: TeamSchema
})
.openapi('Player')

export const PlayersSchema = z.array(PlayerSchema)