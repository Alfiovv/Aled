import { Repository } from "typeorm";
import { City } from "@domain/entities/City";

export class CityService {
    private readonly citiesRepository: Repository<City>;

    constructor(citiesRepository: Repository<City>) {
        this.citiesRepository = citiesRepository;
    }

    async findByName(name: string): Promise<City | null> {
        const cities = await this.citiesRepository.findOneBy({
            name: name
        });

        return cities;
    }

    async findAll(): Promise<City[]> {
        return this.citiesRepository.find({
            order: { name: "ASC" }
        });
    }
}