import { CityService } from "@application/Services/CityService";
import { City } from "@domain/entities/City";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityHandler {
    private readonly cityService: CityService;

    constructor(cityService: CityService) {
        this.cityService = cityService;
    }
    async handle(c: Context) {
        const sort = c.req.query("name");

        if (sort !== undefined) {
            const cities = await this.cityService.findByName(sort);
            if (!cities) {
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

        const cities = await this.cityService.findAll();
        return c.json({
            success: true,
            message: "All cities",
            data: cities
        });
    }
}