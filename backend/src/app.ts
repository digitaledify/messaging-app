import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRouter from "./users/router";
import authenticate from "../lib/middleware/authenticate";
import errorHandler from "../lib/middleware/errorHandler";
import swaggerDocument from "../lib/swaggerDocument";
import { httpLogger } from "../lib/logger";

const app = express();

app.use(express.json());
app.use(httpLogger());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(authenticate());
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
