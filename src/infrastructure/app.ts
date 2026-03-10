import { Hono } from 'hono'
import 'dotenv/config'
import matchsRoutes from '@infrastructure/routes/matchs'
import homeRoutes from '@infrastructure/routes/home'

export const app = new Hono()
//home
app.route('/', homeRoutes)
app.route('/health', homeRoutes)

//matchs
app.route('/matchs', matchsRoutes)
app.route('/matchs/:id', matchsRoutes);
