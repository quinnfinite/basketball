import { apiReference } from '@scalar/hono-api-reference'
import { OpenAPIHono } from '@hono/zod-openapi'
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

export default app
