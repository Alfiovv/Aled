import { TicketService } from "@application/Services/TicketService";
import { CreateTicketSchema } from "@infrastructure/handlers/tickets/CreateTicketSchema";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class CreateTicketHandler {
    private readonly ticketService: TicketService;

    constructor(ticketService: TicketService) {
        this.ticketService = ticketService;
    }

    async handle(c: Context) {
        const body = await c.req.json();
        const result = CreateTicketSchema.safeParse(body);

        if (!result.success) {
            throw new HTTPException(400, { message: "Validation failed" });
        }

        const { matchId, seat, customer } = result.data;

        try {
            const newTicket = await this.ticketService.createTicket(
                matchId,
                seat,
                customer.email
            );

            return c.json({
                success: true,
                message: "Ticket created",
                data: newTicket
            }, 201);

        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }

            if (error instanceof Error && error.message === "Siège déjà réserver") {
                throw new HTTPException(409, { message: error.message });
            }

            throw error;
        }
    }
}