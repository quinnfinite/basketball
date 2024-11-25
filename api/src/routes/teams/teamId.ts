import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { RetrieveTeamParamsSchema, TeamsSchema } from '../../schemas/team'
import { ErrorSchema } from '../../schemas/error'
import ballDontLie from '../../lib/ballDontLie'
import type { Team } from '../../types'
import { env } from 'hono/adapter'
import { HTTPException } from 'hono/http-exception'

const teamId = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/{teamId}',
    summary: "Retrieve a specific team",
    description: "A valid team id is required as part of the request. Valid team ids can be found by requesting all teams.",
    request: {
      params: RetrieveTeamParamsSchema
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamsSchema,
          },
        },
        description: 'Object with Team data',
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

teamId.openapi(
  route, 
  async (c) => {
      const teamId = c.req.param('teamId')

      const { BALL_DONT_LIE_API_KEY } = env<{ BALL_DONT_LIE_API_KEY: string }>(c)

      const endpoint = `teams/${teamId}`

      try {
        const { data } = await ballDontLie(BALL_DONT_LIE_API_KEY, endpoint)

        const teams = data as Array<Team>

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