import { CITIES } from "@infrastructure/mock/cities";
import { Context } from "hono";

export class GetCityHandler {
    async handle(c: Context) {
        const sort = c.req.query("name");
        if (sort == undefined) {
            return c.json({
                success: true,
                message: "All stadiums",
                data: CITIES
            })
        }
        const cities = CITIES.filter(t => t.name == sort)

        if (!cities) {
            return c.json({
                success: false,
                error: "City :" + sort + " n'as pas de stade liée."
            }, 404)
        } else {
            return c.json({
                success: true,
                message: "Cities filtered by name:" + sort,
                data: cities
            })
        }

    }
}