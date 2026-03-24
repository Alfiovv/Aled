import { Hono } from 'hono'
import { CreateTicketHandler } from '@infrastructure/handlers/tickets/CreateTicketHandler';

const ticketsRoutes = new Hono();

ticketsRoutes.post("/", (c) => new CreateTicketHandler().handle(c));


export default ticketsRoutes;