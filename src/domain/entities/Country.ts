import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("countries")
export class Country {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    code!: string;

    constructor(name?: string, code?: string) {
        if (name) this.name = name;
        if (code) this.code = code;
    }
}