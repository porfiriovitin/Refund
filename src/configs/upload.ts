import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB

const ACCEPTED_IMG_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(req, file, callback) {
            const filehash = crypto.randomBytes(10).toString("hex");
            const filename = `${filehash}-${file.originalname}`;

            return callback(null, filename);
        }
    })
}

export default { TMP_FOLDER, UPLOADS_FOLDER, MAX_FILE_SIZE, ACCEPTED_IMG_TYPES, MULTER };