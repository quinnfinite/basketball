import { OpenAPIHono } from '@hono/zod-openapi'
import base from './base';
import teamId from './teamId'
import playerCountByDraftRound from './playerCountByDraftRound';

const teams = new OpenAPIHono()

// Work-around for larger routing in Hono - https://hono.dev/docs/guides/best-practices#building-a-larger-application
teams.route('/', base)
teams.route('/', teamId)
teams.route('/', playerCountByDraftRound)

export default teams;