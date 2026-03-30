import { Hono } from 'hono'
import { GetCountryHandler } from '@infrastructure/handlers/country/GetCountryHandler';
import { GetCountryCitiesHandler } from '@infrastructure/handlers/country/GetCountryCitiesHandler';
import { GetCountryByCodeHandler } from '@infrastructure/handlers/country/GetCountryByCodeHandler';

const countryRoutes = new Hono();

countryRoutes.get("/:code/cities", (c) => new GetCountryCitiesHandler().handle(c));
countryRoutes.get("/:code", (c) => new GetCountryByCodeHandler().handle(c));
countryRoutes.get("/", (c) => new GetCountryHandler().handle(c));


export default countryRoutes;