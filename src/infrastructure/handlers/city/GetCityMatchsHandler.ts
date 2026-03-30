import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCityMatchsHandler {
    async handle(c: Context) {
        const name = c.req.param("name");
        const citiesRepository = AppDataSource.getRepository(City);
        const matchRepository = AppDataSource.getRepository(Match);

        // Vérifie que la ville existe
        const city = await citiesRepository.findOneBy({
            name: name
        });

        if (!city) {
            throw new HTTPException(404, {
                message: 'City "' + name + '" does not exist'
            });
        }

        // Récupère les matchs liés à cette ville via le stade
        const matchs = await matchRepository.find({
            where: {
                stadium: {
                    city: { name: name }
                }
            }
        });

        return c.json({
            success: true,
            message: "Matchs in " + name,
            data: matchs
        });
    }
}