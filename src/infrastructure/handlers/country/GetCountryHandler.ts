import { CountryService } from "@application/Services/CountryService";
import { Context } from "hono";

export class GetCountryHandler {
    private readonly countryService: CountryService;

    constructor(countryService: CountryService) {
        this.countryService = countryService;
    }

    async handle(c: Context) {
        const countries = await this.countryService.findAll();
        return c.json({
            success: true,
            message: "All countries",
            data: countries
        });
    }
}