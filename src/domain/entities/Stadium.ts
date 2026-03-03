import { City } from "./City";

export class Stadium {
    constructor(
        public name: string,
        public city: City,
        public capacity: number
    ) {
        if (capacity <= 0) throw new Error("La capaciter d'un stade ne peux être inférieur à 0");
    }
}