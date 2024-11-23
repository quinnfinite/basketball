import { OpenAPIHono } from '@hono/zod-openapi'
import { route as baseRoute, handler as baseHandler } from './teamId'
import { route as teamIdRoute, handler as teamIdHandler } from './teamId'

const teams = new OpenAPIHono()

teams.openapi(baseRoute, baseHandler)
teams.openapi(teamIdRoute, teamIdHandler)

export default teams;