import { createRoute } from '@hono/zod-openapi'
import { PlayersSchema } from '../../schemas/player'
import { ErrorSchema } from '../../schemas/error'
import { Player } from '../../types'
import ballDontLieRequest from '../../lib/ballDontLie'

const route = createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: PlayersSchema,
          },
        },
        description: 'Retrieve all players',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: "Error"
      }
    },
})

const handler = async (c) => {
    const { BALL_DONT_LIE_API_KEY } = c.env
    const players: Array<Player> = await ballDontLieRequest(BALL_DONT_LIE_API_KEY, 'players')

    return c.json(
        players,
        200
    )
}

export { route, handler }