import { City } from "@domain/entities/City";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityHandler {
    async handle(c: Context) {
        const sort = c.req.query("name");
        const citiesRepository = AppDataSource.getRepository(City);

        if (sort !== undefined) {
            const cities = await citiesRepository.find({
                where: { name: sort }
            });

            if (cities.length === 0) {
                throw new HTTPException(404, {
                    message: `City "${sort}" does not exist`
                });
            }

            return c.json({
                success: true,
                message: "Cities filtered by name: " + sort,
                data: cities
            });
        }

        const cities = await citiesRepository.find({
            order: { name: "ASC" }
        });

        return c.json({
            success: true,
            message: "All cities",
            data: cities
        });
    }
}