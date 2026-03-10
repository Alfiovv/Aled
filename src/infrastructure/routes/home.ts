import { Hono } from 'hono'
import { GetHomeHandler } from '@infrastructure/handlers/home/GetHomeHandler';
import { GetHealthHandler } from '@infrastructure/handlers/home/GetHealthHandler';

const homeRoutes = new Hono();

homeRoutes.get("/", (c) => new GetHomeHandler().handle(c));
homeRoutes.get("/health", (c) => new GetHealthHandler().handle(c));


export default homeRoutes;