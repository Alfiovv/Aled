import { Repository } from "typeorm";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { FindOptionsWhere } from "typeorm";

export class CountryService {
    private readonly countriesRepository: Repository<Country>;
    private readonly citiesRepository: Repository<City>;

    constructor(
        countriesRepository: Repository<Country>,
        citiesRepository: Repository<City>
    ) {
        this.countriesRepository = countriesRepository;
        this.citiesRepository = citiesRepository;
    }

    async findAll(): Promise<Country[]> {
        return this.countriesRepository.find();
    }

    async findByCode(code: string): Promise<Country | null> {
        return this.countriesRepository.findOneBy({ code: code });
    }

    async findCitiesByCode(code: string): Promise<City[]> {
        const where: FindOptionsWhere<City> = {
            country: { code: code }
        };
        return this.citiesRepository.find({ where });
    }
}