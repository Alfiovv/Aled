import { Context } from "hono";

export class GetHomeHandler {
    async handle(c: Context) {
        return c.json({
            name: process.env.API_NAME,
            message: process.env.API_NAME,
            success: true

        })
    }
}