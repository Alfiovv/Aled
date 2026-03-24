import { z } from "zod";

export const CreateTicketSchema = z.object({
    matchId: z
        .number({ message: "matchId doit être un nombre entier positif" })
        .int({ message: "matchId doit être un entier" })
        .positive({ message: "matchId doit être strictement positif" }),

    seat: z
        .string({ message: "Le siège est requis" })
        .min(1, { message: "Le siège doit comporter au moins 1 caractère" })
        .max(10, { message: "Le siège ne peut pas dépasser 10 caractères" }),

    customer: z.object({
        firstname: z
            .string({ message: "Le prénom est requis" })
            .min(1, { message: "Le prénom doit comporter au moins 1 caractère" }),

        lastname: z
            .string({ message: "Le nom est requis" })
            .min(1, { message: "Le nom doit comporter au moins 1 caractère" }),

        email: z
            .string({ message: "L'email est requis" })
            .email({ message: "L'email doit être une adresse valide" })
    })
});