import { Stadium } from "@domain/entities/Stadium";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { STADIUMS } from "@infrastructure/mock/stadiums";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumByNameHandler {
    async handle(c: Context) {
        const name = String(c.req.param("name"));
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const stadium = await stadiumRepository.findOneBy({
            name: name
        })
        if (!stadium) {
            throw new HTTPException(404, {
                message: 'Stadiums "' + name + '" does not exist'
            });

        } else {
            return c.json({
                success: true,
                message: "Stadiums " + name,
                data: stadium
            })
        }

    }
}