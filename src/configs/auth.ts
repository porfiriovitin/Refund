import { env } from "@/env.js"
import type jwt from "jsonwebtoken";

export const authConfig = {
  jwt: {
    secret: env.JWT_SECRET_KEY as jwt.Secret,
    expiresIn: "1d" as jwt.SignOptions["expiresIn"],
  },
} as const;