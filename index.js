import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import problemRoute from "./routes/problemRoute.js";

const PORT = process.env.PORT || 4000;

const app = express();
connectToDatabase();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/problem", problemRoute);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
