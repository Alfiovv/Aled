import { Hono } from 'hono'
import { GetTeamByFifaCodeHandler } from '@infrastructure/handlers/teams/GetTeamByFifaCodeHandler';
import { GetTeamsHandler } from '@infrastructure/handlers/teams/GetTeamsHandler';

const teamsRoutes = new Hono();

teamsRoutes.get("/:fifaCode", (c) => new GetTeamByFifaCodeHandler().handle(c));
teamsRoutes.get("/", (c) => new GetTeamsHandler().handle(c));


export default teamsRoutes;