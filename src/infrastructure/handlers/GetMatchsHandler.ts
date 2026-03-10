import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";

export class GetMatchsHandler {
    async handle(c: Context) {
        return c.json({
            success: true,
            message: "All matchs",
            data: MATCHS
        })
    }
}