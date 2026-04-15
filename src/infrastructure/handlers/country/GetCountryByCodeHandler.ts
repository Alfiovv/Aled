import { CountryService } from "@application/Services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCountryByCodeHandler {
    private readonly countryService: CountryService;

    constructor(countryService: CountryService) {
        this.countryService = countryService;
    }

    async handle(c: Context) {
        const code = String(c.req.param("code"));
        try {
            const country = await this.countryService.findByCode(code);
            return c.json({
                success: true,
                message: "Country " + country.name,
                data: country
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}