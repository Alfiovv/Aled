import { FifaCode } from "../value-objects/FifaCode";

export class Team {
    constructor(
        public name: string,
        public code: FifaCode
    ) { }
}