import express from "express";
import { errorHandling } from "./middlewares/error-handling.js";
import { routes } from "./routes/index.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Too Many Requests"
});


app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(routes);
app.use(errorHandling);

export default app;