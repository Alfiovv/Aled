import { Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class CityService {
    private readonly citiesRepository: Repository<City>;

    constructor(citiesRepository: Repository<City>) {
        this.citiesRepository = citiesRepository;
    }

    async findByNameTable(name: string): Promise<City[]> {
        const city = await this.citiesRepository.findBy({ name: name });
        return city;
    }

    async findByName(name: string): Promise<City> {
        const city = await this.citiesRepository.findOneBy({ name: name });
        if (!city) {
            throw new NotFoundError('City "' + name + '" does not exist');
        }
        return city;
    }

    async findAll(): Promise<City[]> {
        return this.citiesRepository.find({ order: { name: "ASC" } });
    }
}