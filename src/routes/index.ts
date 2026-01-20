import { Router } from "express";
import { usersRoutes } from "./users-routes.js";
import { sessionsRoutes } from "./sessions-routes.js";
import { refundsRoutes } from "./refunds-routes.js";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.js";
import { uploadsRoutes } from "./uploads-routes.js";

const routes = Router();

/// :: Public routes
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

/// :: Protected routes
routes.use(ensureAuthenticated)
routes.use("/refunds", refundsRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };