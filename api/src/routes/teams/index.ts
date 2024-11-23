import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { TeamsSchema } from './schemas'

const teams = new OpenAPIHono()

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

const handler = (c) => {
    return c.json(
        [
            {
                "id": 14,
                "conference": "MY-West",
                "division": "Pacific",
                "city": "Los Angeles",
                "name": "Lakers",
                "full_name": "Los Angeles Lakers",
                "abbreviation": "LAL"
            }            
        ],
        200
    )
}

teams.openapi(route, handler)

export default teams;