import { CityService } from "@application/Services/CityService";
import { MatchService } from "@application/Services/MatchService";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
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
        const city = await this.cityService.findByName(name);

        if (!city) {
            throw new HTTPException(404, {
                message: 'City "' + name + '" does not exist'
            });
        }

        const matchs = await this.matchService.matchByCityStadium(name);

        return c.json({
            success: true,
            message: "Matchs in " + name,
            data: matchs
        });
    }
}