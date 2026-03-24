import { MATCHS } from "@infrastructure/mock/matchs";
import { STADIUMS } from "@infrastructure/mock/stadiums";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumMatchsHandler {
    async handle(c: Context) {
        const name = String(c.req.param("name"));
        const stadium = STADIUMS.filter(t => t.name == name)
        const match = MATCHS.filter(t => t.stadium.name == name)

        if (!(stadium.length > 0)) {
            throw new HTTPException(404, {
                message: 'Stadiums "' + name + '" does not exist'
            });

        } else {
            return c.json({
                success: true,
                message: "Matchs at " + name,
                data: match
            })
        }

    }
}