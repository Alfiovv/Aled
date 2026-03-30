import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Country } from "@domain/entities/Country";

@Entity("cities")
export class City {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @ManyToOne(() => Country, { eager: true })
    country!: Country;

    constructor(name?: string, country?: Country) {
        if (name) this.name = name;
        if (country) this.country = country;
    }
}