import { Hono } from 'hono'
import { GetCityHandler } from '@infrastructure/handlers/city/GetCityHandler';
import { GetCityMatchsHandler } from '@infrastructure/handlers/city/GetCityMatchsHandler';

const cityRoutes = new Hono();

cityRoutes.get("/:name/matchs", (c) => new GetCityMatchsHandler().handle(c));
cityRoutes.get("/", (c) => new GetCityHandler().handle(c));


export default cityRoutes;