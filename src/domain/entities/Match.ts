import { Stadium } from "./Stadium";
import { Team } from "./Team";
import { MatchStatus, MatchStage } from "../enum/enum";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("matchs")
export class Match {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Team, { eager: true })
    homeTeam!: Team;

    @ManyToOne(() => Team, { eager: true })
    awayTeam!: Team;

    @Column({ default: 0 })
    homeScore!: number;

    @Column({ default: 0 })
    awayScore!: number;

    @Column({ nullable: true })
    homeScoreExtraTime!: number | null;

    @Column({ nullable: true })
    awayScoreExtraTime!: number | null;

    @Column({ nullable: true })
    homeScoreShootOut!: number | null;

    @Column({ nullable: true })
    awayScoreShootOut!: number | null;

    @ManyToOne(() => Stadium, { eager: true })
    stadium!: Stadium;

    @Column({
        type: "enum",
        enum: MatchStatus
    })
    status!: MatchStatus;

    @Column({
        type: "enum",
        enum: MatchStage
    })
    stage!: MatchStage;

    @Column()
    date!: Date;

    constructor(
        homeTeam?: Team,
        awayTeam?: Team,
        stadium?: Stadium,
        status?: MatchStatus,
        stage?: MatchStage,
        date?: Date,
        homeScore: number = 0,
        awayScore: number = 0,
        homeScoreExtraTime: number | null = null,
        awayScoreExtraTime: number | null = null,
        homeScoreShootOut: number | null = null,
        awayScoreShootOut: number | null = null,
    ) {
        if (homeTeam) this.homeTeam = homeTeam;
        if (awayTeam) this.awayTeam = awayTeam;
        if (stadium) this.stadium = stadium;
        if (status) this.status = status;
        if (stage) this.stage = stage;
        if (date) this.date = date;

        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.homeScoreExtraTime = homeScoreExtraTime;
        this.awayScoreExtraTime = awayScoreExtraTime;
        this.homeScoreShootOut = homeScoreShootOut;
        this.awayScoreShootOut = awayScoreShootOut;

        // Validation métier
        if (homeTeam && awayTeam && homeTeam.name === awayTeam.name)
            throw new Error("On ne peut pas avoir la même équipe des deux cotés");
        if (homeScore < 0 || awayScore < 0)
            throw new Error("Les scores ne peuvent être inférieurs à 0");
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