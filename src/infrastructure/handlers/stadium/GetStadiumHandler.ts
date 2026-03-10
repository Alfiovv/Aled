import { STADIUMS } from "@infrastructure/mock/stadiums";
import { Context } from "hono";

export class GetStadiumHandler {
    async handle(c: Context) {
        return c.json({
            success: true,
            message: "All stadiums",
            data: STADIUMS
        })
    }
}