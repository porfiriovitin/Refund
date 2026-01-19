import { AppError } from "@/utils/AppError.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { error } from "node:console";
import { ZodError } from "zod";

/// :: Middleware to handle errors globally.
export const errorHandling: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "validation error",
      errors: err.issues,
    });
  }

  return res.status(500).json({ message: err.message });
}