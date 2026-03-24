import { Hono } from 'hono'
import { GetStadiumHandler } from '@infrastructure/handlers/stadium/GetStadiumHandler';
import { GetStadiumMatchsHandler } from '@infrastructure/handlers/stadium/GetStadiumMatchsHandler';

const stadiumRoute = new Hono();

stadiumRoute.get("/:name/matchs", (c) => new GetStadiumMatchsHandler().handle(c));
stadiumRoute.get("/", (c) => new GetStadiumHandler().handle(c));


export default stadiumRoute;