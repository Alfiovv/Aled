import { HOST_COUNTRIES } from "@infrastructure/mock/countries";
import { Context } from "hono";

export class GetCountryHandler {
    async handle(c: Context) {
        return c.json({
            success: true,
            message: "All countries",
            data: HOST_COUNTRIES
        })
    }
}