import express from "express";
import cors from "cors";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);

export default app;
