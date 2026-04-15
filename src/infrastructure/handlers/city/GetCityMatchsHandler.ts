import { CityService } from "@application/Services/CityService";
import { MatchService } from "@application/Services/MatchService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityMatchsHandler {
    private readonly cityService: CityService;
    private readonly matchService: MatchService;

    constructor(cityService: CityService, matchService: MatchService) {
        this.cityService = cityService;
        this.matchService = matchService;
    }

    async handle(c: Context) {
        const name = c.req.param("name");
        try {
            const city = await this.cityService.findByName(name);
            const matchs = await this.matchService.matchByCityStadium(name);
            return c.json({
                success: true,
                message: "Matchs in " + name,
                data: matchs
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}