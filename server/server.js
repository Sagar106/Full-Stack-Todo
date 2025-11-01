import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import aitodoRoutes from "./routes/aitodoRoutes.js"
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express()

//Middleware

app.use(express.json())
app.use(cors())

app.use(
    helmet({
        crossOriginEmbedderPolicy: false
    })
)

app.use(helmet.frameguard({ action: "deny" }))

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none';"
    )
    next();
})

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})

app.use(limiter)

connectDB(process.env.MONGO_URI)

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/perplexity", aitodoRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is listening on port : ${PORT}`));