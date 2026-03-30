import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/enum/enum";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchByStage {
    async handle(c: Context) {
        const stageParam = c.req.param("stage");
        if (!(stageParam in MatchStage)) {
            throw new HTTPException
                (400, {
                    message
                        : 'Stage invalide'
                })
        }

        const stage = MatchStage[stageParam as keyof typeof MatchStage];
        const matchRepository = AppDataSource.getRepository(Match);
        const matchs = await matchRepository.find({
            where: {
                stage: stage
            }
        });
        return c.json({
            success: true,
            data: matchs
        }, 200);
    }
}