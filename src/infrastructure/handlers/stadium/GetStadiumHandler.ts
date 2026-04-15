import { Context } from "hono";
import { StadiumService } from "@application/Services/StadiumService";
import { HTTPException } from "hono/http-exception";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetStadiumHandler {
    private readonly stadiumService: StadiumService;

    constructor(stadiumService: StadiumService) {
        this.stadiumService = stadiumService;
    }

    async handle(c: Context) {
        const cityName = c.req.query("city[name]");
        const countryName = c.req.query("country[name]");
        const countryCode = c.req.query("country[code]");

        try {
            let stadiums;

            let message = "All stadiums";

            if (cityName) {
                stadiums = await this.stadiumService.findAllByCityName(cityName);
                message = "Stadiums filtered by city[name]: " + cityName;
            } else if (countryName) {
                stadiums = await this.stadiumService.findAllByCountryName(countryName);
                message = "Stadiums filtered by country[name]: " + countryName;
            } else if (countryCode) {
                stadiums = await this.stadiumService.findAllByCountryCode(countryCode);
                message = "Stadiums filtered by country[code]: " + countryCode;
            } else {
                stadiums = await this.stadiumService.findAll();
            }

            return c.json({
                success: true,
                message,
                data: stadiums
            });

        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}