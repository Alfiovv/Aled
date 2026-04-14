import { Repository, FindOptionsWhere } from "typeorm";
import { Match } from "@domain/entities/Match";
import { MatchStage, MatchStatus } from "@domain/enum/enum";
import { FifaCode } from "@domain/value-objects/FifaCode";

export class MatchService {
    private readonly matchsRepository: Repository<Match>;

    constructor(matchsRepository: Repository<Match>) {
        this.matchsRepository = matchsRepository;
    }

    async findById(id: number): Promise<Match | null> {
        return this.matchsRepository.findOneBy({ id: id });
    }

    async findByStage(stage: MatchStage): Promise<Match[]> {
        return this.matchsRepository.find({ where: { stage: stage } });
    }

    async findByStatus(status: MatchStatus): Promise<Match[]> {
        return this.matchsRepository.find({ where: { status: status } });
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
        const where: FindOptionsWhere<Match> = {
            stadium: { city: { name: city } }
        };
        return this.matchsRepository.find({ where });
    }
}