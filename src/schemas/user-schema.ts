import {z} from "zod";
import { UserRole } from "../../prisma/generated/enums.js";

export const userSchema = z.object({
  name: z.string().trim().min(2, {message: "Name is required"}),
  email: z.email({message: "Invalid email address"}).trim().toLowerCase(),
  password: z.string().max(12, {message: "Password must be at most 12 characters"}).trim(),
  role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee),
});