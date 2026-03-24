import { Country } from "@domain/entities/Country";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { CITIES } from "@infrastructure/mock/cities";
import { HOST_COUNTRIES } from "@infrastructure/mock/countries";
import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCountryCitiesHandler {
    async handle(c: Context) {
        const code = String(c.req.param("code"))
        const country = HOST_COUNTRIES.find(t => t.code == code)
        const cities = CITIES.filter(t => t.country.code == code)
        if (!country) {
            throw new HTTPException(404, {
                message: 'Country "' + code + '" does not exist'
            });
        } else {
            return c.json({
                success: true,
                message: "Cities in " + country.name,
                data: cities
            })
        }
    }
}