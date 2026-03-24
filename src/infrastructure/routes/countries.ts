import { Hono } from 'hono'
import { GetCountryHandler } from '@infrastructure/handlers/country/GetCountryHandler';
import { GetCountryCitiesHandler } from '@infrastructure/handlers/country/GetCountryCitiesHandler';

const countryRoutes = new Hono();

countryRoutes.get("/:code/cities", (c) => new GetCountryCitiesHandler().handle(c));
countryRoutes.get("/", (c) => new GetCountryHandler().handle(c));


export default countryRoutes;