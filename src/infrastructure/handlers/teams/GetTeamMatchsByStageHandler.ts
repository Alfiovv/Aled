import { TeamService } from "@application/Services/TeamService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchStage } from "@domain/enum/enum";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByStageHandler {
    private readonly teamService: TeamService;

    constructor(teamService: TeamService) {
        this.teamService = teamService;
    }

    async handle(c: Context) {
        const fifaCodeString = String(c.req.param("fifaCode"));
        const stageParam = c.req.param("stage");
        const stage = MatchStage[stageParam as keyof typeof MatchStage];
        if (stage == undefined) {
            throw new HTTPException(400, {
                message: "Stage " + stageParam + " invalide. Valeurs autorisées: " + Object.keys(MatchStage).join(", ")
            });
        }
        let fifaCode: FifaCode;
        try {
            fifaCode = new FifaCode(fifaCodeString);
        } catch (e) {
            throw new HTTPException(400, {
                message: "FifaCode " + fifaCodeString + " ne respecte pas les conditions"
            });
        }
        try {
            await this.teamService.findByFifaCode(fifaCodeString);
            const matchs = await this.teamService.findMatchsByFifaCodeAndStage(fifaCode.value, stage);
            return c.json({
                success: true,
                message: "Matchs for team " + fifaCode.value + " at stage " + stageParam,
                data: matchs
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}