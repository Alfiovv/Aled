import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";

const usa = new Country("USA", "us");
const mexico = new Country("Mexico", "me");
const canada = new Country("Canada", "ca");

export const CITIES: City[] = [
    new City("Atlanta", usa),
    new City("Guadalajara", mexico),
    new City("Vancouver", canada),
];