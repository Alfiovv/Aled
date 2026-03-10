import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";

export class GetMatchByIdHandler {
    async handle(c: Context) {
        const id = Number(c.req.param("id"));
        const match = MATCHS.find(m => m.id === id);

        if (!match) {
            return c.json({
                success: false,
                error: "Match " + id + " does not exist",
            }, 404);

        }

        return c.json({
            success: true,
            id: id,
            message: "Match " + id,
            data: match
        });
    }
}