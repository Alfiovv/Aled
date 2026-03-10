import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";

export class GetHealthHandler {
    async handle(c: Context) {
        return c.json({
            name: process.env.API_NAME,
            message: process.env.API_NAME,
            success: true,
            uptime: process.uptime(),
            environment: process.env.NODE_ENV
        })
    }
}