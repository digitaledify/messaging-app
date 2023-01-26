import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import errorHandler from "../lib/middleware/errorHandler";
import userRouter from "./users/router";

const app = express();

app.use(pinoHttp());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
