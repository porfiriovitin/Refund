import { Router } from "express";
import { UploadsController } from "../controllers/uploads-controller.js";
import { verifyAuthorization } from "@/middlewares/verify-authorization.js";
import upload from "@/configs/upload.js";
import multer from "multer";

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

const multerUpload = multer(upload.MULTER)

uploadsRoutes.use(verifyAuthorization(["manager", "employee"]));
uploadsRoutes.post("/", multerUpload.single("file"), uploadsController.create);

export { uploadsRoutes };