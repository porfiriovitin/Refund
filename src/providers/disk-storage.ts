import fs from 'node:fs';
import path from 'node:path';
import upload from '@/configs/upload.js';
import { AppError } from '@/utils/AppError.js';

class DiskStorage {
    async saveFile(file: string) {
        const tmpPath = path.resolve(upload.TMP_FOLDER, file);
        const destPath = path.resolve(upload.UPLOADS_FOLDER, file);

        try {

            await fs.promises.access(tmpPath);

        } catch (error) {
            throw new AppError("File not found", 400);
        }

        await fs.promises.mkdir(upload.UPLOADS_FOLDER, { recursive: true });
        await fs.promises.rename(tmpPath, destPath);

        return file;
    }

    async deleteFile(file: string, type: "tmp" | "upload") {

        const pathFile = type === "tmp" ? upload.TMP_FOLDER : upload.UPLOADS_FOLDER;

        const filePath = path.resolve(pathFile, file);

        try {

            await fs.promises.stat(filePath);

        } catch {
            return;
        }

        await fs.promises.unlink(filePath);

    }
}

export { DiskStorage };
