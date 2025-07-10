import express from "express";
import { adminStatsRouter } from "./controllers/adminStats";

const app = express();

app.use("/api/admin", adminStatsRouter);
