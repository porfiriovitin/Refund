import { Router } from "express";
import { RefundsController } from "../controllers/refunds-controller.js";
import { verifyAuthorization } from "@/middlewares/verify-authorization.js";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post("/", refundsController.create);

export { refundsRoutes };
