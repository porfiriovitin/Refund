import { Router } from "express";
import { usersRoutes } from "./users-routes.js";
import { sessionsRoutes } from "./sessions-routes.js";
import { refundsRoutes } from "./refunds-routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/refunds", refundsRoutes);

export { routes };