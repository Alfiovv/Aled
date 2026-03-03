import { Stadium } from "./Stadium";
import { Team } from "./Team";
import { MatchStatus, MatchStage } from "../enum/enum";

export class Match {
    constructor(
        public id: number,
        public homeTeam: Team,
        public awayTeam: Team,
        public homeScore: number = 0,
        public awayScore: number = 0,
        public homeScoreExtraTime: number | null,
        public awayScoreExtraTime: number | null,
        public homeScoreShootOut: number | null,
        public awayScoreShootOut: number | null,
        public stadium: Stadium,
        public status: MatchStatus,
        public stage: MatchStage,
        public date: Date
    ) {
        if (id < 0) throw new Error("l'ID ne peut être inférieur à 0");
        if (homeTeam.name === awayTeam.name) throw new Error("On ne peut pas avoir la même équipe des deux coters");
        if (homeScore < 0 || awayScore < 0) throw new Error("les scores ne peuvent être inférieur à 0");
    }
    isDraw(): boolean {
        return this.homeScore === this.awayScore;
    }

    winner(): Team | null {
        if (this.homeScore > this.awayScore) return this.homeTeam;
        if (this.awayScore > this.homeScore) return this.awayTeam;
        return null;
    }
}