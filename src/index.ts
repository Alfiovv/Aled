import { app } from "@infrastructure/app";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import "reflect-metadata"; //typeorm
import { AppDataSource } from "@infrastructure/database/AppDataSource";


AppDataSource.initialize().then(() => {
    console.log("Database connected");
    console.log(`Server running on port ${process.env.PORT}`);
}).catch((err) => {
    console.error("Can't connect database");
    process.exit(1);
})
export default {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    fetch: app.fetch
};