import { Hono } from 'hono'
import { GetStadiumHandler } from '@infrastructure/handlers/stadium/GetStadiumHandler';

const stadiumRoute = new Hono();

stadiumRoute.get("/", (c) => new GetStadiumHandler().handle(c));


export default stadiumRoute;