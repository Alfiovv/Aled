import { Hono } from 'hono'
import { GetTeamByFifaCodeHandler } from '@infrastructure/handlers/teams/GetTeamByFifaCodeHandler';
import { GetTeamsHandler } from '@infrastructure/handlers/teams/GetTeamsHandler';
import { GetTeamMatchsByFifaCodeHandler } from '@infrastructure/handlers/teams/GetTeamMatchsByFifaCodeHandler';
import { GetTeamMatchsByStageHandler } from '@infrastructure/handlers/teams/GetTeamMatchsByStageHandler';
import { TeamService } from '@application/Services/TeamService';
import { Team } from '@domain/entities/Team';
import { Match } from '@domain/entities/Match';
import { AppDataSource } from '@infrastructure/database/AppDataSource';

const teamsRoutes = new Hono();

const teamService = new TeamService(
    AppDataSource.getRepository(Team),
    AppDataSource.getRepository(Match)
);

teamsRoutes.get("/:fifaCode/matchs", (c) => new GetTeamMatchsByFifaCodeHandler(teamService).handle(c));
teamsRoutes.get("/:fifaCode/matchs/:stage", (c) => new GetTeamMatchsByStageHandler(teamService).handle(c));
teamsRoutes.get("/:fifaCode", (c) => new GetTeamByFifaCodeHandler(teamService).handle(c));
teamsRoutes.get("/", (c) => new GetTeamsHandler(teamService).handle(c));

export default teamsRoutes;