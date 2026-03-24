import { Hono } from 'hono'
import { GetStadiumHandler } from '@infrastructure/handlers/stadium/GetStadiumHandler';
import { GetStadiumByNameHandler } from '@infrastructure/handlers/stadium/GetStadiumByNameHandler';
import { GetCountryCitiesHandler } from '@infrastructure/handlers/country/GetCountryCitiesHandler';

const stadiumRoute = new Hono();

stadiumRoute.get("/:name/matchs", (c) => new GetCountryCitiesHandler().handle(c));
stadiumRoute.get("/:name", (c) => new GetStadiumByNameHandler().handle(c));
stadiumRoute.get("/", (c) => new GetStadiumHandler().handle(c));


export default stadiumRoute;