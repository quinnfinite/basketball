import { OpenAPIHono } from '@hono/zod-openapi'
import base from './base';
import teamId from './teamId'
import playerCountByRound from './playerCountByRound';

const teams = new OpenAPIHono()

// Work-around for larger routing in Hono - https://hono.dev/docs/guides/best-practices#building-a-larger-application
teams.route('/', base)
teams.route('/', teamId)
teams.route('/', playerCountByRound)

export default teams;