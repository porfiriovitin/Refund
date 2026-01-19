import { Request, Response, NextFunction } from "express";
import { userSchema } from "@/schemas/user-schema.js";
import {prisma} from "../database/prisma.js"
import {hash, compare } from "bcrypt";
import { AppError } from "@/utils/AppError.js";

class UsersController {
    async create(req: Request, res: Response, next: NextFunction) {

        const isValidBody = userSchema.safeParse(req.body);

        if (!isValidBody.success) {
            throw isValidBody.error;
        }

        const { name, email, password, role } = isValidBody.data;

        const hashedPassword = await hash(password, 8);

        await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role,
          },
        });

        return res.status(201).json({ message: "User created successfully" });

    }
}

export { UsersController };