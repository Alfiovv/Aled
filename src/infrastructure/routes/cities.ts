import { Hono } from 'hono'
import { GetCityHandler } from '@infrastructure/handlers/city/GetCityHandler';
import { GetCityMatchsHandler } from '@infrastructure/handlers/city/GetCityMatchsHandler';
import { GetCityByNameHandler } from '@infrastructure/handlers/city/GetCityByNameHandler';
import { CityService } from '@application/Services/CityService';
import { MatchService } from '@application/Services/MatchService';
import { City } from '@domain/entities/City';
import { Match } from '@domain/entities/Match';
import { AppDataSource } from '@infrastructure/database/AppDataSource';

const cityRoutes = new Hono();

const cityService = new CityService(AppDataSource.getRepository(City));
const matchService = new MatchService(AppDataSource.getRepository(Match));

cityRoutes.get("/:name/matchs", (c) => new GetCityMatchsHandler(cityService, matchService).handle(c));
cityRoutes.get("/:name", (c) => new GetCityByNameHandler(cityService).handle(c));
cityRoutes.get("/", (c) => new GetCityHandler(cityService).handle(c));

export default cityRoutes;