import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { Customer } from "@domain/entities/Customer";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { Ticket } from "@domain/entities/Ticket";
import { DataSource } from "typeorm";
import "reflect-metadata"; //typeorm

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [City, Country, Customer, Match, Stadium, Team, Ticket]


});