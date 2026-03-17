import { Hono } from 'hono'
import 'dotenv/config'
import matchsRoutes from '@infrastructure/routes/matchs'
import homeRoutes from '@infrastructure/routes/home'
import teamsRoutes from '@infrastructure/routes/teams'
import countryRoutes from './routes/countries'
import cityRoutes from './routes/cities'
import stadiumRoute from './routes/stadiums'
import { ErrorHandler } from './handlers/error/ErrorHandler'
export const app = new Hono()
//home
app.route('/', homeRoutes)
app.route('/health', homeRoutes)

//matchs
app.route('/matchs', matchsRoutes)

//teams
app.route("/teams", teamsRoutes)

//country
app.route("/countries", countryRoutes)

//city
app.route("/cities", cityRoutes)

//stadium
app.route("/stadiums", stadiumRoute)

app.onError(ErrorHandler);