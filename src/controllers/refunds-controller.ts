import { Request, Response, NextFunction } from "express";
import { refundsSchema, querySchema } from "@/schemas/refunds-schema.js";
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/AppError.js";

class RefundsController {
    async create(req: Request, res: Response, next: NextFunction) {

        const isValidBody = refundsSchema.safeParse(req.body);

        if (!isValidBody.success) {
            throw isValidBody.error;
        }

        const { name, category, amount, filename } = isValidBody.data;

        if (!req.user || !req.user.id) {
            throw new AppError("Unauthorized", 401);
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId: Number(req.user.id),
            },
        });

        return res.status(201).json({ message: "Refund created successfully" });
    }

    async index(req: Request, res: Response, next: NextFunction) {

        const isValidQuery = querySchema.safeParse(req.query);

        if (!isValidQuery.success) {
            throw isValidQuery.error;
        }

        const { name } = isValidQuery.data;

        const refunds = await prisma.refunds.findMany({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    }
                }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
        });

        res.json(refunds);
    }
}

export { RefundsController };