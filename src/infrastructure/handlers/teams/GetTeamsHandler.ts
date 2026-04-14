import { TeamService } from "@application/Services/TeamService";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamsHandler {
    private readonly teamService: TeamService;

    constructor(teamService: TeamService) {
        this.teamService = teamService;
    }

    async handle(c: Context) {
        const sort = c.req.query("sort") || "name";
        if (sort !== "name" && sort !== "-name") {
            throw new HTTPException(400, { message: "Invalid sort value" });
        }
        const teams = await this.teamService.findAll(sort === "name" ? "ASC" : "DESC");
        return c.json({
            success: true,
            message: "All teams",
            data: teams
        });
    }
}