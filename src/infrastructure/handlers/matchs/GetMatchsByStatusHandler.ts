import { MatchService } from "@application/Services/MatchService";
import { MatchStatus } from "@domain/enum/enum";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStatusHandler {
    private readonly matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;
    }

    async handle(c: Context) {
        const status = c.req.param("status");
        if (!(status in MatchStatus)) {
            throw new HTTPException(400, { message: 'Status invalide' });
        }
        const statu = MatchStatus[status as keyof typeof MatchStatus];
        const matchs = await this.matchService.findByStatus(statu);
        return c.json({
            success: true,
            message: "Matchs with status " + status,
            data: matchs
        }, 200);
    }
}