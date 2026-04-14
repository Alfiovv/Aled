import { StadiumService } from "@application/Services/StadiumService";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumHandler {
    private readonly stadiumService: StadiumService;

    constructor(stadiumService: StadiumService) {
        this.stadiumService = stadiumService;
    }

    async handle(c: Context) {
        const sort = c.req.query("city[name]");
        const stadiums = await this.stadiumService.findAll(sort);
        if (sort && stadiums.length === 0) {
            throw new HTTPException(404, {
                message: "City: " + sort + " n'a pas de stade lié."
            });
        }
        return c.json({
            success: true,
            message: sort ? "Stadiums filtered by city[name]: " + sort : "All stadiums",
            data: stadiums
        });
    }
}