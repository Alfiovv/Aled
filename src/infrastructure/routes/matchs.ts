import { Hono } from 'hono'
import { GetMatchByIdHandler } from '@infrastructure/handlers/matchs/GetMatchByIdHandler';
import { GetMatchsHandler } from '@infrastructure/handlers/matchs/GetMatchsHandler';
import { GetMatchByStage } from '@infrastructure/handlers/matchs/GetMatchByStage';
import { GetMatchsByStatusHandler } from '@infrastructure/handlers/matchs/GetMatchsByStatusHandler';
import { GetMatchsByStageHandler } from '@infrastructure/handlers/matchs/GetMatchsByStageHandler';
import { MatchService } from '@application/Services/MatchService';
import { Match } from '@domain/entities/Match';
import { AppDataSource } from '@infrastructure/database/AppDataSource';

const matchsRoutes = new Hono();

const matchService = new MatchService(AppDataSource.getRepository(Match));

matchsRoutes.get("/status/:status", (c) => new GetMatchsByStatusHandler(matchService).handle(c));
matchsRoutes.get("/stages/:stage", (c) => new GetMatchsByStageHandler(matchService).handle(c));
//matchsRoutes.get("/:stage", (c) => new GetMatchByStage(matchService).handle(c));
matchsRoutes.get("/:id", (c) => new GetMatchByIdHandler(matchService).handle(c));
matchsRoutes.get("/", (c) => new GetMatchsHandler(matchService).handle(c));

export default matchsRoutes;