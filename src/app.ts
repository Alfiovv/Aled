import { Hono } from 'hono'
import { parseBody } from 'hono/utils/body'

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
