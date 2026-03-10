import { FifaCode } from "@domain/value-objects/FifaCode";
import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";

export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const fifaCodeString = String(c.req.param("fifaCode"));
        let fifaCode: FifaCode;
        try {
            fifaCode = new FifaCode(c.req.param("fifaCode"));
        } catch (e) {
            return c.json({
                success: false,
                error: "FifaCode " + fifaCodeString + " ne respecte pas les conditions",
            }, 400);
        }
        const team = TEAMS.find(t => t.code.value == fifaCode.value)
        if (!team) {
            return c.json({
                success: false,
                error: "Teams " + fifaCode.value + " does not exist",
            }, 404);
        }

        return c.json({
            success: true,
            message: "Team " + fifaCode.value,
            data: team
        });
    }
}