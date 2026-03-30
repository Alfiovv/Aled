import { City } from "@domain/entities/City";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { CITIES } from "@infrastructure/mock/cities";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityByNameHandler {
    async handle(c: Context) {
        const name = c.req.param("name");
        const citiesRepository = AppDataSource.getRepository(City);
        const cities = await citiesRepository.find({
            where: {
                name: name
            }
        })
        if (cities.length === 0) {
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