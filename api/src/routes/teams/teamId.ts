import { createRoute } from '@hono/zod-openapi'
import { TeamSchema } from './schemas'
import ballDontLieRequest from '../../lib/ballDontLie'

const route = createRoute({
    method: 'get',
    path: '/{id}',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamSchema,
          },
        },
        description: 'Retrieve specific team',
      },
    },
})

const handler = async (c) => {
    const teamId = c.req.param('id')

    const { BALL_DONT_LIE_API_KEY } = c.env

    const endpoint = `teams/${teamId}`

    const team = await ballDontLieRequest(BALL_DONT_LIE_API_KEY, endpoint)

    return c.json(
      team,
        200
    )
}

export { route, handler };