import { Stadium } from "@domain/entities/Stadium";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumHandler {
    async handle(c: Context) {
        const sort = c.req.query("city[name]");
        const stadiumRepository = AppDataSource.getRepository(Stadium);

        let stadiums = await stadiumRepository.find({
            relations: ["city"]
        });

        if (!sort) {
            return c.json({
                success: true,
                message: "All stadiums",
                data: stadiums
            });
        }

        stadiums = stadiums.filter(t => t.city.name === sort);

        if (stadiums.length === 0) {
            throw new HTTPException(404, {
                message: "City: " + sort + " n'a pas de stade lié."
            });
        }

        return c.json({
            success: true,
            message: "Stadiums filtered by city[name]: " + sort,
            data: stadiums
        });
    }
}