import { createRoute } from '@hono/zod-openapi'
import { TeamsSchema } from '../../schemas/team'
import { Team } from '../../types'
import ballDontLieRequest from '../../lib/ballDontLie'

const route = createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamsSchema,
          },
        },
        description: 'Retrieve all teams',
      },
    },
})

const handler = async (c) => {
    const { BALL_DONT_LIE_API_KEY } = c.env
    const teams: Array<Team> = await ballDontLieRequest(BALL_DONT_LIE_API_KEY, 'teams')

    return c.json(
        teams,
        200
    )
}

export { route, handler }