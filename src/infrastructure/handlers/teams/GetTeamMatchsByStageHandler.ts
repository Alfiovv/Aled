import { Match } from "@domain/entities/Match";
import { Team } from "@domain/entities/Team";
import { MatchStage } from "@domain/enum/enum";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
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

        const teamRepository = AppDataSource.getRepository(Team);
        const team = await teamRepository.findOneBy({ code: fifaCode.value });
        if (!team) {
            throw new HTTPException(404, {
                message: "Teams " + fifaCode.value + " does not exist"
            });
        }
        const matchRepository = AppDataSource.getRepository(Match);
        const matchs = await matchRepository.find({
            where: [
                { homeTeam: { code: fifaCode.value }, stage: stage },
                { awayTeam: { code: fifaCode.value }, stage: stage }
            ],
            relations: ["homeTeam", "awayTeam"]
        });

        return c.json({
            success: true,
            message: "Matchs for team " + fifaCode.value + " at stage " + stageParam,
            data: matchs
        });

    }
}