import { Repository, FindOptionsWhere } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";

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

    async findByName(name: string): Promise<Stadium> {
        const stadium = await this.stadiumsRepository.findOneBy({ name: name });
        if (!stadium) {
            throw new NotFoundError('Stadium "' + name + '" does not exist');
        }
        return stadium;
    }

    async findAllByCityName(cityName: string): Promise<Stadium[]> {
        const stadiums = await this.findAll();
        const result = stadiums.filter(s => s.city.name.toUpperCase() === cityName.toUpperCase());
        return result;
    }

    async findAllByCountryCode(countryCode: string): Promise<Stadium[]> {
        const stadiums = await this.findAll();
        const result = stadiums.filter(s => s.city.country.code === countryCode);

        return result;
    }

    async findAllByCountryName(countryName: string): Promise<Stadium[]> {
        const stadiums = await this.findAll();
        const result = stadiums.filter(s => s.city.country.name.toUpperCase() === countryName.toUpperCase());

        return result;
    }

    async findAll(): Promise<Stadium[]> {
        return this.stadiumsRepository.find({
            relations: ["city", "city.country"]
        });
    }

    async findMatchsByStadium(name: string): Promise<Match[]> {
        const where: FindOptionsWhere<Match> = { stadium: { name: name } };
        return this.matchsRepository.find({ where });
    }
}