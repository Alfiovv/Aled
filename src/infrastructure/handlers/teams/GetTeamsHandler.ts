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
        const name = c.req.query("name");
        const allowedSortValues = ["name", "-name"];
        if (!allowedSortValues.includes(sort)) {
            throw new HTTPException(400, { message: "Invalid sort value" });
        }
        let teams;
        if (name != undefined) {
            teams = await this.teamService.findFiltredByName(name, sort === "name" ? "ASC" : "DESC");
        } else {
            teams = await this.teamService.findAll(sort === "name" ? "ASC" : "DESC");
        }


        let message = "All teams";
        if (name != undefined) {
            message = "Teams filtered by name: " + name;
        } else {
            message = "All teams";
        }

        return c.json({
            success: true,
            message: message,
            data: teams
        });
    }
}