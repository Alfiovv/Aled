import { Match } from "@domain/entities/Match";
import { STADIUMS } from "./stadiums";
import { TEAMS } from "./teams";
import { MatchStatus, MatchStage } from "@domain/enum/enum";

export const MATCHS: Match[] = [
    new Match(
        1,
        TEAMS[0],
        TEAMS[1],
        2,
        1,
        null,
        null,
        null,
        null,
        STADIUMS[0],
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-01T20:00:00Z")
    ),
    new Match(
        2,
        TEAMS[2],
        TEAMS[3],
        0,
        0,
        null,
        null,
        null,
        null,
        STADIUMS[2],
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-02T18:00:00Z")
    ),
    new Match(
        3,
        TEAMS[4],
        TEAMS[5],
        3,
        2,
        null,
        null,
        null,
        null,
        STADIUMS[1],
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-03T20:00:00Z")
    ),
];