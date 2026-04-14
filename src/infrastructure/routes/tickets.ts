import { Hono } from 'hono'
import { CreateTicketHandler } from '@infrastructure/handlers/tickets/CreateTicketHandler';
import { TicketService } from '@application/Services/TicketService';
import { Ticket } from '@domain/entities/Ticket';
import { Match } from '@domain/entities/Match';
import { Customer } from '@domain/entities/Customer';
import { AppDataSource } from '@infrastructure/database/AppDataSource';

const ticketsRoutes = new Hono();

const ticketService = new TicketService(
    AppDataSource.getRepository(Ticket),
    AppDataSource.getRepository(Match),
    AppDataSource.getRepository(Customer)
);

ticketsRoutes.post("/", (c) => new CreateTicketHandler(ticketService).handle(c));

export default ticketsRoutes;