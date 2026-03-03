import { Hono } from 'hono'
import { parseBody } from 'hono/utils/body'
import 'dotenv/config'
import { MATCHS } from 'mock/matchs'

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

app.get('/matchs', (c) => {
  return c.json({
    success: true,
    message: "All matchs",
    data: MATCHS
  })
})
app.get('/matchs/:id', (c) => {
  const id = Number(c.req.param("id"));
  const match = MATCHS.find(m => m.id === id);

  if (!match) {
    return c.json({
      success: false,
      error: "Match " + id + " does not exist",
    }, 404);

  }

  return c.json({
    success: true,
    id: id,
    message: "Match " + id,
    data: match
  });
});
