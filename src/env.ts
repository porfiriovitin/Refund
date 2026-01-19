import { z } from "zod";
import 'dotenv/config';

const envSchema = z.object({
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_DATABASE: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_PORT: z.string(),
    CONTAINER_NAME: z.string(),
    JWT_SECRET_KEY: z.string(),
    FRONTEND_ORIGINS: z.string(),
    PORT: z.string().default("3333").transform(Number),
})

export const env = envSchema.parse(process.env);