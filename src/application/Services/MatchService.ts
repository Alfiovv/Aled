import { Repository, FindOptionsWhere } from "typeorm";
import { Match } from "@domain/entities/Match";
import { MatchStage, MatchStatus } from "@domain/enum/enum";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { HTTPException } from "hono/http-exception";

export class MatchService {
    private readonly matchsRepository: Repository<Match>;

    constructor(matchsRepository: Repository<Match>) {
        this.matchsRepository = matchsRepository;
    }

    async findById(id: number): Promise<Match> {
        const match = await this.matchsRepository.findOneBy({ id: id });
        if (!match) {
            throw new NotFoundError('Match ' + id + ' does not exist');
        }
        return match;
    }

    async findByStage(stage: string): Promise<Match[]> {
        if (!(stage in MatchStage)) {
            throw new HTTPException(400, { message: 'Invalid stage: "' + stage + '"' });
        }
        const stageP = MatchStage[stage as keyof typeof MatchStage];
        const match = this.matchsRepository.find({ where: { stage: stageP } });
        return match
    }

    async findByStatus(status: string): Promise<Match[]> {
        if (!(status in MatchStatus)) {
            throw new HTTPException(400, { message: 'Invalid status: "' + status + '"' });
        }
        const statu = MatchStatus[status as keyof typeof MatchStatus];
        const match = this.matchsRepository.find({ where: { status: statu } });

        return match
    }

    async findAll(fifaCode?: FifaCode, date?: string): Promise<Match[]> {
        let matchs = await this.matchsRepository.find({
            relations: ["homeTeam", "awayTeam"]
        });
        if (fifaCode) {
            matchs = matchs.filter(
                t =>
                    t.awayTeam.code === fifaCode.value ||
                    t.homeTeam.code === fifaCode.value
            );
        }
        if (date) {
            matchs = matchs.filter(
                match => match.date.toISOString().split("T")[0] === date
            );
        }
        return matchs;
    }

    async matchByCityStadium(city: string): Promise<Match[]> {
        return this.matchsRepository.findBy({
            stadium: {
                city: {
                    name: city
                }
            }
        });
    }
}