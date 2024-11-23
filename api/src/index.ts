import { apiReference } from '@scalar/hono-api-reference'
import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import teams from './routes/teams'
import players from './routes/players'

const app = new OpenAPIHono()

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Basketball API',
  },
})

app.get(
  '/',
  apiReference({
    pageTitle: 'Basketball API Reference',
    spec: {
      url: '/doc',
    },
    darkMode: true
  }),
)

app.route('/teams', teams)
app.route('/players', players)

// Keep wildcard for 404 as last registered route
app.all('*', (c)=> {
  throw new HTTPException(404, { message: '404 Not Found.\nIf you are attempting to use an endpoint with an id, make sure to include the specified id in your request' })
})

export default app
