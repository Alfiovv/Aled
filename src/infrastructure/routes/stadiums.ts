import { Hono } from 'hono'
import { GetStadiumHandler } from '@infrastructure/handlers/stadium/GetStadiumHandler';
import { GetStadiumMatchsHandler } from '@infrastructure/handlers/stadium/GetStadiumMatchsHandler';
import { GetStadiumByNameHandler } from '@infrastructure/handlers/stadium/GetStadiumByNameHandler';
import { StadiumService } from '@application/Services/StadiumService';
import { Stadium } from '@domain/entities/Stadium';
import { Match } from '@domain/entities/Match';
import { AppDataSource } from '@infrastructure/database/AppDataSource';

const stadiumRoute = new Hono();

const stadiumService = new StadiumService(
    AppDataSource.getRepository(Stadium),
    AppDataSource.getRepository(Match)
);

stadiumRoute.get("/:name/matchs", (c) => new GetStadiumMatchsHandler(stadiumService).handle(c));
stadiumRoute.get("/:name", (c) => new GetStadiumByNameHandler(stadiumService).handle(c));
stadiumRoute.get("/", (c) => new GetStadiumHandler(stadiumService).handle(c));

export default stadiumRoute;