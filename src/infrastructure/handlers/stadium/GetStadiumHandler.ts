import { STADIUMS } from "@infrastructure/mock/stadiums";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumHandler {
    async handle(c: Context) {
        const sort = c.req.query("city[name]");
        if (sort == undefined) {
            return c.json({
                success: true,
                message: "All stadiums",
                data: STADIUMS
            })
        }
        const stadium = STADIUMS.filter(t => t.city.name == sort)

        if (!stadium) {
            throw new HTTPException(404, {
                message: "City :" + sort + " n'as pas de stade liée."
            });

        } else {
            return c.json({
                success: true,
                message: "Stadiums filtered by city[name]:" + sort,
                data: stadium
            })
        }

    }
}