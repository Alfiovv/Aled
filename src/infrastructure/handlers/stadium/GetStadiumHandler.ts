import { STADIUMS } from "@infrastructure/mock/stadiums";
import { Context } from "hono";

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
            return c.json({
                success: false,
                error: "City :" + sort + " n'as pas de stade liée."
            }, 404)
        } else {
            return c.json({
                success: true,
                message: "Stadiums filtered by city[name]:" + sort,
                data: stadium
            })
        }

    }
}