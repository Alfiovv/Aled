import { CITIES } from "@infrastructure/mock/cities";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";

export class GetCityMatchsHandler {
    async handle(c: Context) {
        const name = c.req.param("name");
        const cities = CITIES.filter(t => t.name == name)
        const match = MATCHS.filter(t => t.stadium.city.name == name)

        if (!(cities.length > 0)) {
            return c.json({
                success: false,
                error: 'City "' + name + '" does not exist'
            }, 404)
        } else {
            return c.json({
                success: true,
                message: "Matchs in " + name,
                data: match
            })
        }

    }
}