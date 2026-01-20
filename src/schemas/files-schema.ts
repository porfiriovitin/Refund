import {z} from 'zod';
import upload from '@/configs/upload.js';

export const fileSchema = z.object({
    filename: z.string().min(1, "Filename is required"),
    mimetype: z.string().refine((type) => upload.ACCEPTED_IMG_TYPES.includes(type), {
        message: "Invalid file type"
    }),
    size: z.number().positive().refine((size) => size <= upload.MAX_FILE_SIZE, {
        message: `File size exceeds the maximum limit of 3mb`
    }),
}).loose();