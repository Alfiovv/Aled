import { z } from "zod";

export const CreateTicketSchema = z.object({
    matchId: z
        .number({ error: "matchId doit être un nombre" })
        .int({ error: "matchId doit être un entier" })
        .positive({ error: "matchId doit être strictement positif" }),

    seat: z
        .string({ error: "Le siège est requis" })
        .min(1, { error: "Le siège doit comporter au moins 1 caractère" })
        .max(10, { error: "Le siège ne peut pas dépasser 10 caractères" }),

    customer: z.object({
        firstname: z
            .string({ error: "Le prénom est requis" })
            .min(1, { error: "Le prénom doit comporter au moins 1 caractère" }),

        lastname: z
            .string({ error: "Le nom est requis" })
            .min(1, { error: "Le nom doit comporter au moins 1 caractère" }),

        email: z
            .string({ error: "L'email est requis" })
            .email({ error: "L'email doit être une adresse valide" }),
    }),
});