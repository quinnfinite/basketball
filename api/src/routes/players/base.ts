import { createRoute } from '@hono/zod-openapi'
import { PlayersResponseSchema } from '../../schemas/player'
import { ErrorSchema } from '../../schemas/error'
import type { PlayersResponse } from '../../types'
import ballDontLie from '../../lib/ballDontLie'
import { env } from 'hono/adapter'
import { OpenAPIHono } from '@hono/zod-openapi'
import { RetrievePlayersQuerySchema } from '../../schemas/player'
import { DEFAULT_CURSOR, DEFAULT_PER_PAGE } from '../../constants'

const base = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/',
    summary: 'Retrieve players',
    request: {
      query: RetrievePlayersQuerySchema
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: PlayersResponseSchema
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

      const response = await ballDontLie(BALL_DONT_LIE_API_KEY, endpoint) as PlayersResponse

      return c.json(
          response,
          200
      )
  }
)

export default base;