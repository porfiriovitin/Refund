import { Request, Response } from "express";
import { AppError } from "@/utils/AppError.js";
import { fileSchema } from "@/schemas/files-schema.js";
import { DiskStorage } from "@/providers/disk-storage.js";

class UploadsController {
    async create(req: Request, res: Response) {

        const diskStorage = new DiskStorage();

        const validation = fileSchema.safeParse(req.file);

        if (!req.file) {
            throw new AppError("No file uploaded", 400);
        }

        if (!validation.success) {

            await diskStorage.deleteFile(req.file.filename, "tmp");

            throw validation.error;
        }

        const file = validation.data;

        const filename = await diskStorage.saveFile(file.filename);

        res.json({ file: filename });

    }
}

export { UploadsController };