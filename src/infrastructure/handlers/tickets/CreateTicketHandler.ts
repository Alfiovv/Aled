import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { CreateTicketSchema } from '@infrastructure/handlers/tickets/CreateTicketSchema';

export class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.parseBody()
        const result = CreateTicketSchema.safeParse(body);

        if (!result.success) {
            throw new HTTPException(400, {
                message: "Validation failed"
            });
        }

    }
}