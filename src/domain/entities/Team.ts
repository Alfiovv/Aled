import { FifaCode } from "../value-objects/FifaCode";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("teams")
export class Team {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    code!: string;

    constructor(name?: string, code?: FifaCode) {
        if (name) this.name = name;
        if (code) this.code = code.value;
    }
}