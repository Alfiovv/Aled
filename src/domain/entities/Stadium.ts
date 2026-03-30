import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";

@Entity("stadiums")
export class Stadium {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    capacity!: number;

    @OneToOne(() => City, { eager: true })
    @JoinColumn()
    city!: City;

    constructor(name?: string, city?: City, capacity?: number) {
        if (name) this.name = name;
        if (city) this.city = city;
        if (capacity !== undefined) {
            if (capacity <= 0) throw new Error("La capacité d'un stade ne peut être inférieure à 0");
            this.capacity = capacity;
        }
    }
}