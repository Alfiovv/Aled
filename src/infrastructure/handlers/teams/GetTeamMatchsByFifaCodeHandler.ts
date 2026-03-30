import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/enum/enum";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { MATCHS } from "@infrastructure/mock/matchs";
import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByFifaCodeHandler {
    async handle(c: Context) {
        const fifaCodeString = String(c.req.param("fifaCode"));
        let fifaCode: FifaCode;
        try {
            fifaCode = new FifaCode(c.req.param("fifaCode"));
        } catch (e) {
            throw new HTTPException
                (400, {
                    message: "FifaCode " + fifaCodeString + " ne respecte pas les conditions"
                })
        }
        const matchRepository = AppDataSource.getRepository(Match);
        const matchs = await matchRepository.find({
            where: [
                { awayTeam: { code: fifaCodeString } },
                { homeTeam: { code: fifaCodeString } }
            ],
        });
        if (matchs.length > 0) {
            throw new HTTPException
                (404, {
                    message: "Teams " + fifaCode.value + " does not exist"
                })
        }

        return c.json({
            success: true,
            message: "Matchs for team " + fifaCode.value,
            data: matchs
        });
    }
}