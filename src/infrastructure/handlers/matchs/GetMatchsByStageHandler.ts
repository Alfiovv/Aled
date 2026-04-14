import { MatchService } from "@application/Services/MatchService";
import { MatchStage } from "@domain/enum/enum";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStageHandler {
    private readonly matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;
    }

    async handle(c: Context) {
        const stageParam = c.req.param("stage");
        if (!(stageParam in MatchStage)) {
            throw new HTTPException(400, { message: 'Stage invalide' });
        }
        const stage = MatchStage[stageParam as keyof typeof MatchStage];
        const matchs = await this.matchService.findByStage(stage);
        return c.json({
            success: true,
            message: "Matchs at stage " + stageParam,
            data: matchs
        }, 200);
    }
}