import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";

const usa = new Country("USA", "us");
const mexico = new Country("Mexico", "me");
const canada = new Country("Canada", "ca");

export const CITIES: City[] = [
    new City(usa, "Atlanta"),
    new City(mexico, "Guadalajara"),
    new City(canada, "Vancouver"),
];