import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";

export class GetTeamsHandler {
    async handle(c: Context) {
        return c.json({
            success: true,
            message: "All teams",
            data: TEAMS
        })
    }
}