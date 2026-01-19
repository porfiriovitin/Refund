import {z} from "zod";

export const sessionSchema = z.object({
  email: z.email({message: "Invalid email address"}).trim().toLowerCase(),
  password: z.string().trim(),
});