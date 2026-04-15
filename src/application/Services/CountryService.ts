import { Repository, FindOptionsWhere } from "typeorm";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { NotFoundError } from "@domain/errors/NotFoundError";

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

    async findByCode(code: string): Promise<Country> {
        const country = await this.countriesRepository.findOneBy({ code: code });
        if (!country) {
            throw new NotFoundError('Country "' + code + '" does not exist');
        }
        return country;
    }

    async findCitiesByCode(code: string): Promise<City[]> {
        const where: FindOptionsWhere<City> = { country: { code: code } };
        return this.citiesRepository.find({ where });
    }
}