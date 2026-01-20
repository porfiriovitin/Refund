import { Router } from "express";
import { RefundsController } from "../controllers/refunds-controller.js";
import { verifyAuthorization } from "@/middlewares/verify-authorization.js";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post("/", verifyAuthorization(["employee"]), refundsController.create);
refundsRoutes.get("/", verifyAuthorization(["manager"]), refundsController.index);
refundsRoutes.get("/:id", verifyAuthorization(["employee","manager"]), refundsController.show);

export { refundsRoutes };
