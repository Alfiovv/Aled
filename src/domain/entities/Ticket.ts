import { Match } from "./Match";
import { Customer } from "./Customer";

export class Ticket {
    constructor(
        public id: number,
        public match: Match,
        public seat: String,
        public customer: Customer
    ) {
        if (id < 0) throw new Error("L'ID d'un ticket ne peux être inférieur à 0");
        if (!seat) throw new Error("Le siège choisi ne peut être vide.");

    }
}