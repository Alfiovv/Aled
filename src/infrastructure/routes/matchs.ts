import { Hono } from 'hono'
import { GetMatchByIdHandler } from '@infrastructure/handlers/matchs/GetMatchByIdHandler';
import { GetMatchsHandler } from '@infrastructure/handlers/matchs/GetMatchsHandler';
import { GetMatchByStage } from '@infrastructure/handlers/matchs/GetMatchByStage';
import { GetMatchsByStatusHandler } from '@infrastructure/handlers/matchs/GetMatchsByStatusHandler';
import { GetMatchsByStageHandler } from '@infrastructure/handlers/matchs/GetMatchsByStageHandler';

const matchsRoutes = new Hono();

matchsRoutes.get("/status/:status", (c) => new GetMatchsByStatusHandler().handle(c));
matchsRoutes.get("/stages/:stage", (c) => new GetMatchsByStageHandler().handle(c));
matchsRoutes.get("/:stage", (c) => new GetMatchByStage().handle(c));
matchsRoutes.get("/:id", (c) => new GetMatchByIdHandler().handle(c));
matchsRoutes.get("/", (c) => new GetMatchsHandler().handle(c));

export default matchsRoutes;