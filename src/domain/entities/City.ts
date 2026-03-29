import { Country } from "@domain/entities/Country";
import { CITY_MAP } from "../type/type";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class City {

    @Column()
    public readonly stadiumName: string;

    @Column()
    public readonly stadiumCapacity: number;

    constructor(
        public country: Country,
        public name: string
    ) {
        const allowedCities = CITY_MAP[country.name];
        if (!allowedCities) {
            throw new Error(`No cities defined for country ${country.name}`);
        }

        const cityData = allowedCities.find(c => c.name === name);
        if (!cityData) {
            throw new Error(`City "${name}" is not allowed in country ${country.name}`);
        }

        // Affectation automatique du stade
        this.stadiumName = cityData.stadiumName;
        this.stadiumCapacity = cityData.capacity;
    }
}