import { AppError } from "@/utils/AppError.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { z, ZodError } from "zod";
import { Prisma } from "../../prisma/generated/client.js";

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
    const flattened = err.flatten();

    const details = err.issues.map((issue) => ({
      field: issue.path.join("."), 
      message: issue.message,
      code: issue.code,
    }));

    return res.status(400).json({
      message: "validation error",
      details: details[0].message,
      fieldErrors: flattened.fieldErrors,
      formErrors: flattened.formErrors,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({ message: "E-mail already in use" });
  }

  return res.status(500).json({ message: "Internal server error" });

}