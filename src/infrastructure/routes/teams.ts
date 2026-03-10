import { Hono } from 'hono'
import { GetTeamByFifaCodeHandler } from '@infrastructure/handlers/teams/GetTeamByFifaCodeHandler';
import { GetTeamsHandler } from '@infrastructure/handlers/teams/GetTeamsHandler';

const teamsRoutes = new Hono();

teamsRoutes.get("", (c) => new GetTeamsHandler().handle(c));
teamsRoutes.get("/:fifaCode", (c) => new GetTeamByFifaCodeHandler().handle(c));


export default teamsRoutes;