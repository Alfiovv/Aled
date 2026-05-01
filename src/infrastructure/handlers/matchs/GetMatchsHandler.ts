import { MatchService } from "@application/Services/MatchService";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsHandler {
    private readonly matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;
    }

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
                message: "Invalid date format"
            });
        }

        const matchs = await this.matchService.findAll(fifaCode ?? undefined, date);

        let message = "All matchs";
        if (fifaCode && date) {
            message = "Matchs filtered by team[code]: " + fifaCode.value + " and date: " + date;
        } else if (fifaCode) {
            message = "Matchs filtered by team[code]: " + fifaCode.value;
        } else if (date) {
            message = "Matchs filtered by date: " + date;
        }

        return c.json({ success: true, message: message, data: matchs });
    }
}