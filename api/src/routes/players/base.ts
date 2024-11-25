import { createRoute } from '@hono/zod-openapi'
import { PlayersSchema } from '../../schemas/player'
import { ErrorSchema } from '../../schemas/error'
import { Player } from '../../types'
import ballDontLie from '../../lib/ballDontLie'
import { env } from 'hono/adapter'
import { OpenAPIHono } from '@hono/zod-openapi'
import { RetrievePlayersQuerySchema } from '../../schemas/player'
import { DEFAULT_CURSOR, DEFAULT_PER_PAGE } from '../../constants'

const base = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/',
    summary: 'Retrieve all players',
    request: {
      query: RetrievePlayersQuerySchema
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: PlayersSchema,
          },
        },
        description: 'Array of objects with player data',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: "Object with error message, and cause"
      }
    },
})

base.openapi(
  route,
  async (c) => {
      const { BALL_DONT_LIE_API_KEY } = env<{ BALL_DONT_LIE_API_KEY: string }>(c)

      const {
        cursor = DEFAULT_CURSOR,
        perPage = DEFAULT_PER_PAGE
      } = c.req.query();

      const endpoint: string = `players?cursor=${cursor}&${perPage}`

      const players: Array<Player> = await ballDontLie(BALL_DONT_LIE_API_KEY, endpoint)

      return c.json(
          players,
          200
      )
  }
)

export default base;