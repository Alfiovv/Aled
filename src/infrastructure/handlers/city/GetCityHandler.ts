import { CITIES } from "@infrastructure/mock/cities";
import { Context } from "hono";

export class GetCityHandler {
    async handle(c: Context) {
        return c.json({
            success: true,
            message: "All cities",
            data: CITIES
        })
    }
}