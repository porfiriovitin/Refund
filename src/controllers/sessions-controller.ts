import { Request, Response, NextFunction } from "express";
import { sessionSchema } from "@/schemas/session-schema.js";
import { prisma } from "@/database/prisma.js";
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError.js";
import { authConfig } from "@/configs/auth.js";
import jwt from "jsonwebtoken";

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction) {

    const isValidBody = sessionSchema.safeParse(req.body);

    if (!isValidBody.success) {
      throw isValidBody.error;
    }

    const { email, password } = isValidBody.data;
    
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role }, secret, {
      expiresIn,
      subject: String(user.id),
    });
    
    return res.status(200).json({ token });
  }
}

export { SessionsController };