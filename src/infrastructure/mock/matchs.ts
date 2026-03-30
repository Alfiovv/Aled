import { Match } from "@domain/entities/Match";
import { STADIUMS } from "./stadiums";
import { TEAMS } from "./teams";
import { MatchStatus, MatchStage } from "@domain/enum/enum";

export const MATCHS: Match[] = [
    new Match(
        TEAMS[0],           // homeTeam: USA
        TEAMS[1],           // awayTeam: Mexico
        STADIUMS[0],        // stadium: Mercedes-Benz Stadium
        MatchStatus.finished,
        MatchStage.group,
        new Date("2026-03-01"),
        2,                  // homeScore
        1,                  // awayScore
        null, null, null, null
    ),
    new Match(
        TEAMS[2],           // homeTeam: Canada
        TEAMS[3],           // awayTeam: France
        STADIUMS[2],        // stadium: BC Place
        MatchStatus.scheduled,
        MatchStage.group,
        new Date("2026-03-02T18:00:00Z"),
        0, 0,
        null, null, null, null
    ),
    new Match(
        TEAMS[4],           // homeTeam: Brazil
        TEAMS[5],           // awayTeam: Argentina
        STADIUMS[1],        // stadium: Estadio Akron
        MatchStatus.finished,
        MatchStage.group,
        new Date("2026-03-03T20:00:00Z"),
        3,                  // homeScore
        2,                  // awayScore
        null, null, null, null
    ),
];