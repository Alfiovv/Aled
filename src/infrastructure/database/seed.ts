import "reflect-metadata"; //typeorm
import { AppDataSource } from "./AppDataSource";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { Customer } from "@domain/entities/Customer";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";
import { HOST_COUNTRIES } from "@infrastructure/mock/countries";
import { CITIES } from "@infrastructure/mock/cities";
import { STADIUMS } from "@infrastructure/mock/stadiums";
import { TEAMS } from "@infrastructure/mock/teams";
import { CUSTOMERS } from "@infrastructure/mock/customer";
import { MATCHS } from "@infrastructure/mock/matchs";
import { TICKETS } from "@infrastructure/mock/tickets";

async function clear(): Promise<void> {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const ticketRepository = AppDataSource.getRepository(Ticket);
        const matchRepository = AppDataSource.getRepository(Match);
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const cityRepository = AppDataSource.getRepository(City);
        const teamRepository = AppDataSource.getRepository(Team);
        const customerRepository = AppDataSource.getRepository(Customer);
        const countryRepository = AppDataSource.getRepository(Country);

        await AppDataSource.dropDatabase();
        await AppDataSource.synchronize();
        console.log("Database cleared with success");
    } catch (error) {
        console.error(error);
        console.error("Can't clear database");
    }
}

async function seed(): Promise<void> {
    try {
        // Suppression des données
        await clear();

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const countryRepository = AppDataSource.getRepository(Country);
        const cityRepository = AppDataSource.getRepository(City);
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const teamRepository = AppDataSource.getRepository(Team);
        const customerRepository = AppDataSource.getRepository(Customer);
        const matchRepository = AppDataSource.getRepository(Match);
        const ticketRepository = AppDataSource.getRepository(Ticket);

        // Countries
        const savedCountries = await countryRepository.save(HOST_COUNTRIES);
        console.log("Pays créés");

        // Cities
        const citiesToSave = CITIES.map((city) => {
            const c = new City();
            c.name = city.name;
            c.country = savedCountries.find(co => co.name === city.country.name)!;
            return c;
        });
        const savedCities = await cityRepository.save(citiesToSave);
        console.log("Villes créées");

        // Stadiums
        const stadiumsToSave = STADIUMS.map((stadium) => {
            const s = new Stadium();
            s.name = stadium.name;
            s.capacity = stadium.capacity;
            s.city = savedCities.find(c => c.name === stadium.city.name)!;
            return s;
        });
        const savedStadiums = await stadiumRepository.save(stadiumsToSave);
        console.log("Stades créés");

        // Teams
        const savedTeams = await teamRepository.save(TEAMS);
        console.log("Équipes créées");

        // Customers
        const savedCustomers = await customerRepository.save(CUSTOMERS);
        console.log("Clients créés");

        // Matchs
        const matchsToSave = MATCHS.map((match) => {
            const m = new Match();
            m.homeTeam = savedTeams.find(t => t.name === match.homeTeam.name)!;
            m.awayTeam = savedTeams.find(t => t.name === match.awayTeam.name)!;
            m.homeScore = match.homeScore;
            m.awayScore = match.awayScore;
            m.homeScoreExtraTime = match.homeScoreExtraTime;
            m.awayScoreExtraTime = match.awayScoreExtraTime;
            m.homeScoreShootOut = match.homeScoreShootOut;
            m.awayScoreShootOut = match.awayScoreShootOut;
            m.stadium = savedStadiums.find(s => s.name === match.stadium.name)!;
            m.status = match.status;
            m.stage = match.stage;
            m.date = match.date;
            return m;
        });
        const savedMatchs = await matchRepository.save(matchsToSave);
        console.log("Matchs créés");

        // Tickets
        const ticketsToSave = TICKETS.map((ticket) => {
            const t = new Ticket();
            t.match = savedMatchs[MATCHS.findIndex(m => m.homeTeam.name === ticket.match.homeTeam.name)];
            t.seat = ticket.seat;
            t.holder = savedCustomers.find(c => c.email === ticket.holder.email)!;
            return t;
        });
        await ticketRepository.save(ticketsToSave);
        console.log("Tickets créés");

        console.log("Seed terminé avec succès !");
        process.exit(0);
    } catch (error) {
        console.error(error);
        console.error("Can't seed database");
        process.exit(1);
    }
}

seed();