import { Country } from "@domain/entities/Country";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { HOST_COUNTRIES } from "@infrastructure/mock/countries";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCountryByCodeHandler {
    async handle(c: Context) {
        const code = String(c.req.param("code"))
        const countriesRepository = AppDataSource.getRepository(Country);
        const country = await countriesRepository.findOneBy({ code: code });
        if (!country) {
            throw new HTTPException(404, {
                message: 'Country "' + code + '" does not exist'
            });
        } else {
            return c.json({
                success: true,
                message: "Country " + country?.name,
                data: country
            })
        }
    }
}