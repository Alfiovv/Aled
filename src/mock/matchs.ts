import { Match } from "@domain/entities/Match";
import { STADIUMS } from "./stadiums";
import { TEAMS } from "./teams";
import { MatchStatus, MatchStage } from "@domain/enum/enum";
// On crée 3 matchs différents avec stades et équipes différentes
export const MATCHS: Match[] = [
    new Match(
        1,
        TEAMS[0], // USA
        TEAMS[1], // Mexico
        2,
        1,
        null,
        null,
        null,
        null,
        STADIUMS[0], // Atlanta
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-01T20:00:00Z")
    ),
    new Match(
        2,
        TEAMS[2], // Canada
        TEAMS[3], // France
        0,
        0,
        null,
        null,
        null,
        null,
        STADIUMS[2], // Vancouver
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-02T18:00:00Z")
    ),
    new Match(
        3,
        TEAMS[4], // Brazil
        TEAMS[5], // Argentina
        3,
        2,
        null,
        null,
        null,
        null,
        STADIUMS[1], // Guadalajara
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-03T20:00:00Z")
    ),
];