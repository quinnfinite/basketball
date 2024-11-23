import { apiReference } from '@scalar/hono-api-reference'
import { OpenAPIHono } from '@hono/zod-openapi'
import teams from './routes/teams'

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
    spec: {
      url: '/doc',
    },
  }),
)

app.route('/teams', teams)

export default app
