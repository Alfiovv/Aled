import { Hono } from 'hono'
import { GetCountryHandler } from '@infrastructure/handlers/country/GetCountryHandler';
import { GetCountryCitiesHandler } from '@infrastructure/handlers/country/GetCountryCitiesHandler';
import { GetCountryByCodeHandler } from '@infrastructure/handlers/country/GetCountryByCodeHandler';
import { CountryService } from '@application/Services/CountryService';
import { Country } from '@domain/entities/Country';
import { City } from '@domain/entities/City';
import { AppDataSource } from '@infrastructure/database/AppDataSource';

const countryRoutes = new Hono();

const countryService = new CountryService(
    AppDataSource.getRepository(Country),
    AppDataSource.getRepository(City)
);

countryRoutes.get("/:code/cities", (c) => new GetCountryCitiesHandler(countryService).handle(c));
countryRoutes.get("/:code", (c) => new GetCountryByCodeHandler(countryService).handle(c));
countryRoutes.get("/", (c) => new GetCountryHandler(countryService).handle(c));

export default countryRoutes;