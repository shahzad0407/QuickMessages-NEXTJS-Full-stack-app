import { z } from "zod";

export const verifySchmea = z.object({
    code:z.string().length(6,"Should not be longer than 6 digits")
})
