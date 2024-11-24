import { OpenAPIHono } from '@hono/zod-openapi'
import base from './base'

const players = new OpenAPIHono()

players.route('/', base)

export default players;