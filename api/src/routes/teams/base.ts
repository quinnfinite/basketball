import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { TeamsSchema } from '../../schemas/team'
import { ErrorSchema } from '../../schemas/error'
import { Team } from '../../types'
import ballDontLie from '../../lib/ballDontLie'
import { HTTPException } from 'hono/http-exception'
import { env } from 'hono/adapter'

const base = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/',
    summary: "Retrieve all teams",
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamsSchema,
          },
        },
        description: 'Array of objects with team data',
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

    try {
      const teams: Array<Team> = await ballDontLie(BALL_DONT_LIE_API_KEY, 'teams')

      return c.json(
        teams,
        200
      )

    } catch(error) {

      const message = "Error retrieving all teams";

      const cause = (error as Error).message;

      throw new HTTPException(500, { message, cause })

    }
  }
)

export default base