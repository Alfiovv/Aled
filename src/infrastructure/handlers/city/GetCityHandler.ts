import { CITIES } from "@infrastructure/mock/cities";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

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
            throw new HTTPException(404, {
                message: 'Cities "' + name + '" does not exist'
            });
        } else {
            return c.json({
                success: true,
                message: "Cities filtered by name:" + sort,
                data: cities
            })
        }

    }
}