import { MatchStage } from "@domain/enum/enum";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";

export class GetMatchByStage {
    async handle(c: Context) {
        const stageParam = c.req.param("stage");

        if (!(stageParam in MatchStage)) {
            return c.json({
                success: false,
                error: "Stage invalide"
            }, 400);
        }

        const stage = MatchStage[stageParam as keyof typeof MatchStage];

        const matches = MATCHS.filter(m => m.stage === stage);

        return c.json({
            success: true,
            data: matches
        }, 200);
    }
}