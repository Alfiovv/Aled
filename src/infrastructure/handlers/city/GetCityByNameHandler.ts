import { CityService } from "@application/Services/CityService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityByNameHandler {
    private readonly cityService: CityService;

    constructor(cityService: CityService) {
        this.cityService = cityService;
    }

    async handle(c: Context) {
        const name = c.req.param("name");
        try {
            const city = await this.cityService.findByName(name);
            return c.json({
                success: true,
                message: "City " + name,
                data: city
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}