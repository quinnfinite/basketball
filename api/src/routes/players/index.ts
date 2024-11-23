import { OpenAPIHono } from '@hono/zod-openapi'
import { route as baseRoute, handler as baseHandler } from './base'

const players = new OpenAPIHono()

players.openapi(baseRoute, baseHandler)

export default players;