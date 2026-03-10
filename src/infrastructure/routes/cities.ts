import { Hono } from 'hono'
import { GetCityHandler } from '@infrastructure/handlers/city/GetCityHandler';

const cityRoutes = new Hono();

cityRoutes.get("", (c) => new GetCityHandler().handle(c));


export default cityRoutes;