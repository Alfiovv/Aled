import { MatchService } from "@application/Services/MatchService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetMatchByIdHandler {
    private readonly matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;
    }

    async handle(c: Context) {
        const id = Number(c.req.param("id"));
        try {
            const match = await this.matchService.findById(id);
            return c.json({
                success: true,
                id: id,
                message: "Match " + id,
                data: match
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}