import { StadiumService } from "@application/Services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumMatchsHandler {
    private readonly stadiumService: StadiumService;

    constructor(stadiumService: StadiumService) {
        this.stadiumService = stadiumService;
    }

    async handle(c: Context) {
        const name = String(c.req.param("name"));
        try {
            const stadium = await this.stadiumService.findByName(name);
            const matchs = await this.stadiumService.findMatchsByStadium(name);
            return c.json({
                success: true,
                message: "Matchs at " + name,
                data: matchs
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}