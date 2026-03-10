import { Hono } from 'hono'
import { GetMatchByIdHandler } from '@infrastructure/handlers/matchs/GetMatchByIdHandler';
import { GetMatchsHandler } from '@infrastructure/handlers/matchs/GetMatchsHandler';

const matchsRoutes = new Hono();

matchsRoutes.get("/", (c) => new GetMatchsHandler().handle(c));
matchsRoutes.get("/:id", (c) => new GetMatchByIdHandler().handle(c));


export default matchsRoutes;