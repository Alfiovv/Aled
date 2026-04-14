import { CityService } from "@application/Services/CityService";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityByNameHandler {
    private readonly cityService: CityService;

    constructor(cityService: CityService) {
        this.cityService = cityService;
    }

    async handle(c: Context) {
        const name = c.req.param("name");
        const cities = await this.cityService.findByName(name);
        if (cities.length === 0) {
            throw new HTTPException(404, {
                message: "City " + name + " does not exist"
            });
        }
        return c.json({
            success: true,
            message: "City " + name,
            data: cities
        });
    }
}