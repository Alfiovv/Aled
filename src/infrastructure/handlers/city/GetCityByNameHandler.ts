import { CITIES } from "@infrastructure/mock/cities";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityByNameHandler {
    async handle(c: Context) {
        const name = c.req.param("name");
        const cities = CITIES.find(t => t.name == name)
        if (!cities) {
            throw new HTTPException(404, {
                message: 'City "' + name + '" does not exist'
            });
        } else {
            return c.json({
                success: true,
                message: "City " + name,
                data: cities
            })
        }
    }
}