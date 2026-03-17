import { Hono } from 'hono'
import { GetTeamByFifaCodeHandler } from '@infrastructure/handlers/teams/GetTeamByFifaCodeHandler';
import { GetTeamsHandler } from '@infrastructure/handlers/teams/GetTeamsHandler';
import { GetTeamMatchsByFifaCodeHandler } from '@infrastructure/handlers/teams/GetTeamMatchsByFifaCodeHandler';
import { GetTeamMatchsByStageHandler } from '@infrastructure/handlers/teams/GetTeamMatchsByStageHandler';

const teamsRoutes = new Hono();
teamsRoutes.get("/:fifaCode/matchs", (c) => new GetTeamMatchsByFifaCodeHandler().handle(c));
teamsRoutes.get("/:fifaCode/matchs/{stage}", (c) => new GetTeamMatchsByStageHandler().handle(c));
teamsRoutes.get("/:fifaCode", (c) => new GetTeamByFifaCodeHandler().handle(c));
teamsRoutes.get("/", (c) => new GetTeamsHandler().handle(c));


export default teamsRoutes;