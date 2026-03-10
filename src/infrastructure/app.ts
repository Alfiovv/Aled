import { Hono } from 'hono'
import { parseBody } from 'hono/utils/body'
import 'dotenv/config'
import { MATCHS } from '@infrastructure/mock/matchs'
import matchsRoutes from '@infrastructure/routes/matchs'

export const app = new Hono()

app.get('/', (c) => {
  return c.json({
    name: process.env.API_NAME,
    message: process.env.API_NAME,
    success: true

  })
})

app.get('/health', (c) => {
  return c.json({
    name: process.env.API_NAME,
    message: process.env.API_NAME,
    success: true,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  })
})

app.route('/matchs', matchsRoutes)
app.route('/matchs/:id', matchsRoutes);
