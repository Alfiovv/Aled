import { Hono } from 'hono'
import { GetCountryHandler } from '@infrastructure/handlers/country/GetCountryHandler';

const countryRoutes = new Hono();

countryRoutes.get("/", (c) => new GetCountryHandler().handle(c));


export default countryRoutes;