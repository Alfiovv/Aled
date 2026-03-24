import { MatchStage, MatchStatus } from "@domain/enum/enum";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStageHandler {
    async handle(c: Context) {
        const stageParam = c.req.param("stage");
        console.log(stageParam)
        if (!(stageParam in MatchStage)) {
            throw new HTTPException
                (400, {
                    message: 'Stage invalide'
                })
        }

        const stage = MatchStage[stageParam as keyof typeof MatchStage];

        const matches = MATCHS.filter(m => m.stage === stage);

        return c.json({
            success: true,
            message: "Matchs at stage " + stageParam,
            data: matches
        }, 200);
    }
}