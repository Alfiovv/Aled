import { TEAMS } from "@infrastructure/mock/teams";
import { Context } from "hono";

export class GetTeamsHandler {
    async handle(c: Context) {
        const sort = c.req.query("sort") || "name";

        if (sort !== "name" && sort !== "-name") {
            return c.json(
                { success: false, message: "Invalid sort value" },
                400
            );
        }
        const teamsCopy = [...TEAMS];

        teamsCopy.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            return sort === "name"
                ? nameA.localeCompare(nameB) // A → Z
                : nameB.localeCompare(nameA); // Z → A
        });

        return c.json({
            success: true,
            message: "All teams",
            data: teamsCopy
        });
    }
}