import { CountryService } from "@application/Services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCountryCitiesHandler {
    private readonly countryService: CountryService;

    constructor(countryService: CountryService) {
        this.countryService = countryService;
    }

    async handle(c: Context) {
        const code = String(c.req.param("code"));
        try {
            const country = await this.countryService.findByCode(code);
            const cities = await this.countryService.findCitiesByCode(code);
            return c.json({
                success: true,
                message: "Cities in " + country.name,
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