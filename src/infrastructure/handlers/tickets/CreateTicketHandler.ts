import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { CreateTicketSchema } from '@infrastructure/handlers/tickets/CreateTicketSchema';
import { MATCHS } from "@infrastructure/mock/matchs";
import { TICKETS } from "@infrastructure/mock/tickets";
import { Ticket } from "@domain/entities/Ticket";

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
        const match = MATCHS.find(m => m.id === matchId);
        if (!match) {
            throw new HTTPException(404, {
                message: "Le match n'existe pas."
            });
        }
        const ticket = TICKETS.find(m => m.seat === seat)
        if (ticket) {
            throw new HTTPException(409, {
                message: "Siège déjà réserver"
            });
        }

        const newTicket = new Ticket(TICKETS.length + 1, match, seat, customer)

        TICKETS.push(newTicket);

        return c.json({
            success: true,
            message: "Ticket created",
            data: newTicket
        }, 201);
    }
}