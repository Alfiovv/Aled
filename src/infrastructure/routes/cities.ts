import { Hono } from 'hono'
import { GetCityHandler } from '@infrastructure/handlers/city/GetCityHandler';
import { GetCityMatchsHandler } from '@infrastructure/handlers/city/GetCityMatchsHandler';
import { GetCityByNameHandler } from '@infrastructure/handlers/city/GetCityByNameHandler';

const cityRoutes = new Hono();

cityRoutes.get("/:name/matchs", (c) => new GetCityMatchsHandler().handle(c));
cityRoutes.get("/:name", (c) => new GetCityByNameHandler().handle(c));
cityRoutes.get("/", (c) => new GetCityHandler().handle(c));


export default cityRoutes;