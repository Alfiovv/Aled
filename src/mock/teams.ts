import { Team } from "@domain/entities/Team";
import { FifaCode } from "../domain/value-objects/FifaCode";

export const TEAMS: Team[] = [
    new Team("USA", new FifaCode("USA")),
    new Team("Mexico", new FifaCode("MEX")),
    new Team("Canada", new FifaCode("CAN")),
    new Team("France", new FifaCode("FRA")),
    new Team("Brazil", new FifaCode("BRA")),
    new Team("Argentina", new FifaCode("ARG")),
];