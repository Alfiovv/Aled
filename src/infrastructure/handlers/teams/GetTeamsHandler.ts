import { Team } from "@domain/entities/Team";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetTeamsHandler {
    async handle(c: Context) {
        const sort = c.req.query("sort") || "name";

        if (sort !== "name" && sort !== "-name") {
            throw new HTTPException(400, {
                message: "Invalid sort value"
            });
        }

        const teamRepository = AppDataSource.getRepository(Team);

        const teams = await teamRepository.find({
            order: {
                name: sort === "name" ? "ASC" : "DESC"
            }
        });

        return c.json({
            success: true,
            message: "All teams",
            data: teams
        });
    }
}