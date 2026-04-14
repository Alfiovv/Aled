import { TeamService } from "@application/Services/TeamService";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamByFifaCodeHandler {
    private readonly teamService: TeamService;

    constructor(teamService: TeamService) {
        this.teamService = teamService;
    }

    async handle(c: Context) {
        const fifaCodeString = String(c.req.param("fifaCode"));
        let fifaCode: FifaCode;
        try {
            fifaCode = new FifaCode(fifaCodeString);
        } catch (e) {
            throw new HTTPException(400, {
                message: "FifaCode " + fifaCodeString + " ne respecte pas les conditions"
            });
        }
        const team = await this.teamService.findByFifaCode(fifaCodeString);
        if (!team) {
            throw new HTTPException(404, {
                message: "Teams " + fifaCode.value + " does not exist"
            });
        }
        return c.json({
            success: true,
            message: "Team " + fifaCode.value,
            data: team
        });
    }
}