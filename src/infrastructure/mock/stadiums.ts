import { Stadium } from "@domain/entities/Stadium";
import { City } from "@domain/entities/City";
import { CITIES } from "./cities";

export const STADIUMS: Stadium[] = [
    new Stadium("Mercedes-Benz Stadium", CITIES[0], 67382), // Atlanta
    new Stadium("Estadio Akron", CITIES[1], 44330),         // Guadalajara
    new Stadium("BC Place", CITIES[2], 54000),             // Vancouver
];