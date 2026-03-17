import { FifaCode } from "@domain/value-objects/FifaCode";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsHandler {
    async handle(c: Context) {
        const sort = c.req.query("team[code]");
        let fifaCode: FifaCode;
        try {
            fifaCode = new FifaCode(sort || "null");
        } catch (e) {
            throw new HTTPException
                (400, {
                    message: "FifaCode " + sort + " ne respecte pas les conditions"
                })

        }
        if (sort == undefined) {
            return c.json({
                success: true,
                message: "All stadiums",
                data: MATCHS
            })
        }
        const matchs = MATCHS.filter(t => t.awayTeam.code.value == fifaCode.value || t.homeTeam.code.value == fifaCode.value)

        if (!matchs) {
            throw new HTTPException
                (404, {
                    message: "L'équipe :" + sort + " n'as pas de match liée."
                })
        } else {
            return c.json({
                success: true,
                message: "Matchs filtered by team[code]: " + fifaCode.value,
                data: matchs
            })
        }

    }
}