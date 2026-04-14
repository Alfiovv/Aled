import { Repository, FindOptionsWhere } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";

export class StadiumService {
    private readonly stadiumsRepository: Repository<Stadium>;
    private readonly matchsRepository: Repository<Match>;

    constructor(
        stadiumsRepository: Repository<Stadium>,
        matchsRepository: Repository<Match>
    ) {
        this.stadiumsRepository = stadiumsRepository;
        this.matchsRepository = matchsRepository;
    }

    async findByName(name: string): Promise<Stadium | null> {
        return this.stadiumsRepository.findOneBy({ name: name });
    }

    async findAll(cityName?: string): Promise<Stadium[]> {
        let stadiums = await this.stadiumsRepository.find({ relations: ["city"] });
        if (cityName) {
            stadiums = stadiums.filter(t => t.city.name === cityName);
        }
        return stadiums;
    }

    async findMatchsByStadium(name: string): Promise<Match[]> {
        const where: FindOptionsWhere<Match> = { stadium: { name: name } };
        return this.matchsRepository.find({ where });
    }
}