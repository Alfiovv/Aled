import { Ticket } from "@domain/entities/Ticket";
import { CUSTOMERS } from "./customer";
import { MATCHS } from "./matchs";

// Mock de tickets liés aux clients et aux matchs
export const TICKETS: Ticket[] = [
    new Ticket(1, MATCHS[0], "A12", CUSTOMERS[0]),
    new Ticket(2, MATCHS[0], "A13", CUSTOMERS[1]),
    new Ticket(3, MATCHS[1], "B05", CUSTOMERS[2])
];