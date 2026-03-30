import { Match } from "@domain/entities/Match";
import { MatchStage, MatchStatus } from "@domain/enum/enum";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStatusHandler {
    async handle(c: Context) {
        const status = c.req.param("status");
        if (!(status in MatchStatus)) {
            throw new HTTPException
                (400, {
                    message: 'Status invalide'
                })
        }

        const statu = MatchStatus[status as keyof typeof MatchStatus];

        const matchRepository = AppDataSource.getRepository(Match);
        const matchs = await matchRepository.find({
            where: {
                status: statu
            }
        });
        return c.json({
            success: true,
            message: "Matchs with status " + status,
            data: matchs
        }, 200);
    }
}