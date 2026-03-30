import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { MATCHS } from "@infrastructure/mock/matchs";
import { STADIUMS } from "@infrastructure/mock/stadiums";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumMatchsHandler {
    async handle(c: Context) {
        const name = String(c.req.param("name"));
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const matchRepository = AppDataSource.getRepository(Match);
        const stadium = await stadiumRepository.findOneBy({ name: name })
        const matchs = await matchRepository.find({
            where: {
                stadium: {
                    name: name
                }
            }
        })
        if (!stadium) {
            throw new HTTPException(404, {
                message: 'Stadiums "' + name + '" does not exist'
            });

        } else {
            return c.json({
                success: true,
                message: "Matchs at " + name,
                data: matchs
            })
        }

    }
}