import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { authConfig } from "../configs/auth.js";
import { TokenPayload } from "../interfaces/token-payload.js";

/// :: Middleware to ensure the user is authenticated via JWT token.
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("JWT token is missing", 401);
  }

  try {
    const { secret } = authConfig.jwt;
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = {
      id: decoded.sub!,
      role: decoded.role,
    };
    return next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}