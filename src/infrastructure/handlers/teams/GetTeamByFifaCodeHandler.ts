import { Team } from "@domain/entities/Team";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamByFifaCodeHandler {
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
        const teamRepository = AppDataSource.getRepository(Team);
        const team = await teamRepository.findOneBy({
            code: fifaCodeString
        })

        if (!team) {
            throw new HTTPException
                (404, {
                    message: "Teams " + fifaCode.value + " does not exist"
                })
        }

        return c.json({
            success: true,
            message: "Team " + fifaCode.value,
            data: team
        });
    }
}