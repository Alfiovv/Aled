import { Repository } from "typeorm";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { Customer } from "@domain/entities/Customer";

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

    async findMatchById(matchId: number): Promise<Match | null> {
        return this.matchRepository.findOneBy({ id: matchId });
    }

    async findCustomerByEmail(email: string): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ email: email });
    }

    async findTicketBySeat(seat: string): Promise<Ticket | null> {
        return this.ticketsRepository.findOneBy({ seat: seat });
    }

    async createTicket(match: Match, seat: string, customer: Customer): Promise<Ticket> {
        const newTicket = this.ticketsRepository.create({
            match: match,
            seat: seat,
            holder: customer
        });
        return this.ticketsRepository.save(newTicket);
    }
}