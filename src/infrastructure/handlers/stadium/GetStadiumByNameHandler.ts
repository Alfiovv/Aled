import { StadiumService } from "@application/Services/StadiumService";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetStadiumByNameHandler {
    private readonly stadiumService: StadiumService;

    constructor(stadiumService: StadiumService) {
        this.stadiumService = stadiumService;
    }

    async handle(c: Context) {
        const name = String(c.req.param("name"));
        const stadium = await this.stadiumService.findByName(name);
        if (!stadium) {
            throw new HTTPException(404, {
                message: 'Stadiums "' + name + '" does not exist'
            });
        }
        return c.json({
            success: true,
            message: "Stadiums " + name,
            data: stadium
        });
    }
}