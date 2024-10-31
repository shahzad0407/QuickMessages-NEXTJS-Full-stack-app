import { z } from "zod";

export const messageSchema = z.object({
    content:z.string()
    .min(6,"Should not be atleast than 6 digits")
    .max(300,"Should not be longer than 300 characters")
})
