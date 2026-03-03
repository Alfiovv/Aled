import { app } from "./app";
import { Country } from "./domain/entities/Country";
import { City } from "./domain/entities/City";



export default {
    port: process.env.PORT,
    fetch: app.fetch
};

function testCities() {
    try {
        const usa = new Country("USA", "us");

        // Ville autorisée
        const atlanta = new City(usa, "Atlanta");
        console.log(`${atlanta.name} (${atlanta.country.name}) - ${atlanta.stadiumName} (${atlanta.stadiumCapacity})`);

        // Une autre ville autorisée
        const miami = new City(usa, "Miami");
        console.log(`${miami.name} (${miami.country.name}) - ${miami.stadiumName} (${miami.stadiumCapacity})`);

        // Ville non autorisée -> doit lancer une erreur
        const paris = new City(usa, "Paris");
    } catch (err: any) {
        console.error("Erreur:", err.message);
    }
}

testCities();