import { Country } from "@domain/entities/Country";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { HOST_COUNTRIES } from "@infrastructure/mock/countries";
import { Context } from "hono";

export class GetCountryHandler {
    async handle(c: Context) {
        const countriesRepository = AppDataSource.getRepository(Country);
        const country = await countriesRepository.find();
        return c.json({
            success: true,
            message: "All countries",
            data: country
        })
    }
}