import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { TeamsSchema } from '../../schemas/team'
import { ErrorSchema } from '../../schemas/error'
import ballDontLie from '../../lib/ballDontLie'
import { Team } from '../../types'
import { env } from 'hono/adapter'
import { HTTPException } from 'hono/http-exception'

const teamId = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/{teamId}',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamsSchema,
          },
        },
        description: 'Retrieve specific team',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: "Error retrieving specific team"
      }
    },
})

teamId.openapi(
  route, 
  async (c) => {
      const teamId = c.req.param('teamId')

      const { BALL_DONT_LIE_API_KEY } = env<{ BALL_DONT_LIE_API_KEY: string }>(c)

      const endpoint = `teams/${teamId}`

      try {

        const teams: Array<Team> = await ballDontLie(BALL_DONT_LIE_API_KEY, endpoint)

        return c.json(
          teams,
          200
        )

      } catch(error) {

        const message = `Error retrieving team with teamId ${teamId}.\nConfirm the teamId uses is valid and try again`;

        const cause = (error as Error).message;

        throw new HTTPException(500, { message, cause })

      }
  }
)

export default teamId