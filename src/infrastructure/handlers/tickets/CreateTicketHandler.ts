import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { CreateTicketSchema } from '@infrastructure/handlers/tickets/CreateTicketSchema';
import { MATCHS } from "@infrastructure/mock/matchs";
import { TICKETS } from "@infrastructure/mock/tickets";
import { Ticket } from "@domain/entities/Ticket";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";

export class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json();
        const result = CreateTicketSchema.safeParse(body);
        if (!result.success) {
            throw new HTTPException(400, {
                message: "Validation failed"
            });
        }
        const { matchId, seat, customer } = result.data;
        const matchRepository = AppDataSource.getRepository(Match);
        const match = await matchRepository.findOneBy({ id: matchId });
        if (!match) {
            throw new HTTPException(404, {
                message: "Le match n'existe pas."
            });
        }
        const ticketRepository = AppDataSource.getRepository(Ticket);
        const ticket = await ticketRepository.findOneBy({ seat: seat })
        if (ticket) {
            throw new HTTPException(409, {
                message: "Siège déjà réserver"
            });
        }

        const newTicket = ticketRepository.create({
            match: match,
            seat: seat,
            holder: customer
        });
        //a retirer à terme
        try {
            await ticketRepository.save(newTicket);

        } catch (error) {
            console.log(error)
        }

        return c.json({
            success: true,
            message: "Ticket created",
            data: newTicket
        }, 201);
    }
}