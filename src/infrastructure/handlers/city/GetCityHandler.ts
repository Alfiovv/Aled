import { CityService } from "@application/Services/CityService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityHandler {
    private readonly cityService: CityService;

    constructor(cityService: CityService) {
        this.cityService = cityService;
    }

    async handle(c: Context) {
        const sort = c.req.query("name");
        try {
            if (sort !== undefined) {
                const city = await this.cityService.findByNameTable(sort);
                return c.json({
                    success: true,
                    message: "Cities filtered by name: " + sort,
                    data: city
                });
            }
            const cities = await this.cityService.findAll();
            return c.json({
                success: true,
                message: "All cities",
                data: cities
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}