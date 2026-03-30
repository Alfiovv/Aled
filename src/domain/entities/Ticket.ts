import { Match } from "./Match";
import { Customer } from "./Customer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Match, { eager: true })
    match!: Match;

    @Column()
    seat!: string;

    @ManyToOne(() => Customer, { eager: true })
    holder!: Customer;

    constructor(match?: Match, seat?: string, holder?: Customer) {
        if (match) this.match = match;
        if (holder) this.holder = holder;
        if (seat !== undefined) {
            if (!seat) throw new Error("Le siège choisi ne peut être vide.");
            this.seat = seat;
        }
    }
}