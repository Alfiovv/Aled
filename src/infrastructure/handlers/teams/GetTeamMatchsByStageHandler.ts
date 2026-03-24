import { MatchStage } from "@domain/enum/enum";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { MATCHS } from "@infrastructure/mock/matchs";
import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByStageHandler {
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

        const team = TEAMS.find(t => t.code.value === fifaCode.value);
        if (!team) {
            throw new HTTPException(404, {
                message: "Teams " + fifaCode.value + " does not exist"
            });
        }

        const matches = MATCHS.filter(m => ((m.homeTeam.code.value === fifaCode.value || m.awayTeam.code.value === fifaCode.value) && m.stage === stage));

        return c.json({
            success: true,
            message: "Matchs for team " + fifaCode.value + " at stage " + stageParam,
            data: matches
        });

    }
}