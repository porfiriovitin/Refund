import { Request, Response } from "express";
import { refundsSchema, querySchema, paramsSchema } from "@/schemas/refunds-schema.js";
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/AppError.js";

class RefundsController {
    async create(req: Request, res: Response) {

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

    async index(req: Request, res: Response) {

        const isValidQuery = querySchema.safeParse(req.query);

        if (!isValidQuery.success) {
            throw isValidQuery.error;
        }

        const { name, page, perPage } = isValidQuery.data;

        const skip = (page - 1) * perPage;

        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
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

        const totalCount = await prisma.refunds.count({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    }
                }
            }
        });

        const totalPages = Math.ceil(totalCount / perPage);

        res.json({
            refunds,
            pagination:{
                page, 
                perPage,
                totalCount,
                totalPages: totalPages > 0 ? totalPages : 1,
            }
        });
    }

    async show(req: Request, res: Response) {
        const isValidParams = paramsSchema.safeParse(req.params);

        if (!isValidParams.success) {
            throw isValidParams.error;
        }

        const { id } = isValidParams.data;

        const refund = await prisma.refunds.findFirst({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },

            }
        );

        if (!refund) {
            throw new AppError("Refund not found", 404);
        }

        res.json({ refund });

    }
}

export { RefundsController };