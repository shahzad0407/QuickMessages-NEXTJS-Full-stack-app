import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username should not be shorter than 2 characters")
    .max(20,"Username should not be longer than 20 characters")
    .regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/,"Username cannot contain special characters")

export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password should be longer than 6 characters"})
})