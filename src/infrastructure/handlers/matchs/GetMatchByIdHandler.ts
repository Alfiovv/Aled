import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchByIdHandler {
    async handle(c: Context) {
        const id = Number(c.req.param("id"));
        const match = MATCHS.find(m => m.id === id);

        if (!match) {
            throw new HTTPException
                (404, {
                    message: 'Match " + id + " does not exist'
                })

        }

        return c.json({
            success: true,
            id: id,
            message: "Match " + id,
            data: match
        });
    }
}