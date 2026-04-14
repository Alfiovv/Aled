import { TicketService } from "@application/Services/TicketService";
import { CreateTicketSchema } from "@infrastructure/handlers/tickets/CreateTicketSchema";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

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

        const match = await this.ticketService.findMatchById(matchId);
        if (!match) {
            throw new HTTPException(404, { message: "Le match n'existe pas." });
        }

        const customers = await this.ticketService.findCustomerByEmail(customer.email);
        if (!customers) {
            throw new HTTPException(404, { message: "L'utilisateur n'existe pas." });
        }

        const ticket = await this.ticketService.findTicketBySeat(seat);
        if (ticket) {
            throw new HTTPException(409, { message: "Siège déjà réserver" });
        }

        const newTicket = await this.ticketService.createTicket(match, seat, customers);
        return c.json({
            success: true,
            message: "Ticket created",
            data: newTicket
        }, 201);
    }
}