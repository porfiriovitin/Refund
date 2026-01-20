import { z } from "zod";

const CategoriesEnum = z.enum(["food", "others","services", "transport","accommodation"]);

const refundsSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    category: z.enum(CategoriesEnum.options, { message: "Invalid category" }),
    amount: z.number().positive({ message: "Amount must be greater than zero" }),
    filename: z.string().min(1, { message: "Filename is required" }).trim(),
})

const querySchema = z.object({
    name: z.string().optional().default(""),
})

export {refundsSchema, querySchema}