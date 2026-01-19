import { Request, Response, NextFunction } from "express";

class RefundsController {
    async create(req: Request, res: Response, next: NextFunction) {
        // Implementation for creating a refund
        return res.status(201).json({ message: "Refund created successfully" });
        
    }
}

export { RefundsController };