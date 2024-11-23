import { OpenAPIHono } from '@hono/zod-openapi'
import { route as baseRoute, handler as baseHandler } from './base'
import { route as teamIdRoute, handler as teamIdHandler } from './teamId'
import { route as playerCountByRoundRoute, handler as playerCountByRoundHandler } from './playerCountByRound'

const teams = new OpenAPIHono()

teams.openapi(baseRoute, baseHandler)
teams.openapi(teamIdRoute, teamIdHandler)
teams.openapi(playerCountByRoundRoute, playerCountByRoundHandler)
export default teams;