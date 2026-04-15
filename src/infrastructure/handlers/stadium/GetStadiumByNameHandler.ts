import { StadiumService } from "@application/Services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumByNameHandler {
    private readonly stadiumService: StadiumService;

    constructor(stadiumService: StadiumService) {
        this.stadiumService = stadiumService;
    }

    async handle(c: Context) {
        const name = String(c.req.param("name"));
        try {
            const stadium = await this.stadiumService.findByName(name);
            return c.json({
                success: true,
                message: "Stadiums " + name,
                data: stadium
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}