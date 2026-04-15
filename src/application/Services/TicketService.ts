import { Repository } from "typeorm";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { Customer } from "@domain/entities/Customer";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class TicketService {
    private readonly ticketsRepository: Repository<Ticket>;
    private readonly matchRepository: Repository<Match>;
    private readonly customerRepository: Repository<Customer>;

    constructor(
        ticketsRepository: Repository<Ticket>,
        matchRepository: Repository<Match>,
        customerRepository: Repository<Customer>
    ) {
        this.ticketsRepository = ticketsRepository;
        this.matchRepository = matchRepository;
        this.customerRepository = customerRepository;
    }

    async createTicket(matchId: number, seat: string, email: string): Promise<Ticket> {
        const match = await this.matchRepository.findOneBy({ id: matchId });
        if (!match) {
            throw new NotFoundError("Le match n'existe pas.");
        }

        const customer = await this.customerRepository.findOneBy({ email });
        if (!customer) {
            throw new NotFoundError("L'utilisateur n'existe pas.");
        }

        const ticket = await this.ticketsRepository.findOneBy({ seat });
        if (ticket) {
            throw new Error("Siège déjà réserver");
        }

        const newTicket = this.ticketsRepository.create({
            match,
            seat,
            holder: customer
        });

        return this.ticketsRepository.save(newTicket);
    }
}