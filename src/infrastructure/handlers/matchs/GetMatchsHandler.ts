import { FifaCode } from "@domain/value-objects/FifaCode";
import { MATCHS } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsHandler {
    async handle(c: Context) {

        const sort = c.req.query("team[code]");
        const date = c.req.query("date");

        let fifaCode: FifaCode | null = null;

        if (sort) {
            try {
                fifaCode = new FifaCode(sort);
            } catch (e) {
                throw new HTTPException(400, {
                    message: "FifaCode " + sort + " ne respecte pas les conditions"
                });
            }
        }

        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new HTTPException(400, {
                message: "Le format de la date doit être YYYY-MM-DD"
            });
        }

        let matchs = MATCHS;

        if (fifaCode) {
            matchs = matchs.filter(
                t =>
                    t.awayTeam.code.value === fifaCode!.value ||
                    t.homeTeam.code.value === fifaCode!.value
            );
        }

        if (date) {
            matchs = matchs.filter(
                match => match.date.toISOString().split("T")[0] === date
            );
        }

        let message = "Matchs filtered";

        if (fifaCode && date) {
            message = "Matchs filtered by team[code]: " + fifaCode.value + " and date: " + date;
        } else if (fifaCode) {
            message = "Matchs filtered by team[code]: " + fifaCode.value;
        } else if (date) {
            message = "Matchs filtered by date: " + date;
        }

        return c.json({
            success: true,
            message: message,
            data: matchs
        });
    }
}