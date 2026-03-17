import { TEAMS } from "@infrastructure/mock/teams";
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

        const teamsCopy = [...TEAMS];

        teamsCopy.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            return sort === "name"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });

        return c.json({
            success: true,
            message: "All teams",
            data: teamsCopy
        });
    }
}