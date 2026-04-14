import { MatchService } from "@application/Services/MatchService";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchByIdHandler {
    private readonly matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;
    }

    async handle(c: Context) {
        const id = Number(c.req.param("id"));
        const match = await this.matchService.findById(id);
        if (!match) {
            throw new HTTPException(404, {
                message: 'Match " + id + " does not exist'
            });
        }
        return c.json({
            success: true,
            id: id,
            message: "Match " + id,
            data: match
        });
    }
}