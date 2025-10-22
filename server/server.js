import dotenv from "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/database.js";
import authRouter from "./routes/authRouter.js";

const app = express();
const port = process.env.PORT || 3000;

ConnectDB();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

//Api EndPoints
app.get("/", (req, res) => {
  res.send("Api Working");
});
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
