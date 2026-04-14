import { CountryService } from "@application/Services/CountryService";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCountryByCodeHandler {
    private readonly countryService: CountryService;

    constructor(countryService: CountryService) {
        this.countryService = countryService;
    }

    async handle(c: Context) {
        const code = String(c.req.param("code"));
        const country = await this.countryService.findByCode(code);
        if (!country) {
            throw new HTTPException(404, {
                message: 'Country "' + code + '" does not exist'
            });
        }
        return c.json({
            success: true,
            message: "Country " + country.name,
            data: country
        });
    }
}