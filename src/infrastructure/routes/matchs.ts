import { Context, Hono } from 'hono'
import { MATCHS } from '@infrastructure/mock/matchs'
import { GetMatchByIdHandler } from '@infrastructure/handlers/GetMatchByIdHandler';
import { GetMatchsHandler } from '@infrastructure/handlers/GetMatchsHandler';

const matchsRoutes = new Hono();

matchsRoutes.get("/", (c) => new GetMatchsHandler().handle(c));
matchsRoutes.get("/:id", (c) => new GetMatchByIdHandler().handle(c));


export default matchsRoutes;