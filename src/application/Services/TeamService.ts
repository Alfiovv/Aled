import { Repository, FindOptionsWhere } from "typeorm";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/enum/enum";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class TeamService {
    private readonly teamsRepository: Repository<Team>;
    private readonly matchsRepository: Repository<Match>;

    constructor(
        teamsRepository: Repository<Team>,
        matchsRepository: Repository<Match>
    ) {
        this.teamsRepository = teamsRepository;
        this.matchsRepository = matchsRepository;
    }

    async findAll(order: "ASC" | "DESC"): Promise<Team[]> {
        return this.teamsRepository.find({ order: { name: order } });
    }

    async findByFifaCode(code: string): Promise<Team> {
        const team = await this.teamsRepository.findOneBy({ code: code });
        if (!team) {
            throw new NotFoundError("Teams " + code + " does not exist");
        }
        return team;
    }

    async findMatchsByFifaCode(code: string): Promise<Match[]> {
        return this.matchsRepository.find({
            where: [
                { awayTeam: { code: code } },
                { homeTeam: { code: code } }
            ]
        });
    }

    async findMatchsByFifaCodeAndStage(code: string, stage: MatchStage): Promise<Match[]> {
        return this.matchsRepository.find({
            where: [
                { homeTeam: { code: code }, stage: stage },
                { awayTeam: { code: code }, stage: stage }
            ],
            relations: ["homeTeam", "awayTeam"]
        });
    }
}